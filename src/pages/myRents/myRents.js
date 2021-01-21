//MODULE IMPORT
import React, { useEffect, useState } from "react";
import { Container, Alert, Table, Card } from "react-bootstrap";
import PropTypes from "prop-types";
//CSS IMPORT
import "./myRents.scss";
//COMPONENT IMPORT
import Navbar from "../../components/navbar/navbar";
import RentRow from "../../components/myRentTable/myRentRow";
import ViewRentModal from "../../components/viewRent/viewRentModal";

//REDUX
import { connect } from "react-redux";
import { getMyRents } from "../../redux/actions/dataActions";

function MyRents(props) {
  const [activeRents, setActiveRents] = useState([]);
  const [previousRents, setPreviousRents] = useState([]);
  const [rent, setRentObject] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const setRent = (rent) => {
    setRentObject(rent);
    setModalShow(true);
  };

  useEffect(() => {
    props.getMyRents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Destructure props
  const {
    data: { rents, loading },
  } = props;

  useEffect(() => {
    if (rents) {
      setActiveRents(rents.filter((e) => e.status !== "returned"));
      setPreviousRents(rents.filter((e) => e.status === "returned"));
    }
  }, [rents]);

  const activeRentMarkup = activeRents.map((rent) => (
    <RentRow key={rent._id} rent={rent} onView={setRent} />
  ));

  const previousRentMarkup = previousRents.map((rent) => (
    <RentRow key={rent._id} rent={rent} onView={setRent} />
  ));

  return (
    <>
      <div className="my_rents_image">
        <Navbar />
        <Container style={{ textAlign: "center" }}>
          <h2 className="title" style={{ marginTop: 80 }}>
            My Rents
          </h2>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </p>
        </Container>
      </div>
      <Container>
        <h2 className="rent-title" style={{ marginTop: 80 }}>
          Active Rents
        </h2>
        <Card>
          <Card.Body>
            <Table striped bordered hover className="manage-equipment-table">
              <thead>
                <tr>
                  <th>Vehicle Number</th>
                  <th>Vehicle</th>
                  <th>Pickup Date</th>
                  <th>Dropoff Date</th>
                  <th>Rent Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading && activeRents.length > 0 ? (
                  activeRentMarkup
                ) : activeRents.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="8">
                      <Alert variant="warning">You have no active rents!</Alert>
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
        <h2 className="rent-title" style={{ marginTop: 80 }}>
          Previous Rents
        </h2>
        <Card>
          <Card.Body>
            <Table striped bordered hover className="manage-equipment-table">
              <thead>
                <tr>
                  <th>Vehicle Number</th>
                  <th>Vehicle</th>
                  <th>Pickup Date</th>
                  <th>Dropoff Date</th>
                  <th>Rent Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {!loading && previousRents.length > 0 ? (
                  previousRentMarkup
                ) : previousRents.length === 0 && !loading ? (
                  <tr>
                    <td colSpan="8">
                      <Alert variant="warning">
                        You have no previous rents!
                      </Alert>
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
      </Container>
      {modalShow && (
        <ViewRentModal
          rent={rent}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      )}
    </>
  );
}

MyRents.propTypes = {
  getMyRents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getMyRents,
};

export default connect(mapStateToProps, mapActionsToProps)(MyRents);
