import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { changeRent } from "../../redux/actions/dataActions";

function ChangeRentModal(props) {
  const [errors, setErrors] = useState({});
  const [rent, setRent] = useState(0);

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const handleRentChange = async (event) => {
    //Stop page from reloading due to form submit
    event.preventDefault();
    let result = await props.changeRent(props.id, parseFloat(rent));
    console.log("result", result);
    //If no errors occur hide the modal
    if (result === true) props.onHide();
  };

  const {
    UI: { loading },
  } = props;

  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  delete newProps.UI;
  delete newProps.changeRent;
  delete newProps.id;

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onSubmit={handleRentChange}
      onExit={() => {
        setRent(0);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Change Rent
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Col sm="9">
              <Form.Control
                type="number"
                value={rent}
                required
                onChange={(e) => setRent(e.target.value)}
              />
            </Col>
            {errors && (
              <p
                className="error-text"
                hidden={!errors.message}
                style={{ marginLeft: 17 }}
              >
                {errors.message}
              </p>
            )}
            <Col sm="3">
              <Button variant="primary" type="submit" disabled={loading}>
                Change rent
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

ChangeRentModal.propTypes = {
  changeRent: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  changeRent,
};

export default connect(mapStateToProps, mapActionsToProps)(ChangeRentModal);
