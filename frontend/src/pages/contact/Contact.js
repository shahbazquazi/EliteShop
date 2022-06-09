import React, { useEffect, useState } from "react";
import './Contact.css';
import { FaUserAlt, FaEnvelope} from "react-icons/fa";
import { MdChat } from "react-icons/md";
import { Button } from "@mui/material";
import { clearErrors, contactForm } from "../../actions/contactActions";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";

function Contact() {

    //Dispatch
    const dispatch = useDispatch();
    //Alert
    const alert = useAlert();
    //Get the value form store
    const {error} = useSelector(state => state.contactForm);

   const [name, setName] = useState(""); 
   const [email, setEmail] = useState(""); 
   const [message, setMessage] = useState(""); 

   // useEffect
   useEffect(() => {
     if(error) {
        alert.error(error);
        dispatch(clearErrors());
     }
   
    
   }, [dispatch, error, alert])
   

  //Form submit
  const contactFormSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("message", message);

    dispatch(contactForm(myForm));

    setName("");
    setEmail("");
    setMessage("");

    alert.success("Email sent successfully");
    
  };

  return (
    <>
      <div className="contactContainer">
        <form className="contactForm" onSubmit={contactFormSubmit}>
          <h1>Contact Us</h1>

          <div>
            <FaUserAlt className="inputSvg" />
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <FaEnvelope className="inputSvg"  />
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <MdChat className="textareaSvg" />
            <textarea
              type="text"
              placeholder="Message"
              cols="30"
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <Button
            className="createProductBtn"
            type="submit"
          >
            Send
          </Button>
        </form>
      </div>
    </>
  );
}

export default Contact;
