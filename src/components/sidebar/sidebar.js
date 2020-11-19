import React from "react";
import { Nav, Button } from "react-bootstrap";

import "./sidebar.scss";

const Sidebar = (props) => {
  return (
    <>
      <Nav
        className="col-md-2 d-none d-md-block sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <p className="logo sidebar-logo">Banger&Co</p>
        <Nav.Item className="sidebar-item">
          <Button
            variant="dark"
            className="sidebar-button sidebar-button-active"
            size="lg"
          >
            <span>
              <i className="fas fa-users icon"></i>
              Users
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button variant="dark" className="sidebar-button" size="lg">
            <span>
              <i className="fas fa-car icon"></i>
              Vehicles
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

export default Sidebar;
