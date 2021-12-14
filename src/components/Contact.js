import React, { useEffect } from 'react'
import "./Contact.css";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import { SiGmail } from "react-icons/si";
import NavbarB from './NavbarB';
import Bbar from './Bbar';

function Contact() {
    
    return (
        <>
        <NavbarB/>
        <div className="image5">
          
        <div className="C-center">
        
            <div className="C-container C-font">
                <div className="C-title">
                  Hi guys
                </div>
                <div>
                <span className="C-icon"><RiIcons.RiEarthFill/></span> serching developer for your company? I'm currently available for work.
                </div>
                <div>
                <span className="C-icon"><FaIcons.FaQuestionCircle/></span> Maybe wanna learn something new or anything to ask?
                </div>
                <div className="C-mail">
                <div>
                <SiGmail/> Gmail<br/>
                lavakumar16000@gmail.com
                </div>
                </div>
            </div>
        </div>
        </div>
        <Bbar/>
        </>
    )
}

export default Contact
