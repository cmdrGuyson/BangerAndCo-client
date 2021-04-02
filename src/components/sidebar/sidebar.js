import React from "react";
import { Nav, Button } from "react-bootstrap";
import PropTypes from "prop-types";

//CSS
import "./sidebar.scss";

//Redux
import { connect } from "react-redux";
import { setDashboard } from "../../redux/actions/uiActions";

const Sidebar = (props) => {
  //Destructure props
  const {
    UI: { dashboard },
  } = props;

  //Manage clicks on dashboard buttons
  const handleSetDashboard = (event) => {
    const id = event.target.id;
    console.log("Click", id);
    if (id === "user-dashboard-button" || id === "user-dashboard-icon") {
      props.setDashboard(0);
    } else if (
      id === "vehicle-dashboard-button" ||
      id === "vehicle-dashboard-icon"
    ) {
      props.setDashboard(1);
    } else if (
      id === "equipment-dashboard-button" ||
      id === "equipment-dashboard-icon"
    ) {
      props.setDashboard(2);
    } else if (id === "rent-dashboard-button" || id === "rent-dashboard-icon") {
      props.setDashboard(3);
    } else if (
      id === "prices-dashboard-button" ||
      id === "prices-dashboard-icon"
    ) {
      props.setDashboard(4);
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
            <span id="user-dashboard-icon" onClick={handleSetDashboard}>
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
            <span id="vehicle-dashboard-icon" onClick={handleSetDashboard}>
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
            <span id="equipment-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-tachometer-alt icon"></i>
              Equipment
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 3 && "sidebar-button-active"
            }`}
            size="lg"
            id="rent-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="rent-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-file-invoice-dollar icon"></i>
              Rents
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className={`sidebar-button ${
              dashboard === 4 && "sidebar-button-active"
            }`}
            size="lg"
            id="prices-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="prices-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-dollar-sign icon"></i>
              Prices
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button variant="dark" className="sidebar-button" size="lg" href="/">
            <span id="home-dashboard-icon" onClick={handleSetDashboard}>
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
