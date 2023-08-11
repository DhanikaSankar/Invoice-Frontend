import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, FormGroup, Row } from "react-bootstrap";

function EditInvoice() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/index")
      .then((result) => setProducts(result.data.product));
  }, []);

  return (
    <Container>
      <Card>
        <Card.Title className="text-center" style={{ paddingBottom: "20px" }}>
          INVOICE
        </Card.Title>
        <Row>
          <FormGroup className="col-md-4" style={{ marginLeft: "110px" }}>
            <label htmlFor="">Customer Name</label>
            <input
              type="text"
              className="form-control"
              // onChange={(e) => handleCustomer(e)}
              name="customer_name"
              // value={input.product_total_price}
            />
          </FormGroup>

          <FormGroup className="col-md-4">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className="form-control"
              // onChange={(e) => handleCustomer(e)}
              name="address"
              // value={input.product_total_price}
            />
          </FormGroup>
        </Row>

        <Row className="formhead">
          <FormGroup className="col-md-2 offset-md-1 ">
            <label htmlFor="">Product Name</label>
            <select
              className="form-control"
              // onChange={(e) => handleSetOption(e)}
            >
              {products.map((product) => {
                return <option value={product.id}>{product.name}</option>;
              })}
            </select>
          </FormGroup>

          <FormGroup className="col-md-2">
            <label htmlFor="">Price</label>
            <input
              type="text"
              className="form-control"
              // onChange={(e) => handleChange(e, i)}
              name="product_price"
              // value={price}
              readOnly
            />
          </FormGroup>

          <FormGroup className="col-md-2">
            <label htmlFor="">Quantity</label>
            <input
              type="text"
              className="form-control"
              // onChange={(e) => handleChange(e, i)}
              name="product_quantity"
              // value={input.product_quantity}
            />
          </FormGroup>

          <FormGroup className="col-md-2">
            <label htmlFor="">Line Total</label>
            <input
              type="text"
              className="form-control"
              // onChange={(e) => handleChange(e, i)}
              name="product_total_price"
              // value={input.product_total_price}
              // value={total}
              readOnly
            />
          </FormGroup>
        </Row>

        <h6>TOTAL : </h6>
        <div className="btnsave">
          <Button type="submit" className="savebtn">
            Edit
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default EditInvoice;
