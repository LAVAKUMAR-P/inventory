import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import ProductRegister from './components/ProductRegister';
import EditProduct from './components/EditProduct';
import Allproducts from './components/Allproducts';
import Checkout from './components/Checkout';
import Return from './components/Return';
import CheckDetails from './components/CheckDetails';
import NonReturn from './components/NonReturn';
import Allusers from './components/Allusers';
import Forgotpassword from './components/Forgotpassword';
import Resetpassword from './components/Resetpassword';
import Contact from './components/Contact';


function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} exact={true}/>
        <Route path="/register" element={<Register/>} exact={true}/>
        <Route path="/home" element={<Home/>} exact={true}/>
        <Route path="/registerproduct" element={<ProductRegister/>} exact={true}/>
        <Route path="/checkout" element={<Checkout/>} exact={true}/>
        <Route path="/checkoutdetails" element={<CheckDetails/>} exact={true}/>
        <Route path="/return" element={<Return/>} exact={true}/>
        <Route path="/allusers" element={<Allusers/>} exact={true}/>
        <Route path="/nonreturn" element={<NonReturn/>} exact={true}/>
        <Route path="/editproduct/:productid" element={<EditProduct/>} exact={true}/>
        <Route path="/allproducts" element={<Allproducts/>} exact={true}/>
        <Route path="/contact" element={<Contact/>} exact={true}/>
        <Route path="/forgetpassword" element={<Forgotpassword/>} exact={true}/>
        <Route path="/resetpassword/:userId/:token" element={<Resetpassword/>} exact={true}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
