import React, { useEffect } from "react";
import { Table, Card } from "react-bootstrap";
import PropTypes from "prop-types";

//COMPONENTS
import EquipmentRow from "./equipmentRow";

//CSS IMPORT
import "./manageEquipment.scss";

//REDUX
import { connect } from "react-redux";
import { getEquipment } from "../../redux/actions/dataActions";

function ManageEquipment(props) {
  //Get equipment information when component loads
  useEffect(() => {
    props.getEquipment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Destructure props
  const {
    data: { equipment, loading },
  } = props;

  //Map equipment data into components
  let equipmentMarkup = equipment.map((equipment) => (
    <EquipmentRow key={equipment._id} equipment={equipment} />
  ));

  return (
    <div className="manage-equipment">
      <Card>
        <Card.Header>
          <Card.Title>Manage Equipment</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover className="manage-equipment-table">
            <thead>
              <tr>
                <th>Equipment Name</th>
                <th>Rent/day</th>
                <th>Available Amount</th>
                <th>Rented Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>{!loading && equipmentMarkup}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

ManageEquipment.propTypes = {
  getEquipment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getEquipment,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageEquipment);
