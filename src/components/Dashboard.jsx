import axios from 'axios'
import { MDBIcon } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { Button, Card, Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Dashboard() {
  const [invoices, setInvoices] = useState([])
  const nav = useNavigate();

  useEffect(() => {
     getData()
  }, [])

  async function handleDelete(id){
      let result= await fetch('http://localhost:8000/api/sales-invoice/'+id,{
        method:"DELETE"
      })
      result = await result.json()
      getData()
  }

  async function getData(){
    await axios.get('http://localhost:8000/api/index').then((result)=>setInvoices(result.data.invoice))
  }

  return (
    <div className='col-sm-6 offset-sm-3'>
      <Card className='dashboard'>
      <Card.Title className="text-center">INVOICE LIST</Card.Title>
      <Button onClick={()=>nav('/invoice')}>Create Invoice</Button>
        <Table striped bordered hover variant="dark">
          <thead >
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Address</th>
              <th>Create Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length != 0 ? 
            invoices.map((invoice,index)=>{
              return(
                <tr>
                <td>{index+1}</td>
                <td>{invoice.customer_name.charAt(0).toUpperCase()+invoice.customer_name.slice(1)}</td>
                <td>{invoice.address}</td>
                <td>{invoice.created_at_formatted}</td>
                <td>
                  <Button onClick={()=>nav(`/view/${invoice.id}`)}><MDBIcon fas icon="eye" /></Button>
                  <Button onClick={()=>nav(`/edit/${invoice.id}`)}><MDBIcon far icon="edit" /></Button>
                  <Button onClick={()=>handleDelete(invoice.id)}><MDBIcon fas icon="trash" /></Button>
                </td>
              </tr>
              )
            })
            :
            <>
             <tr>
                <td colSpan={5} className='text-center'>No Invoice</td>
                </tr>
            </>
          }
          </tbody>
        </Table>
        </Card>
    </div>
  )
}

export default Dashboard