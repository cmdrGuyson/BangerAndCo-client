import React from "react";
import { Badge, Card } from "react-bootstrap";
import dayjs from "dayjs";

import "./userCard.scss";

export default function userCard(props) {
  const {
    firstName,
    lastName,
    email,
    //_id,
    //NIC,
    //DLN,
    //contactNumber,
    isBlacklisted,
    isPremiumCustomer,
    isVerified,
    createdAt,
  } = props.user;

  return (
    <Card className="user-card">
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
        <small className="text-muted">{`Registered on ${dayjs(
          createdAt
        ).toString()}`}</small>
      </Card.Footer>
    </Card>
  );
}
