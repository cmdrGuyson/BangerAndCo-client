import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  CardColumns,
} from "react-bootstrap";
import PropTypes from "prop-types";

import "./manageUsers.scss";

import UserCard from "./userCard";

//REDUX
import { connect } from "react-redux";
import { getAllUsers } from "../../redux/actions/dataActions";

function ManageUsers(props) {
  const [_users, setUsers] = useState([]);

  const {
    data: { users, loading },
  } = props;

  useEffect(() => {
    props.getAllUsers();
  }, []);

  useEffect(() => {
    users && setUsers(users);
  }, [users]);

  let usersMarkup = !loading ? (
    _users.map((user) => <UserCard key={user._id} user={user} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <div>
      <Card className="search-box-users">
        <Card.Body>
          <Card.Title>Search Users</Card.Title>
          <Row>
            <Col xs={5}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Search by name"
                  aria-label="Search by name"
                  aria-describedby="basic-addon2"
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Button
                className="search-user-button"
                variant="outline-primary"
                active
              >
                All Users
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-secondary"
              >
                Non-verified
              </Button>{" "}
              <Button className="search-user-button" variant="outline-success">
                Premium
              </Button>{" "}
              <Button className="search-user-button" variant="outline-danger">
                Blacklisted
              </Button>{" "}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <CardColumns>{usersMarkup}</CardColumns>
    </div>
  );
}

ManageUsers.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllUsers,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageUsers);
