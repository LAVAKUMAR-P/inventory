import React, { useEffect, useState } from 'react'
import NavbarB from './NavbarB'
import {Button} from 'react-bootstrap';
import "./Home.css";
import axios from "axios";
import env from "./settings";
import Loading_page from './Loading_page';
import Model from './Model';
import {Link} from 'react-router-dom'
function Allusers() {
  const [show, setShow] = useState(false);
  const [showData, setShowData] = useState("");
  const [Loading, setLoading] = useState(true);
  const [Users, setUsers] = useState([]);
  

   const fetchdata = async (id) => {
    try {
      setLoading(true);
      let getdata = await axios.get(`${env.api}/getallusers`,{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
     setUsers([...getdata.data])
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setShowData("SOMETHING WENT WRONG");
        setShow(true);
    }
  };

  

  


// Remove product
const RemoveAdmin  = async (emyid,name) => {
  try {
    let ok=window.confirm(`Are want to remove ${name}?`);
    if(ok){
      setLoading(true);
   
      let getdata = await axios.post(`${env.api}/removeadmin`,{emyid:emyid},{
        headers: {
          Authorization: window.localStorage.getItem("app_token"),
        },
      });
      setLoading(false);
      setShowData("Admin removed");
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


// Remove product
const AddAdmin  = async (emyid,name) => {
    try {
      let ok=window.confirm(`Are want to remove ${name}?`);
      if(ok){
        setLoading(true);
     
        let getdata = await axios.post(`${env.api}/makeadmin`,{emyid:emyid},{
          headers: {
            Authorization: window.localStorage.getItem("app_token"),
          },
        });
        setLoading(false);
        setShowData("Admin removed");
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
         ALL USERS
       </div>
       <Model show={show}  setShow={setShow} data={showData}/>
        {
         Loading ? <Loading_page/>:<div className='H-overall'>
         
         <secttion className="H-tablePosition">

         <table  className="H-tablesize" >
    <thead>
      <tr>
        <th>NO</th>
        <th>NAME</th>
        <th>EMP ID</th>
        <th>GMAIL</th>
        <th>MOBILE/WHATSAPP</th>
        <th>ADMIN</th>
        <th>ADMIN & REMOVE</th>
      </tr>
    </thead>
    <tbody>
      {
        Users.map((data,index)=>{
          return(
            <tr key={index}>
        <td>{index+1}</td>
        <td>{data.Name}</td>
        <td>{data.emyid}</td>
        <td>{data.email}</td>
        <td>{data.admin ? "TRUE":"FALSE"}</td>
        <td>{`${data.mobile}/${data.whatsapp}`}</td>
        <td>
          {
              data.admin ?  <Button onClick={()=>{RemoveAdmin(data.emyid,data.Name)}} variant="danger" className='mt-5'>REMOVE ADMIN</Button>: <Button onClick={()=>{AddAdmin(data.emyid,data.Name)}} variant="danger" className='mt-5'>MAKE ADMIN</Button>
          }
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

export default Allusers
