import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import {useNavigate} from "react-router-dom";
import Loading_page from "./Loading_page";
import NavbarBL from "./NavbarBL";
import { GiArchiveRegister,GiAnticlockwiseRotation } from "react-icons/gi";
import Model from "./Model";
import Bbar from "./Bbar";


function Register() {
 
  const validate = Yup.object({
    Name: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    emyid: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
      department:Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Required"),
      mobile:Yup.string()
      .max(10, "Enter valide mobile Number")
      .required("Mobile number required"),
      whatsapp:Yup.string()
      .max(10, "Enter valide mobile Number")
      .required("Whats app number required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });

  const Navigate=useNavigate()
  const[Loading,setLoading]=useState(false);
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");

  const postData=async(data)=>{
    setLoading(true)
    try {
      let Data = await axios.post(`${env.api}/register`, data);
      window.alert("User registered");
      setLoading(false);
      Navigate("/")
    } catch (error) {
      setLoading(false)
      if (error.message === "Request failed with status code 409") {
        setShowData("Employee ID already registered");
       setShow(true);
        console.log(error);
      } else {
        setShowData("check your network");
        setShow(true);
        console.log(error);
      }
    }
  }
  
  return (
    <>
    <NavbarBL/>
    <Model show={show}  setShow={setShow} data={showData}/>
     {
       Loading ? <Loading_page/>: <div className="Register-image">
     
       <section className="R-loginContainer">
         <div>
           <Formik
             initialValues={{
               Name: "",
               emyid: "",
               email: "",
               department:"",
               mobile:"",
               whatsapp:"",
               password: "",
               confirmPassword: "",
             }}
             validationSchema={validate}
             onSubmit={async (values) => {
               console.log(values);
               let data = {
                 Name: values.Name,
                 emyid: values.emyid,
                 email: values.email,
                 department:values.department,
                 mobile:values.mobile,
                 whatsapp:values. whatsapp,
                 password: values.password,
              
               };
               postData(data);
               setLoading(true);
             }}
           >
             {(formik) => (
               <div>
                 <div className="R-content">
                   <div className="R-login-title">Register</div>
                   <Form>
                     <div className="R-inputgird">
                     <Textfield
                       label="Name(same in ID card)"
                       name="Name"
                       type="text"
                       placeholder="Enter First Name"
                       placeholder="Enter your first Name"
                     />
                     <Textfield
                       label="ID number"
                       name="emyid"
                       type="text"
                       placeholder="Enter ID number"
                     />
                     <Textfield
                       label="Email"
                       name="email"
                       type="email"
                       placeholder="Enter email"
                     />
                     <Textfield
                       label="Department"
                       name="department"
                       type="text"
                       placeholder="Enter Your Department"
                     />
                      <Textfield
                       label="Mobile Number"
                       name="mobile"
                       type="number"
                       placeholder="Enter Your Mobile Number"
                     />
                      <Textfield
                       label="Whats app"
                       name="whatsapp"
                       type="text"
                       placeholder="If you don't have enter null"
                     />
                     <Textfield
                       label="password"
                       name="password"
                       type="password"
                       placeholder="Enter password"
                     />
                     <Textfield
                       label="Confirm Password"
                       name="confirmPassword"
                       type="password"
                       placeholder="Confirm Password"
                     />
                     </div>
                     <div className="R-buttonPosition">
                     <button className="R-buttons" type="submit">
                       <span><GiArchiveRegister/></span>&nbsp;
                       Register
                     </button>
                     <button className="R-buttons" type="reset">
                       <span><GiAnticlockwiseRotation/></span>&nbsp;
                       Reset
                     </button>
                     </div>
                   </Form>
                   
                 </div>
               </div>
             )}
           </Formik>
         </div>
       </section>
     </div>
     }
   <Bbar/>
    </>
  );
}

export default Register;
