import React from "react";
import { Badge, Card } from "react-bootstrap";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import "./userCard.scss";

//REDUX
import { connect } from "react-redux";
import { getUser } from "../../redux/actions/dataActions";

function userCard(props) {
  const {
    firstName,
    lastName,
    email,
    _id,
    //NIC,
    //DLN,
    //contactNumber,
    isBlacklisted,
    isPremiumCustomer,
    isVerified,
    createdAt,
  } = props.user;

  const handleSetUser = (id) => {
    props.getUser(id);
  };

  return (
    <Card className="user-card" onClick={() => handleSetUser(_id)}>
      <Card.Body>
        <Card.Title className="user-card-title">{`${firstName} ${lastName}`}</Card.Title>
        <Badge
          pill
          variant={
            isBlacklisted
              ? "danger"
              : !isVerified
              ? "secondary"
              : isPremiumCustomer
              ? "success"
              : "primary"
          }
          className="user-card-badge"
        >
          {isBlacklisted
            ? "Blacklisted"
            : !isVerified
            ? "Not verified"
            : isPremiumCustomer
            ? "Premium"
            : "Verified"}
        </Badge>
        <Card.Text>{email}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{`Registered on ${dayjs(createdAt)
          .format("MM/DD/YYYY h:mm:ss A [GMT]ZZ", {
            timeZone: "Asia/Colombo",
          })
          .toString()}`}</small>
      </Card.Footer>
    </Card>
  );
}

userCard.propTypes = {
  getUser: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  getUser,
};

export default connect(null, mapActionsToProps)(userCard);
