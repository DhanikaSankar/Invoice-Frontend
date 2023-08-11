import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  FormGroup,
  Row,
  Table,
} from "react-bootstrap";

function Invoice() {
  const [products, setProducts] = useState([]);
  const [option, setOption] = useState();
  const [price, setPrice] = useState([]);
  const [total, setTotal] = useState([]);
  const [netTotal, setNetTotal] = useState(0);
  const [inputList, setInputList] = useState([
    {
      product_price: "",
      product_quantity: "",
      product_total_price: "",
    },
  ]);
  const [customer, setCustomer] = useState({ customer_name: "", address: "" });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/index")
      .then((result) => setProducts(result.data.product));
  }, []);

  function handleChange(e, index) {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setTotal(e.target.value * price);
  }

  function handleAdd() {
    setPrice();
    setInputList([
      ...inputList,
      { product_price: "", product_quantity: "", product_total_price: "" },
    ]);
  }

  function handleRemove(index) {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }

  function handleSetOption(e) {
    setOption(e.target.value); //get product id
    const proItem = products.map((item, index) => {
      return index == option ? item.price : "";
    });
    let val = proItem.filter((data) => data);
    setPrice(val);
  }

  function handleCustomer(e) {
    setCustomer({...customer,[e.target.name]:e.target.value});
  }


  // console.log(customer);

  function handleSave() {}

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
              onChange={(e) => handleCustomer(e)}
              name="customer_name"
              // value={input.product_total_price}
            />
          </FormGroup>

          <FormGroup className="col-md-4">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleCustomer(e)}
              name="address"
              // value={input.product_total_price}
            />
          </FormGroup>
        </Row>
        {inputList.map((input, i) => {
          return (
            <Row className="formhead">
              <FormGroup className="col-md-2 offset-md-1 ">
                <label htmlFor="">Product Name</label>
                <select
                  className="form-control"
                  onChange={(e) => handleSetOption(e)}
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
                  onChange={(e) => handleChange(e, i)}
                  name="product_price"
                  value={price}
                  readOnly
                />
              </FormGroup>

              <FormGroup className="col-md-2">
                <label htmlFor="">Quantity</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e, i)}
                  name="product_quantity"
                  value={input.product_quantity}
                />
              </FormGroup>

              <FormGroup className="col-md-2">
                <label htmlFor="">Line Total</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleChange(e, i)}
                  name="product_total_price"
                  // value={input.product_total_price}
                  value={total}
                  readOnly
                />
              </FormGroup>

              <FormGroup className="col-md-2 mt-2">
                <Button onClick={() => handleRemove(i)} className="remove">
                  Remove
                </Button>
              </FormGroup>
            </Row>
          );
        })}
        <Button onClick={handleAdd} className="addmore">
          Add More
        </Button>

        <h6>TOTAL : {netTotal}</h6>
        <div className="btnsave">
          <Button onClick={handleSave} type="submit" className="savebtn">
            SAVE
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default Invoice;
