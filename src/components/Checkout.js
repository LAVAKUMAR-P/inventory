import React, { useEffect, useState } from "react";
import NavbarB from "./NavbarB";
import { Button } from "react-bootstrap";
import "./Home.css";
import axios from "axios";
import env from "./settings";
import Loading_page from "./Loading_page";
import Model from "./Model";
import { Link } from "react-router-dom";
function Checkout() {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const [Loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
 

  const fetchdata = async () => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/cartproducts`, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setproducts([...getdata.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowData("SOMETHING WENT WRONG");
      setShow(true);
    }
  };

  const RemovefromCart = async (id, name) => {
    try {
      let ok = window.confirm(`Are want to remove ${name} from cart ?`);
      if (ok) {
        setLoading(true);

        let getdata = await axios.delete(`${env.api}/removecart/${id}`, {
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        });
        setLoading(false);
        setShowData("REMOVED FROM CHECK OUT");
        setShow(true);
        fetchdata();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowData("SOMETHING WENT WRONG");
      setShow(true);
    }
  };

  const Increment = async (proid,id) => {
    setLoading(true);
    try {
      let Data = await axios.put(`${env.api}/cartincrementdecrement`,{proid,id,work:"INC"}, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
     
      setLoading(false);
      setShowData("INCREMENTED SUCESSFULLY");
        setShow(true);
        fetchdata();
    } catch (error) {
        setLoading(false)
      if (error.message === "Request failed with status code 501") {
        setShowData("Cann't increase because product not available");
       setShow(true);
        console.log(error);
      } else {
        setShowData("check your network");
        setShow(true);
        console.log(error);
      }
    }
  };

  const Decrement = async (proid,id,count) => {
  
    try {
        if(count>1){
            setLoading(true);
            let Data = await axios.put(`${env.api}/cartincrementdecrement`,{proid,id,work:"DEC"}, {
                headers: {
                  Authorization: window.localStorage.getItem("app_token"),
                },
              });
             
              setLoading(false);
              setShowData("DECREMENTED SUCESSFULLY");
                setShow(true);
                fetchdata();
        }else{
            setShowData("You Can only remove product");
                setShow(true);
        }
      
    } catch (error) {
        setLoading(false)
      if (error.message === "Request failed with status code 501") {
        setShowData("Cann't decrease");
       setShow(true);
        console.log(error);
      } else {
        setShowData("check your network");
        setShow(true);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);



  return (
    <>
      <NavbarB />
      <div className="H-title">CHECKOUT</div>
      <Model show={show} setShow={setShow} data={showData} />
      {Loading ? (
        <Loading_page />
      ) : (
        <div className="H-overall">
          <secttion className="H-tablePosition">
            <table className="H-tablesize">
              <thead>
                <tr>
                  <th>NO</th>
                  <th>PRODUCT NAME</th>
                  <th>PRODUCT ID</th>
                  <th>NUMBER OF ITEMS</th>
                  <th>Add/remove</th>
                  <th>INCREMENT/DECREMENT</th>
                </tr>
              </thead>
              <tbody>
                {products.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.Name}</td>
                      <td>{data.proid}</td>
                      <td>{data.count}</td>
                      <td>
                        {
                          <Button
                            onClick={() => {
                              RemovefromCart(data.productid, data.Name);
                            }}
                            variant="danger"
                          >
                            REMOVE
                          </Button>
                        }
                      </td>
                      <td>
                        <div>
                        
                            <Button variant="warning" onClick={()=>{Increment(data.productid,data._id)}}>
                              +
                            </Button>
                          
                          {"   "}
                          <Button
                           onClick={()=>{Decrement(data.productid,data._id,data.count)}}
                            variant="danger"
                           
                          >
                           -
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                     {
                       products.length>0 ?  <tr >
                       <td colSpan={6}> 
                       <Link to="/checkoutdetails"><Button variant="warning" >
                               Checkout
                             </Button>
                             </Link>
                      </td>
                       </tr>: <tr >
                       <td colSpan={6}> 
                       
                       KINDLY ADD PRODUCTS
                       </td>
                       </tr>
                     }
              </tbody>
            </table>
          </secttion>
        </div>
      )}
    </>
  );
}

export default Checkout;
