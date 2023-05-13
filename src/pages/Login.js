import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from "../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

const Login = () => {
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const actingAs = useSelector(state => state.profile.actingAs);
  const id = useSelector(state => state.profile.data ? state.profile.data._id : null);
  const {  signInWithGoogle, handleLogin, errorMessage } = useAuth();
  const [logData, setLogData] = useState({ emailAddress: "", password: "" });
    
  const history = useHistory();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    handleLogin(logData, history, location);
  };

  useEffect(() => {
    if (isLoggedIn && id) {
      if(actingAs === "admin"){
        history.push(`/internal/${id}`);
      }else if(actingAs === "master"){
        history.push(`/master/${id}`);
      }else{
        history.push(`/profile/${id}`);
      }
    }
}, [isLoggedIn, id, actingAs, history]);

  return (
    <div
      className='d-flex flex-column align-items-center justify-content-center'
      style={{ paddingTop: "150px" }}
    >
      <h5 className='mb-5'>
        Sing into <strong className='text-primary '>your account</strong>
      </h5>
      <Form className="w-25" onSubmit={handleSignIn}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
            value={logData.emailAddress}
            onChange={(e) =>
              setLogData({
                  ...logData,
                  emailAddress: e.target.value,
              })
          }/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            value={logData.password}
            onChange={(e) =>
              setLogData({
                  ...logData,
                  password: e.target.value,
              })
            }
          />
        </Form.Group>

        {
          errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
        }

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>

        <div className="mt-4 text-center lit--14 below">Don't have any account?
            <Link to="/signup" className="ml-1"> <u>Create Account</u>
            </Link>
        </div>

        <strong className='text-primary my-4'>Or</strong>
        <button onClick={signInWithGoogle} className='btn btn-light'>
          <FcGoogle className='me-3' /> Sign in with Google
        </button>
    </div>

  );
};

export default Login;
