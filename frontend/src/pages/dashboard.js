import AppLayout from '@/components/Layouts/AppLayout'
 import Head from 'next/head'
import Link from 'next/link'
import { EditFilled, DeleteFilled, EyeFilled } from "@ant-design/icons"
import {Button, Modal,Tooltip } from 'antd';
import { async } from 'rxjs';
import qs from 'qs';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Router from "next/router";

 export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`)
const data = await res.json()


return {
    props :{ employees : data}
}
}
 
 

const Dashboard = ({employees}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Name, setName] = useState("")
  const [Address, setAddress] = useState("")
  const [Job, setJob] = useState()
  const showModal = (employee) => {
    setName(employee.Name)
    setAddress(employee.Address)
    setJob(employee.Job)
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  }; 

const handleDelete = async (id) =>{
  const res = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${id}`)
  .then(res =>{
    Swal.fire({
      icon:"success",
      text:"Employee Deleted"
    })
    Router.reload();
  })
}
    


    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>

            <Head>
                <title>Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                     
                    <div className='users' style={{margin:"30px 0px"}}>
       
       <Link href="employees/create">
          <a> <strong  style={{backgroundColor:"blue",padding:"20px",color:"white"}} >Add Employee</strong> </a>
        </Link>
      <table style={{marginTop:"40px"}} >     
  <tr>
    <th>Name</th>
    <th>Address</th>
    <th>Job</th>
    <th>Action</th>
  </tr>
    
  {
    employees.map(employee =>{
      return  (
        <tr>
        <td>{employee.Name}</td>
        <td>{employee.Address}</td>
        <td>{employee.Job}</td>
        <td>
          <button onClick={() => showModal(employee)}style={{marginRight:" 19px"}} > <Tooltip placement="left" title="Edit"  >
                                                <EyeFilled className='action__edit' />

                                            </Tooltip></button>
          <Link href={`employees/${employee.id}`}  key={employee.id}><Tooltip placement="left" title="Edit"  >
                                                <EditFilled className='action__edit' />

                                            </Tooltip></Link>
          <button onClick={()=> handleDelete(employee.id)} style={{marginLeft:"18px"}} ><Tooltip placement="right" title="Delete"  >
                                                <DeleteFilled className='action__delete' />
                                            </Tooltip></button>
        </td>
      </tr>
      )
   
   })
  }
  
</table>

      </div>
                </div>
            </div>
        
            <Modal title="Employee Details" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <table  >     
  <tr>
    <th>Name</th>
    <th>Address</th>
    <th>Job</th>
    
  </tr>
    
  
        <tr>
        <td>{Name}</td>
        <td>{Address}</td>
        <td>{Job}</td>
       
      </tr>
     
  
</table>
      </Modal>

        </AppLayout>
    )
}


 


export default Dashboard
