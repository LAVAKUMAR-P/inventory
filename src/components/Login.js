import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import "./Login.css";
import axios from "axios";
import { Link,useNavigate} from "react-router-dom";
import Textfield from "./Textfield";
import env from "./settings";
import Loading_page from "./Loading_page";
import NavbarBL from "./NavbarBL";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { CgLogIn } from "react-icons/cg";
import Model from "./Model";
import Bbar from "./Bbar";

function Login() {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const validate = Yup.object({
    emyid: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  const Navigate=useNavigate()
  const[Loading,setLoading]=useState(false);
 
  const postData=async(values)=>{
    setLoading(true)
    try {
      let postData = await axios.post(
        `${env.api}/login`,
        values
      );
      window.localStorage.setItem("app_token", postData.data.token);
      window.localStorage.setItem("action", postData.data.unconditional);
      window.localStorage.setItem("name", postData.data.username);
      setLoading(false);
      setShowData("Login sucessfull");
      setShow(true);
      let ok= window.localStorage.getItem("action");
      if(ok=="true"){
        Navigate("/home")
      }
      else{
        setShowData("Hay you registerd sucessfully");
        setShow(true);
      }
    } catch (error) {
      setLoading(false);
      console.log("error");
      if (error.message === "Request failed with status code 401") {
        setShowData("user name or password miss match");
        setShow(true);
        // window.alert("user name or password miss match");
      } else {
        setShowData("Something went wrong check your network");
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
              emyid: "",
              password: "",
            }}
            validationSchema={validate}
            onSubmit={async (values) => {
              setLoading(true)
              postData(values);
              console.log(values);
            }}
          >
            {(formik) => (
              <div className="L-loginContainer">
                <div className="L-content">
                  <div className="L-content-position">
                  <div className="L-login-title">Login</div>
                  <Form>
                    <Textfield label="Employee ID" name="emyid" type="text"   placeholder="Enter your Employee ID" />
                    <Textfield
                      label="password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                      <button className="L-buttons" type="submit">
                      <span><CgLogIn/></span>
                        Login
                      </button>
                    <button className="L-buttons" type="reset">
                       <span><GiAnticlockwiseRotation/></span>
                       Reset
                     </button>
                  </Form>
                  </div>
                  <div className="forgetpassword-position">
                  <Link to="/forgetpassword">forgetpassword?</Link>
                  </div>
                </div>
               
              </div>
            )}
          </Formik>
        </div>
      </div>
      }
     <Bbar/>
    </>
  );
}

export default Login;
