import React, { useEffect, useState } from 'react'
import NavbarB from './NavbarB'
import {Button} from 'react-bootstrap';
import "./Home.css";
import axios from "axios";
import env from "./settings";
import Loading_page from './Loading_page';
import Model from './Model';
import {Link} from 'react-router-dom'

function Home() {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const [Loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  const [cart, setcart] = useState([]);

   const fetchdata = async (id) => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/getproducts`,{
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

  const fetchcartdata = async (id) => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/cartproducts`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setcart([...getdata.data])
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowData("SOMETHING WENT WRONG");
        setShow(true);
    }
  };

  const Addtocart  = async (id,quentity) => {
    try {
      setLoading(true);
     if(quentity!==0){
      let getdata = await axios.post(`${env.api}/addtocart`,{values : id},{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setLoading(false);
      setShowData("PRODUCT ADDED");
      setShow(true);
      fetchdata();
    fetchcartdata();
     }else{
      setLoading(false);
      setShowData("PRODUCT NOT AVAILABLE");
      setShow(true);
     }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if(error.message=="Request failed with status code 405"){
        setShowData("PRODUCT ALREDY ADDED");
        setShow(true);
      }else{
        setShowData("SOMETHING WENT WRONG");
        setShow(true);
      }
    }
  };

  const RemovefromCart  = async (id,name) => {
    try {
      let ok=window.confirm(`Are want to remove ${name} from cart ?`);
      if(ok){
        setLoading(true);
     
      let getdata = await axios.delete(`${env.api}/removecart/${id}`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setLoading(false);
      setShowData("REMOVED FROM CHECK OUT");
      setShow(true);
      fetchdata();
      fetchcartdata();
      } 
    } catch (error) {
      console.log(error);
      setLoading(false);
        setShowData("SOMETHING WENT WRONG");
        setShow(true);
      
    }
  };



  useEffect(() => {
    fetchdata();
    fetchcartdata();
  }, [])
    return (
        <>
       <NavbarB/>
    
       <div className='H-title'>
         HOME
       </div>
       <div className='H-button-title'>
         
        <Link to="/allusers"> <Button variant="outline-primary" className='H-button-title-margin'>All users</Button></Link>
        <Link to="/allproducts"><Button variant="outline-primary"  className='H-button-title-margin'>All products</Button></Link> 
         
       </div>
       <Model show={show}  setShow={setShow} data={showData}/>
        {
         Loading ? <Loading_page/>:<div className='H-overall'>
         
         <secttion className="H-tablePosition">
           <h4>HI WELCOME TO INVENTORY MANAGEMENT APP , {window.localStorage.getItem("name")}</h4>

         <table  className="H-tablesize" >
    <thead>
      <tr>
        <th>NO</th>
        <th>PRODUCT NAME</th>
        <th>PRODUCT ID</th>
        <th>QUENTITY</th>
        <th>Add/remove</th>
        
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
        <td>{data.quentity}</td>
        <td>{
          cart.some((obj)=>obj.productid===data._id) ? <Button onClick={()=>{RemovefromCart(data._id,data.Name)}} variant="danger">REMOVE</Button>:<Button onClick={()=>{Addtocart(data._id,data.quentity)}} variant="success">ADD</Button>
          }</td>
      </tr>
          );
        })
      }
    </tbody>
  </table>
  </secttion>
  </div>
       }

       </>
    )
}

export default Home
