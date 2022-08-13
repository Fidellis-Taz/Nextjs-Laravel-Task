 
import { useState } from 'react'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import Router from "next/router";

const Create = () => {
     
  const [Name, setName] = useState("")
  const [Address, setAddress] = useState("")
  const [Job, setJob] = useState()
  const [validationError,setValidationError] = useState({})

   
  const onFinish = (values) => {
    console.log('Success:', values);
    createEmployee()
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const createEmployee = async (e) => {
 e.preventDefault()
    const formData = new FormData()

    const sendData = {
      Name,
      Address,
      Job
  }

    await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/create`, sendData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
      Router.push("/dashboard")
    }).catch(({response})=>{
      /* if(response.status===422){
        setValidationError(response.data.errors)
      }else{ */
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    )
  }


    return (




        <AppLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
               Add Employee
            </h2>
        }>

        <Head>
            <title>Add Employee</title>
        </Head>

<div>
<div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
             

                <form   onSubmit={createEmployee}>
                   
  <div class="container">
     
    <p>Please fill in this form to add an Employee.</p>
    <hr/>

    <label for="email"><b>Name</b></label>
    <input type="text" placeholder="Enter Name" name="name" id="name" value={Name} onChange={(e => setName(e.target.value))} required/>

    <label for="psw"><b>Address</b></label>
    <input type="text" placeholder="Enter Address" name="address" id="address" value={Address} onChange={(e => setAddress(e.target.value))} required/>

    <label for="psw"><b>Job</b></label>
    <input type="text" placeholder="Enter Job" name="job" id="job" value={Job} onChange={(e => setJob(e.target.value))}  required/>

    <hr/>
 
    <button type="submit" class="registerbtn" onClick={createEmployee}>Add Employee</button>
  </div>
  
   
</form>

             </div>
            </div>


</div>




       


    </AppLayout>
      
    )
}

export default Create
