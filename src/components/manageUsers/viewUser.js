import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import {
  Card,
  Row,
  Col,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
  Modal,
  Alert,
} from "react-bootstrap";

import image from "../../images/logo.png";

import "./viewUser.scss";

//REDUX
import { connect } from "react-redux";

function ViewUser(props) {
  const {
    UI: { loading },
    user,
  } = props;

  const [isVerified, setIsVerified] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isBlacklisted, setIsBlacklisted] = useState(false);
  const [licenseImageModalShow, setLicenseImageModalShow] = useState(false);
  const [alternateImageModalShow, setAlternateImageModalShow] = useState(false);

  useEffect(() => {
    if (user) {
      setIsVerified(user.isVerified);
      setIsPremium(user.isPremiumCustomer);
      setIsBlacklisted(user.isBlacklisted);
    }
  }, [user]);

  return (
    <Fragment>
      {loading ? (
        <p>Loading</p>
      ) : user ? (
        <>
          <Card className="view-user-card">
            <Card.Body>
              <Row>
                <Col xs={3}>
                  <Card.Img
                    variant="top"
                    src={image}
                    className="view-user-img"
                  />
                </Col>
                <Col>
                  <Card.Title className="view-user-name">
                    {`${user.firstName} ${user.lastName}`}
                  </Card.Title>
                  <Card.Text className="view-user-email">
                    {user.email}
                  </Card.Text>
                  {isVerified && (
                    <Badge pill variant="primary">
                      Verified
                    </Badge>
                  )}
                  {isPremium && (
                    <Badge pill variant="success">
                      Premium
                    </Badge>
                  )}
                  {isBlacklisted && (
                    <Badge pill variant="danger">
                      Blacklisted
                    </Badge>
                  )}
                </Col>
              </Row>

              <hr />

              <ListGroup>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">NIC number</Badge>
                  <span> {user.NIC}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Driver's license number</Badge>
                  <span> {user.DLN}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Contact number</Badge>
                  <span> {user.contactNumber}</span>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  <Badge variant="secondary">Date of birth</Badge>
                  <span> {user.dateOfBirth}</span>
                </ListGroup.Item>
              </ListGroup>

              <ButtonGroup vertical className="view-user-image-options">
                <Button
                  variant="outline-info"
                  disabled={!user.licenseImageURL}
                  onClick={() => setLicenseImageModalShow(true)}
                >
                  {user.licenseImageURL
                    ? "View License Image"
                    : "License image not uploaded"}
                </Button>
                <Button
                  variant="outline-info"
                  disabled={!user.alternateIDImageURL}
                  onClick={() => setAlternateImageModalShow(true)}
                >
                  {user.alternateIDImageURL
                    ? "View Alternate Image"
                    : "Alternate image not uploaded"}
                </Button>
              </ButtonGroup>

              <ButtonGroup vertical className="view-user-image-options">
                <Button variant="outline-info" disabled={true}>
                  Set Verified
                </Button>
                <Button variant="outline-success">Set Premium</Button>
                <Button variant="outline-danger">Set Blacklisted</Button>
              </ButtonGroup>
            </Card.Body>

            <Card.Footer>
              {" "}
              <small className="text-muted">
                {`Registered on ${dayjs(user.createdAt).toString()}`}
              </small>
            </Card.Footer>
          </Card>
          <Modal
            show={licenseImageModalShow}
            onHide={() => setLicenseImageModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="view-user-modal-body">
              <img src={user.licenseImageURL} alt="" />
            </Modal.Body>
          </Modal>

          <Modal
            show={alternateImageModalShow}
            onHide={() => setAlternateImageModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="view-user-modal-body">
              <img src={user.alternateIDImageURL} alt="" />
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <Alert variant="warning">No user selected</Alert>
      )}
    </Fragment>
  );
}

ViewUser.propTypes = {
  user: PropTypes.object,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.data.user,
  UI: state.UI,
});

const mapActionsToProps = {
  //
};

export default connect(mapStateToProps, mapActionsToProps)(ViewUser);
