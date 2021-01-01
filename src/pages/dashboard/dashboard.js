import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "./dashboard.scss";

import ManageUsers from "../../components/manageUsers/manageUsers";
import ManageVehicles from "../../components/manageVehicles/manageVehicles";
import ManageEquipment from "../../components/manageEquipment/manageEquipment";
import ManageRents from "../../components/manageRents/manageRents";
import ViewUser from "../../components/manageUsers/viewUser";
import ViewVehicle from "../../components/manageVehicles/viewVehicle";
import Sidebar from "../../components/sidebar/sidebar";

//Redux
import { connect } from "react-redux";

const Dashboard = (props) => {
  const {
    UI: { dashboard },
  } = props;

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          {dashboard === 2 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageEquipment />
            </Col>
          ) : dashboard === 3 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageRents />
            </Col>
          ) : (
            <>
              <Col xs={7} id="page-content-wrapper">
                {dashboard === 0 ? <ManageUsers /> : <ManageVehicles />}
              </Col>
              <Col xs={3} id="page-content-wrapper">
                {dashboard === 0 ? <ViewUser /> : <ViewVehicle />}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(Dashboard);
