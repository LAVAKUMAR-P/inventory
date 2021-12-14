import React, { useEffect, useState } from 'react'
import NavbarB from './NavbarB'
import {Button} from 'react-bootstrap';
import "./Home.css";
import axios from "axios";
import env from "./settings";
import Loading_page from './Loading_page';
import Model from './Model';
import {Link} from 'react-router-dom'
function Allproducts() {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const [Loading, setLoading] = useState(true);
  const [products, setproducts] = useState([]);
  

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

  

  


// Remove product
const Removeproduct  = async (id,name) => {
  try {
    let ok=window.confirm(`Are want to remove ${name}?`);
    if(ok){
      setLoading(true);
   
      let getdata = await axios.delete(`${env.api}/removeproduct/${id}`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setLoading(false);
      setShowData("Product removed");
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

  useEffect(() => {
    fetchdata();
  }, [])
    return (
        <>
       <NavbarB/>
       <div className='H-title'>
         ALL PRODUCTS
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
        <th>QUENTITY</th>
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
        <td>{data.quentity}</td>
        <td>
          <div>
         <Link to={`/editproduct/${data._id}`}><Button variant="warning" className='mt-5'>EDIT</Button></Link> {"  "}
          <Button onClick={()=>{Removeproduct(data._id,data.Name)}} variant="danger" className='mt-5'>DELETE</Button>
          </div>
        </td>
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

export default Allproducts
