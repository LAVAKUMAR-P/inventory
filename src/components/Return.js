import React, { useEffect, useState } from 'react'
import NavbarB from './NavbarB'
import {Button} from 'react-bootstrap';
import "./Home.css";
import axios from "axios";
import env from "./settings";
import Loading_page from './Loading_page';
import Model from './Model';
import {Link} from 'react-router-dom'
function Return() {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const [Loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  

   const fetchdata = async () => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/returnproducts`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
     setproducts([...getdata.data])
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowData("SOMETHING WENT WRONG");
        setShow(true);
    }
  };

  const Return = async (id,productid) => {
    setLoading(true);
    try {
      let Data = await axios.put(`${env.api}/return`,{id,productid}, {
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
     
      setLoading(false);
      setShowData("RETURNED SUCCESSFULLY");
        setShow(true);
        fetchdata();
    } catch (error) {
        setLoading(false)
      if (error.message === "Request failed with status code 501") {
        setShowData("RETURN FAILE");
       setShow(true);
        console.log(error);
      } else {
        setShowData("RETURN FAILE");
        setShow(true);
        console.log(error);
      }
    }
  };

  

  useEffect(() => {
    fetchdata();
  }, [])
    return (
        <>
       <NavbarB/>
       <div className='H-title'>
         NOT RETURNED PRODUCTS
       </div>
       <Model show={show}  setShow={setShow} data={showData}/>
        {
         Loading ? <Loading_page/>:<div className='H-overall'>
         
         <secttion className="H-tablePosition">

         <table  className="H-tablesize" >
    <thead>
      <tr>
        <th>NO</th>
        <th>PRODUCT NAME</th>
        <th>PRODUCT ID</th>
        <th>COUNT</th>
        <th>NAME/EMPID/DEP</th>
        <th>Date</th>
        <th>EDIT</th>
      </tr>
    </thead>
    <tbody>
      {
        products.map((data,index)=>{
          return(
            <tr key={index}>
        <td>{index+1}</td>
        <td>{data.Name}</td>
        <td>{data.proid}</td>
        <td>{data.count}</td>
        <td>{`${data.empname}/${data.emyid}/${data.department}`}</td>
        <td>{data.date}</td>
        <td>
          <div>
          <Button variant="danger" className='mt-5'
          onClick={()=>{Return(data._id,data.productid)}}
          >RETURNED</Button>
          </div>
        </td>
      </tr>
          );
        })
      }
      {
       (products.length >0) ? "": <tr >
       <td colSpan={7}> 
        NO PRODUCTS 
       </td>
       </tr>   
      }
    </tbody>
  </table>
  </secttion>
  </div>
       }
       
       </>
    )
}

export default Return
