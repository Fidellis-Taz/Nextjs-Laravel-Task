 
import { useEffect, useState } from 'react'
import Head from 'next/head'
import AppLayout from '@/components/Layouts/AppLayout'
import { Button, Checkbox, Form, Input } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';
import redirect from 'nextjs-redirect'
import Router from "next/router";
export const getStaticPaths  = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees` )
    const data =   res.data

  
 const paths = data.map(employee =>{
    return {
        params : {id : employee.id.toString()}
    }
})
return {
    paths,
    fallback:false
   
}
}

export const getStaticProps = async (context) => {
    const id = context.params.id;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/`  + id)
    const data =   res.data.employees
    
        return {
          props: { employee:  data }
        }
 
   
  }
const Create = ({employee}) => {
     
  const [Name, setName] = useState(employee.Name)
  const [Address, setAddress] = useState(employee.Address)
  const [Job, setJob] = useState(employee.Job)
  
 const handleSubmit = async (e) =>{
    e.preventDefault()
     
    const sendData = {
        Name,
        Address,
        Job
    }
   
    await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/employees/${employee.id}`, sendData).then(({data})=>{
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
                Create A User
            </h2>
        }>

        <Head>
            <title>Create A User</title>
        </Head>

<div>
<div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
             

                <form  onSubmit={handleSubmit}  >
                 
  <div class="container">
    <h1>Add</h1>
    <p>Please fill in this form to add an Employee.</p>
    <hr/>

    <label for="email"><b>Name</b></label>
    <input type="text" placeholder="Enter Name" name="name" id="name" value={Name} onChange={(e => setName(e.target.value))} required/>
     
    <label for="psw"><b>Address</b></label>
    <input type="text" placeholder="Enter Address" name="address" id="address" value={Address} onChange={(e => setAddress(e.target.value))} required/>

    <label for="psw"><b>Job</b></label>
    <input type="text" placeholder="Enter Job" name="job" id="job" value={Job} onChange={(e => setJob(e.target.value))}  required/>

    <hr/>
 
    <button type="submit" class="registerbtn" onClick={handleSubmit}  >Update Employee</button>
  </div>
  
   
</form>

             </div>
            </div>


</div>




       


    </AppLayout>
      
    )
}

export default Create
