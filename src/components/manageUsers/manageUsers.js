import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  CardColumns,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

import "./manageUsers.scss";

import UserCard from "./userCard";

//REDUX
import { connect } from "react-redux";
import { getAllUsers } from "../../redux/actions/dataActions";

function ManageUsers(props) {
  const [_users, setUsers] = useState([]);
  const [userPool, setUserPool] = useState([]);
  const [category, setCategory] = useState(0);

  const {
    data: { users, loading },
  } = props;

  useEffect(() => {
    props.getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (users) {
      setUsers(users);
      setUserPool(users);
    }
  }, [users]);

  let usersMarkup = _users.map((user) => (
    <UserCard key={user._id} user={user} />
  ));

  //Search users using first name, last name or email
  const search = (input) => {
    const usersCopy = userPool.map((user) => user);
    const inputs = input.toLowerCase().split(" ");
    const searchKeys = ["email", "firstName", "lastName"];
    let usersArray = [];
    if (inputs.length === 1 && inputs[0] === "") {
      usersArray = usersCopy;
    } else {
      inputs.forEach((word) => {
        usersCopy.filter((item) => {
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) usersArray.push(item);
            }
            return null;
          });
        });
      });
    }
    const result = [...new Set(usersArray)];
    setUsers(result);
  };

  //When "All Users" button is clicked
  const setAllUsers = () => {
    setCategory(0);
    const usersCopy = users.map((user) => user);
    setUserPool(usersCopy);
    setUsers(usersCopy);
  };

  //When "Non-verified" button is clicked
  const setNonVerified = () => {
    setCategory(1);
    const usersCopy = users.map((user) => user);
    const result = usersCopy.filter((item) => {
      return !item.isVerified;
    });
    setUserPool(result);
    setUsers(result);
  };

  //When "Premium" button is clicked
  const setPremium = () => {
    setCategory(2);
    const usersCopy = users.map((user) => user);
    const result = usersCopy.filter((item) => {
      return item.isPremiumCustomer;
    });
    setUserPool(result);
    setUsers(result);
  };

  //When "Blacklisted" button is clicked
  const setBlacklisted = () => {
    setCategory(3);
    const usersCopy = users.map((user) => user);
    const result = usersCopy.filter((item) => {
      return item.isBlacklisted;
    });
    setUserPool(result);
    setUsers(result);
  };

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
                  placeholder="Search for a user"
                  aria-label="Search for a user"
                  aria-describedby="basic-addon2"
                  onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Button
                className="search-user-button"
                variant="outline-primary"
                active={category === 0}
                onClick={setAllUsers}
              >
                All Users
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-secondary"
                active={category === 1}
                onClick={setNonVerified}
              >
                Non-verified
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-success"
                active={category === 2}
                onClick={setPremium}
              >
                Premium
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-danger"
                active={category === 3}
                onClick={setBlacklisted}
              >
                Blacklisted
              </Button>{" "}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {_users.length > 0 ? (
        <CardColumns>{usersMarkup}</CardColumns>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <Alert variant="warning">No users found!</Alert>
      )}
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
