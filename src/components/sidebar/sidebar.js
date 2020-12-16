import React from "react";
import { Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import "./sidebar.scss";

//Redux
import { connect } from "react-redux";
import { setDashboard } from "../../redux/actions/uiActions";

const Sidebar = (props) => {
  const {
    UI: { dashboard },
  } = props;

  const handleSetDashboard = (event) => {
    const id = event.target.id;

    if (id === "user-dashboard-button") {
      props.setDashboard(0);
    } else {
      props.setDashboard(1);
    }
  };

  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <p className="logo sidebar-logo">Banger&Co</p>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 0 && "sidebar-button-active"
            }`}
            size="lg"
            id="user-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span>
              <i className="fas fa-users icon"></i>
              Users
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 1 && "sidebar-button-active"
            }`}
            size="lg"
            id="vehicle-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span>
              <i className="fas fa-car icon"></i>
              Vehicles
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 2 && "sidebar-button-active"
            }`}
            size="lg"
            id="equipment-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span>
              <i className="fas fa-tachometer-alt icon"></i>
              Equipment
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button variant="dark" className="sidebar-button" size="lg" href="/">
            <span>
              <i className="fas fa-home icon"></i>
              Home
            </span>
          </Button>
        </Nav.Item>
        <p className="sidebar-item-footer">Administrator Dashboard</p>
      </Nav>
    </>
  );
};

Sidebar.propTypes = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  setDashboard,
};

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
