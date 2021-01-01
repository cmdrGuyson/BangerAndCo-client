import React, { useEffect, useState } from "react";
import { Table, Card } from "react-bootstrap";
import PropTypes from "prop-types";

//COMPONENTS
import RentRow from "./rentRow";

//CSS IMPORT
import "./manageRents.scss";

//REDUX
import { connect } from "react-redux";
import { getAllRents } from "../../redux/actions/dataActions";
import ViewRentModal from "../viewRent/viewRentModal";

function ManageRents(props) {
  const [modalShow, setModalShow] = useState(false);
  const [rent, setRentObject] = useState({});
  //Get rent information when component loads
  useEffect(() => {
    props.getAllRents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRent = (rent) => {
    setRentObject(rent);
    setModalShow(true);
  };

  //Destructure props
  const {
    data: { rents, loading },
  } = props;

  //Map rent data into components
  let rentMarkup = rents.map((rent) => (
    <RentRow key={rent._id} rent={rent} onView={setRent} />
  ));

  return (
    <div className="manage-equipment">
      <Card>
        <Card.Header>
          <Card.Title>Manage Rent</Card.Title>
        </Card.Header>
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
            <tbody>{!loading && rentMarkup}</tbody>
          </Table>
        </Card.Body>
      </Card>
      {modalShow && (
        <ViewRentModal
          rent={rent}
          show={modalShow}
          onHide={() => setModalShow(false)}
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
