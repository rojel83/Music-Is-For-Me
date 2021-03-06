import React, { useRef, useContext, useState, useEffect } from 'react';
import "./style.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from "react-bootstrap/Alert";
import API from "../../utils/API";
import UserContext from "../../utils/UserContext";
import { Redirect } from "react-router-dom";



function Login() {
  const email = useRef();
  const password = useRef();
  const userState = useContext(UserContext);

  const [loginState, setLoginState] = useState({loginFailed : false, loggedIn : false});

  function GetLoginInfo(event) {
    event.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value
    }
    console.log("logging in");
    API.registerLogin(user).then(results => {
      userState.setCurrUser(results.data.user);
      setLoginState({...loginState, loggedIn: true});
    }).catch(e =>{
      setLoginState({
        loginFailed: true
      })
    });
  }

  

  if(loginState.loggedIn){
    return <Redirect to={"/profile/"+userState.currUser._id}></Redirect>
  }
  else{

    return (
      <div className="userInfoFormContainer">
      <div>
        <Form className="marginFromTop">
          <Form.Group className="parentOfTextEntry" controlId="formBasicEmail">
            <Form.Label className="formLabelTextMarginsLoginPage DescriptionOfPostText loginPageFont">Email address</Form.Label> <br/>
            <Form.Control className="widthOfLoginForm" type="email" placeholder="Enter email" ref={email} />
            
          </Form.Group>
      
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="formLabelTextMarginsLoginPage DescriptionOfPostText loginPageFont">Password</Form.Label> <br/>
            <Form.Control className="widthOfLoginForm" type="password" placeholder="Password" ref={password} />
          </Form.Group>
          <Button className="loginPageSubmitButton" variant="success" type="submit" onClick={GetLoginInfo}>
            Submit
      </Button>
      <Alert className="loginPageSubmitButton" variant="danger" show={loginState.loginFailed} onClose={() => setLoginState({loginFailed: false})} dismissible>
        The email and password you entered do not match what is in our system. Please try again.
      </Alert>
        </Form>
      </div>
      </div>
      )
    }
    }

export default Login;