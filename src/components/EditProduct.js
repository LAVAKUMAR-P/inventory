import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./Register.css";
import axios from "axios";
import Textfield from "./Textfield";
import env from "./settings";
import { useNavigate } from "react-router-dom";
import Loading_page from "./Loading_page";
import { GiArchiveRegister, GiAnticlockwiseRotation } from "react-icons/gi";
import Model from "./Model";
import NavbarB from "./NavbarB";
import Selectfield from "./Selectfield";
import { useParams } from "react-router-dom";

function EditProduct() {
  const Navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [Data, setData] = useState({});
  const [showData, setShowData] = useState("");
  const { productid } = useParams();

  const fetchdatabyid = async (id) => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/getproductbyid/${id}`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      console.log(getdata.data);
      setData(getdata.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowData("SOMETHING WENT WRONG");
      setShow(true);
    }
  };

  useEffect(() => {
    fetchdatabyid(productid);
  }, []);

  const validate = Yup.object({
    Name: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    proid: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    return: Yup.boolean("must be boolean").required(),
    type: Yup.string()
      .max(40, "Must be 40 characters or less")
      .required("Required"),
    quentity: Yup.number().required("Required"),
  });

  const postData = async (data) => {
    setLoading(true);
    try {
      let Data = await axios.put(`${env.api}/editproduct/${productid}`, data, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      window.alert("Product Edited");
      setLoading(false);
      Navigate("/allproducts");
    } catch (error) {
      setLoading(false);
      if (error.message === "Request failed with status code 409") {
        setShowData("PRODUCT ID already registered");
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
      <NavbarB />
      <div className='H-title'>
         EDIT PRODUCT
       </div>
      <Model show={show} setShow={setShow} data={showData} />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="Register-image">
          <section className="R-loginContainer">
            <div>
              <Formik
                initialValues={{
                  Name: Data.Name,
                  proid: Data.proid,
                  return: Data.return,
                  type: Data.type,
                  quentity: Data.quentity,
                }}
                validationSchema={validate}
                onSubmit={async (values) => {
                  if (values.return == "true") {
                    values.return = true;
                  } else if (values.return == "false") {
                    values.return = false;
                  }

                  postData(values);
                  setLoading(true);
                }}
              >
                {(formik) => (
                  <div>
                    <div className="R-content">
                      <div className="R-login-title">EDIT PRODUCT DETAILS</div>
                      <Form>
                        <div className="R-inputgird">
                          <Textfield
                            label="PRODUCT NAME"
                            name="Name"
                            type="text"
                            placeholder="Enter First Name"
                            placeholder="Enter your first Name"
                          />
                          <Textfield
                            label="PRODUCT ID"
                            name="proid"
                            type="text"
                            placeholder="Enter ID"
                          />
                          <Selectfield
                            label="RETURN"
                            name="return"
                            type="text"
                          />
                          <Textfield
                            label="PRODUCT TYPE"
                            name="type"
                            type="text"
                            placeholder="Eg:(SAFTY)"
                          />
                          <Textfield
                            label="PRODUCT QUENTITY"
                            name="quentity"
                            type="number"
                            placeholder="PRODUCT QUENTITY EG:(1)"
                          />
                        </div>
                        <div className="R-buttonPosition">
                          <button className="R-buttons" type="submit">
                            <span>
                              <GiArchiveRegister />
                            </span>
                            &nbsp; Register
                          </button>
                          <button className="R-buttons" type="reset">
                            <span>
                              <GiAnticlockwiseRotation />
                            </span>
                            &nbsp; Reset
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
      )}
    </>
  );
}

export default EditProduct;
