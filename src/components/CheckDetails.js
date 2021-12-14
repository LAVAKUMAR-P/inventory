import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import {useNavigate} from "react-router-dom";
import Loading_page from "./Loading_page";
import { GiArchiveRegister,GiAnticlockwiseRotation } from "react-icons/gi";
import Model from "./Model";
import NavbarB from "./NavbarB";


function CheckDetails() {
 
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
  });

  const Navigate=useNavigate()
  const[Loading,setLoading]=useState(false);
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");

  const Checkout = async (data) => {
    setLoading(true);
    try {
      let Data = await axios.post(`${env.api}/checkout`,{Name:data.Name,emyid:data.emyid, department:data.department}, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
     
      setLoading(false);
      setShowData("CHECKOUT DONE");
        setShow(true);
        Navigate("/checkout")
    } catch (error) {
        setLoading(false)
      if (error.message === "Request failed with status code 501") {
        setShowData("WITHOUT PRODUCT YOU CAN'T CHECKOUT");
       setShow(true);
        console.log(error);
      } else {
        setShowData("check your network");
        setShow(true);
        console.log(error);
      }
    }
  };
  
  return (
    <>
    <NavbarB/>
    <div className='H-title'>
         CHECKOUT DETAILS
    </div>
    <Model show={show}  setShow={setShow} data={showData}/>
     {
       Loading ? <Loading_page/>: <div className="Register-image">
     
       <section className="R-loginContainer">
         <div>
           <Formik
             initialValues={{
               Name: "",
               emyid: "",
               department:"",

             }}
             validationSchema={validate}
             onSubmit={async (data) => {
               Checkout(data);
               setLoading(true);
             }}
           >
             {(formik) => (
               <div>
                 <div className="R-content">
                   <div className="R-login-title">Employee Details</div>
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
                       label="Department"
                       name="department"
                       type="text"
                       placeholder="Enter Your Department"
                     />
                     </div>
                     <div className="R-buttonPosition">
                     <button className="R-buttons" type="submit">
                       <span><GiArchiveRegister/></span>&nbsp;
                       CHECKOUT
                     </button>
                     <button className="R-buttons" type="reset">
                       <span><GiAnticlockwiseRotation/></span>&nbsp;
                       RESET
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
  
    </>
  );
}

export default CheckDetails;
