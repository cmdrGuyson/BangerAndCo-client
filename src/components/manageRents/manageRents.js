import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//COMPONENTS
import RentRow from "./rentRow";
import ViewRentModal from "../viewRent/viewRentModal";

//CSS IMPORT
import "./manageRents.scss";

//REDUX
import { connect } from "react-redux";
import { getAllRents } from "../../redux/actions/dataActions";

function ManageRents(props) {
  const [modalShow, setModalShow] = useState(false);
  const [rent, setRentObject] = useState({});
  const [rentPool, setRentPool] = useState([]);

  const setRent = (rent) => {
    setRentObject(rent);
    setModalShow(true);
  };

  //Get rent information when component loads
  useEffect(() => {
    props.getAllRents();
    setRentPool(rents);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Destructure props
  const {
    data: { rents, loading },
  } = props;

  useEffect(() => {
    if (rents) {
      setRentPool(rents);
    }
  }, [rents]);

  const changeStatus = (_status) => {
    const allRents = rents.map((rent_obj) => rent_obj);
    let result;
    if (!(_status.toLowerCase() === "all")) {
      result = allRents.filter((item) => {
        if (item.status.toLowerCase() === _status.toLowerCase()) return item;
        else return null;
      });
    } else result = allRents;
    setRentPool(result);
  };

  //Map rent data into components
  let rentMarkup = rentPool.map((rent) => (
    <RentRow key={rent._id} rent={rent} onView={setRent} />
  ));

  //Flatten object attributes to avoid nested objects when filtering
  const flatten = (object) => {
    return Object.assign(
      {},
      ...(function _flatten(objectBit, path = "") {
        return [].concat(
          ...Object.keys(objectBit).map((key) =>
            typeof objectBit[key] === "object"
              ? _flatten(objectBit[key], `${key}`)
              : { [`${key}`]: objectBit[key] }
          )
        );
      })(object)
    );
  };

  const search = (input) => {
    const inputs = input.toLowerCase().split(" ");
    const allRents = rents.map((rent_obj) => rent_obj);
    const searchKeys = [
      "vehicleNumber",
      "model",
      "brand",
      "firstName",
      "lastName",
      "rentedFrom",
      "rentedTo",
      "total",
    ];
    let result = [];
    if (inputs.length === 0 || inputs[0] === "") {
      result = allRents;
    } else {
      inputs.forEach((word) => {
        allRents.filter((rent_obj) => {
          let obj_clone = { ...rent_obj };
          let flat_obj = flatten(obj_clone);
          return Object.keys(flat_obj).some((key) => {
            if (key === "rentedFrom" || key === "rentedTo")
              flat_obj[key] = dayjs(flat_obj[key])
                .format("DD/MM/YYYY", { timeZone: "Asia/Colombo" })
                .toString();
            if (searchKeys.includes(key)) {
              if (
                (word.length > 0 &&
                  flat_obj[key].toString().toLowerCase().includes(word)) ||
                (word.length > 0 && flat_obj[key] === word)
              ) {
                if (flat_obj) result.push(rent_obj);
              }
            }
            return null;
          });
        });
      });
    }
    result = [...new Set(result)];
    setRentPool(result);
  };

  return (
    <div className="manage-equipment">
      <Card style={{ marginBottom: 20 }}>
        <Card.Body>
          <Card.Title>Search Rents</Card.Title>
          <Card.Body>
            <Row>
              <Col xs={5}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-search"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for rents"
                    aria-label="Search for rents"
                    aria-describedby="basic-addon2"
                    onChange={(e) => search(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col xs={7}>
                <Button
                  className="search-user-button"
                  variant="outline-primary"
                  onClick={() => {
                    changeStatus("all");
                  }}
                >
                  All
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-secondary"
                  onClick={() => {
                    changeStatus("pending");
                  }}
                >
                  Pending
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-warning"
                  onClick={() => {
                    changeStatus("collected");
                  }}
                >
                  Collected
                </Button>{" "}
                <Button
                  className="search-user-button"
                  variant="outline-success"
                  onClick={() => {
                    changeStatus("returned");
                  }}
                >
                  Returned
                </Button>{" "}
              </Col>
            </Row>
          </Card.Body>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <Table striped bordered hover className="manage-equipment-table">
            <thead>
              <tr>
                <th>Vehicle Number</th>
                <th>Vehicle</th>
                <th>Pickup Date</th>
                <th>Dropoff Date</th>
                <th>Customer Name</th>
                <th>Rent Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading && rentPool.length > 0 ? (
                rentMarkup
              ) : rentPool.length === 0 && !loading ? (
                <tr>
                  <td colSpan="8">
                    <Alert variant="warning">No rents found!</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8">Loading!</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      {modalShow && (
        <ViewRentModal
          rent={rent}
          show={modalShow}
          onHide={() => setModalShow(false)}
          manage={true}
        />
      )}
    </div>
  );
}

ManageRents.propTypes = {
  getAllRents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllRents,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageRents);
