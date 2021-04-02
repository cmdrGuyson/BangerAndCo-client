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
  Badge,
} from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { getPrices } from "../../redux/actions/dataActions";

//CSS IMPORT
import "./prices.scss";

function Prices(props) {
  const [pricePool, setPricePool] = useState([]);

  //Destructure props
  const {
    data: { prices, loading },
  } = props;

  //Get price information when component loads
  useEffect(() => {
    props.getPrices();
  }, []);

  useEffect(() => {
    if (prices) {
      setPricePool(prices);
    }
  }, [prices]);

  //Markup for dynamic filter buttons
  const filterMarkup = pricePool.map((element, index) => (
    <Button
      className="search-user-button prices-filter-button"
      variant="outline-primary"
      key={index}
    >
      {element.type}
    </Button>
  ));

  //Markup for competitive prices
  const pricesMarkup = pricePool.map((element, index) => {
    return element.prices.map((element_, index_) => (
      <tr>
        <td style={{ textAlign: "left" }}>
          {element_.name}
          {element_.isLowestPrice && (
            <Badge pill variant="success" style={{ float: "right" }}>
              Lowest Price
            </Badge>
          )}
        </td>
        <td>{element.type}</td>
        <td>{`$${element_.rentPerDay}`}</td>
        <td>{`$${element_.rentPerWeek}`}</td>
        <td>{`$${element_.rentPerMonth}`}</td>
      </tr>
    ));
  });

  return (
    <div className="manage-equipment">
      <Card style={{ marginBottom: 20 }}>
        <Card.Body>
          <Card.Title>Search Competitive Pricing</Card.Title>
          <Card.Body>
            <Row>
              <Col xs={3}>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fas fa-search"></i>
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    placeholder="Search for prices"
                    aria-label="Search for prices"
                    aria-describedby="basic-addon2"
                  />
                </InputGroup>
              </Col>
              <Col xs={9}>
                {!loading && pricePool.length > 0 ? (
                  <>
                    <Button
                      className="search-user-button prices-filter-button"
                      variant="outline-primary"
                    >
                      All
                    </Button>
                    {filterMarkup}
                  </>
                ) : pricePool.length === 0 && !loading ? null : (
                  <tr>
                    <Alert variant="warning">Loading vehicle types!</Alert>
                  </tr>
                )}
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
                <th>Vehicle</th>
                <th>Type</th>
                <th>Rent/day</th>
                <th>Rent/week</th>
                <th>Rent/month</th>
              </tr>
            </thead>
            <tbody>
              {!loading && pricePool.length > 0 ? (
                pricesMarkup
              ) : pricePool.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5}>
                    <Alert variant="danger">No prices found!</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5}>
                    <Alert variant="warning">Loading vehicle prices!</Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

Prices.propTypes = {
  getPrices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getPrices,
};

export default connect(mapStateToProps, mapActionsToProps)(Prices);
