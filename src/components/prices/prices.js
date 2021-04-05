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
  const [allPrices, setAllPrices] = useState([]);
  const [allPricesConst, setAllPricesConst] = useState([]);

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
      let _prices = [];
      prices.forEach((element) => {
        element.prices.forEach((price) => {
          _prices.push({ ...price, type: element.type });
        });
      });
      setAllPrices(_prices);
      setAllPricesConst(_prices);
    }
  }, [prices]);

  //Markup for dynamic filter buttons
  const filterMarkup = pricePool.map((element, index) => (
    <Button
      className="search-user-button prices-filter-button"
      variant="outline-primary"
      key={index}
      onClick={() => filter(element.type)}
    >
      {element.type}
    </Button>
  ));

  //Markup for competitive prices
  const pricesMarkup = allPrices.map((element, index) => (
    <tr>
      <td style={{ textAlign: "left" }} key={index}>
        {element.name}
        {element.isLowestPrice && (
          <Badge pill variant="success" style={{ float: "right" }}>
            Lowest Price
          </Badge>
        )}
      </td>
      <td>{element.type}</td>
      <td>{`$${element.rentPerDay}`}</td>
      <td>{`$${element.rentPerWeek}`}</td>
      <td>{`$${element.rentPerMonth}`}</td>
    </tr>
  ));

  //Search prices from name or type
  const search = (input) => {
    const pricesCopy = allPricesConst.map((price) => price);
    const inputs = input.toLowerCase().split(" ");
    const searchKeys = ["type", "name"];
    let pricesArray = [];
    if (inputs.length === 1 && inputs[0] === "") {
      pricesArray = pricesCopy;
    } else {
      inputs.forEach((word) => {
        pricesCopy.filter((item) => {
          return Object.keys(item).some((key) => {
            if (searchKeys.includes(key)) {
              if (word.length > 0 && item[key].toLowerCase().includes(word))
                if (item) pricesArray.push(item);
            }
            return null;
          });
        });
      });
    }
    const result = [...new Set(pricesArray)];
    setAllPrices(result);
  };

  //Filter prices with type
  const filter = (filter_type) => {
    const pricesCopy = allPricesConst.map((price) => price);
    if (filter_type === "all") {
      setAllPrices(pricesCopy);
    } else {
      const filtered = pricesCopy.filter(
        (element) => element.type === filter_type
      );
      setAllPrices(filtered);
    }
  };

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
                    onChange={(e) => search(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col xs={9}>
                {!loading && pricePool.length > 0 ? (
                  <>
                    <Button
                      className="search-user-button prices-filter-button"
                      variant="outline-primary"
                      onClick={() => filter("all")}
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
              {!loading && allPrices.length > 0 ? (
                pricesMarkup
              ) : allPrices.length === 0 && !loading ? (
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
          {!loading && allPrices.length > 0 ? (
            <a
              href="https://amerirentacar.com/self-drive-rates-in-sri-lanka"
              target="_blank"
              className="price-link"
            >
              Prices gathered from AmeriRentCar
            </a>
          ) : null}
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
