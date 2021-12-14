import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import NavbarBL from "./NavbarBL";
import Loading_page from "./Loading_page";
import Model from "./Model";

function Forgotpassword() {
  const[Loading,setLoading]=useState(false);
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  const postData=async(values)=>{
    setLoading(true)
              try {
                let post = await axios.post(
                  `${env.api}/forgetpassword`,{email:values.email}
                );
                setShowData("Check your mail id for reset link");
                setShow(true);
                setLoading(false)
              } catch (error) {
                setLoading(false)
                console.log("error");
                if (error.message === "Request failed with status code 400") {
                  setShowData("Mail id not found");
                setShow(true);
                } else {
                  setShowData("something went wrong");
                setShow(true);
                }
              }
  }

  return (
    <>
      <NavbarBL/>
      <Model show={show}  setShow={setShow} data={showData}/>
      {
        Loading ? <Loading_page/>:<div className="image">
        <div className="L-container-position">
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              postData(values)
            }}
          >
            {(formik) => (
              <div className="L-loginContainer">
                <div className="L-content">
                  <div className="L-login-title">Forgotpassword</div>
                  <Form>
                    <Textfield
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter your mail id"
                    />
                    <button className="L-buttons" type="submit">
                      submit
                    </button>
                    <button className="L-buttons" type="reset">
                      Reset
                    </button>
                  </Form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
      }
    </>
  );
}

export default Forgotpassword;
