import React, { useEffect, useState } from 'react'
import { Card, Container, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

function ViewInvoice() {
    const [items, setItem] = useState([])
    const [lineItems, setLineItem] = useState()
    const [price, setPrice] = useState()
    const {id} = useParams();

    useEffect(() => {
        const asyncFn = async () => {
            let result = await fetch("http://localhost:8000/api/view/"+id);
            result = await result.json();
            setItem(result)
            const item = items.lineItem
            setLineItem(item)
        };
        asyncFn();
    },[items])

    if(lineItems){
        const val = lineItems.filter((item)=>item.product_total_price > 0)
        console.log(val);
    }else{
        console.log('error');
    }


  return (
    <Container>
        <Card className='viewcard'>
        <Card.Title className="text-center">INVOICE</Card.Title>
        <div>
            {items.length != 0 ? <>
            <p>TO : {items.invoice.customer_name} </p>
            <p>ADDRESS : {items.invoice.address} </p>
            <p>INVOICE DATE : {items.invoice.created_at_formatted}</p>
            <p>AMOUNT : </p>
            </>
            : ""}
        </div>

        <div>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ITEM</th>
          <th>QUANTITY</th>
          <th>UNIT PRICE</th>
          <th>LINE TOTAL</th>
        </tr>
      </thead>
      <tbody>

        {lineItems ? lineItems.map((items,i)=>{
            return(
                <tr>
                <td>{i+1}</td>
                <td>{items.product_price}</td>
                <td>{items.product_price}</td>
                <td>{items.product_quantity}</td>
                <td>{items.product_total_price}</td>
              </tr>

            )
        })
        :
        <tr>
            <td colSpan={5} className='text-center'>Loading...</td>
        </tr>
    
    }
               
        </tbody>
        </Table>
        </div>
        </Card>
    </Container>
  )
}

export default ViewInvoice