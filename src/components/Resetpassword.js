import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import { useParams ,useNavigate} from "react-router";
import NavbarBL from "./NavbarBL";
import Loading_page from "./Loading_page";



function Resetpassword() {

  const{userId,token}=useParams()
  const[Loading,setLoading]=useState(false);
  const Navigate=useNavigate()
  const validate = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });


  
  return (
    <>
    <NavbarBL/>
      {
        Loading ? <Loading_page/>:<div className="Register-image">
        
        <section className="R-loginContainer">
          <div >
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validate}
              onSubmit={async (values) => {
                setLoading(true)
                try {
                  console.log(values);
                  let data =await axios.post(`${env.api}/reset/${userId}/${token}
                  `,{
                    password: values.password,
                  })
                 window.alert("password changed");
                setLoading(false);
                Navigate("/");
                } catch (error) {
                  setLoading(false)
                  if(error.message==="Request failed with status code 409"){
                    window.alert("Something went wrong");
                    console.log(error);
                  }
                  else{
                    window.alert("Something went wrong / check your network");
                    console.log(error);
                  }
                }

                
              }}
            >
              {(formik) => (
                <div>
                  <div className="R-content">
                    <div className="R-login-title">Reset password</div>
                    <Form>
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
                       <button className="R-buttons" type="submit">
                       Reset 
                      </button>
                      <button className="R-buttons" type="reset">
                        Reset
                      </button>
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

export default Resetpassword;
