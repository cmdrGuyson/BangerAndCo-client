import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/sidebar/sidebar";
import "./dashboard.scss";

import ManageUsers from "../../components/manageUsers/manageUsers";
import ViewUser from "../../components/manageUsers/viewUser";

//Redux

const Dashboard = (props) => {
  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={7} id="page-content-wrapper">
            <ManageUsers />
          </Col>
          <Col xs={3} id="page-content-wrapper">
            <ViewUser />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
