import axios from "axios";
import { MDBIcon } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import {Button,Card,Container,Form,FormGroup,Row,Table,} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Invoice() {
  const [products, setProducts] = useState([]);
  const [productsId, setProductId] = useState('');
  const [option, setOption] = useState([]);
  const [price, setPrice] = useState();
  const [total, setTotal] = useState();
  const [netTotal, setNetTotal] = useState(0);
  const [inputList, setInputList] = useState([{
                                              product_id:"",
                                              product_price: "",
                                              product_quantity: "",
                                              product_total_price: "",
                                            }]);

  const [customer, setCustomer] = useState({ customer_name: "", address: "" });
  const nav = useNavigate();

  useEffect(() => {
    const getProductData= async()=>{
      const reqData = await fetch('http://localhost:8000/api/index')
      const resData = await reqData.json()
      setProducts(await resData.product)
    }
    getProductData();
  }, []);

  // Get product 
    useEffect(() => {
      const getProductData = async()=>{
        const reqProData = await fetch(`http://localhost:8000/api/product/${productsId}`);
        const resProData = await reqProData.json();
        setOption(await resProData.products);
      }
      getProductData();
  
    }, [productsId])



  function handleChange(e, index) {
    const { name, value } = e.target;
    const list = [...inputList];
    console.log(list);
    list[index][name] = value;
    setInputList(list);
  }

  function handleSetOption(e) {
    // product id
    const proId= e.target.value;
    setProductId(proId);

    // product price
    const proPrice = option.price
    setPrice(proPrice)

    // product line total
    const line = proPrice*inputList.product_quantity
    setTotal(line)

  }


  function handleAdd() {
    setInputList([
      ...inputList,
      { name:"",product_quantity: "",product_total_price:"",product_price:""},
    ]);
  }

  function handleRemove(index) {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  }

  function handleCustomer(e) {
    setCustomer({...customer,[e.target.name]:e.target.value});
  }


  async function handleSave() {
    const item = {inputList, customer};
    let result = await fetch("http://localhost:8000/api/add", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();

    nav('/dashboard')
  }

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
            />
          </FormGroup>

          <FormGroup className="col-md-4">
            <label htmlFor="">Address</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => handleCustomer(e)}
              name="address"
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
                  // onChange={(e) => handleChange(e)}
                >
                  <option>----Select Product----</option>
                  {products.map((product,index) => {
                    return <option key={index} value={product.id}>{product.name}</option>;
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
                  value={option.price}
                  readOnly
                />
              </FormGroup>

              <FormGroup className="col-md-2">
                <label htmlFor="">Quantity</label>
                <input
                  type="number"
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
                  // value={total}
                  // readOnly
                />
              </FormGroup>

              <FormGroup className="col-md-2 mt-2">
                <Button onClick={() => handleRemove(i)} className="remove">
                <MDBIcon fas icon="trash" />
                </Button>
              </FormGroup>
        
            </Row>
      
          );
        })}
        
        <Button onClick={handleAdd} className="addmore" >
          Add Product
        </Button>

        {/* <h6>TOTAL : {netTotal}</h6> */}
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
