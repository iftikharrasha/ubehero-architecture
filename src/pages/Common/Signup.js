import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const Signup = () => {
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const actingAs = useSelector(state => state.profile.actingAs);
  const id = useSelector(state => state.profile.data ? state.profile.data._id : null);
  const { signInWithGoogle, handleRegistration, errorMessage } = useAuth();
  const [regData, setregData] = useState({ userName: "", emailAddress: "", password: "", mobileNumber: "", gender: "" });
    
  const history = useHistory();

  const handleSignUp = (e) => {
    e.preventDefault();
    handleRegistration(regData, history);
  };

  useEffect(() => {
    if (isLoggedIn && id) {
      if(actingAs === "user"){
        history.push(`/profile/${id}`);
      }else if(actingAs === "master"){
        history.push(`/master/${id}`);
      }else if(actingAs === "admin"){
        history.push(`/internal/${id}`);
      }else{
        history.push(`/profile/${id}`);
      }
    }
}, [isLoggedIn, id, actingAs, history]);

  return (
    <div
      className='d-flex flex-column align-items-center justify-content-center'
      style={{ paddingTop: "80px" }}
    >
      <h5 className='mb-5'>
        Create a new <strong className='text-primary '>account</strong>
      </h5>
      <Form className="w-25" onSubmit={handleSignUp}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="name" placeholder="Enter Name" 
            value={regData.userName}
            onChange={(e) =>
              setregData({
                  ...regData,
                  userName: e.target.value,
              })
          }/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" 
            value={regData.emailAddress}
            onChange={(e) =>
              setregData({
                  ...regData,
                  emailAddress: e.target.value,
              })
          }/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicMobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="tel" placeholder="Enter Mobile Number" value={regData.mobileNumber} onChange={(e) =>
                setregData({
                ...regData,
                mobileNumber: e.target.value,
                })
            }/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" 
            value={regData.password}
            onChange={(e) =>
              setregData({
                  ...regData,
                  password: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" value={regData.gender} onChange={(e) =>
                setregData({
                ...regData,
                gender: e.target.value,
                })
            }>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </Form.Control>
        </Form.Group>



        {
          errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
        }

        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>

        <div className="mt-4 text-center lit--14 below">Already have an account?
            <Link to="/login" className="ml-1"> <u>Sign In</u>
            </Link>
        </div>

        <strong className='text-primary my-4'>Or</strong>
        <button onClick={signInWithGoogle} className='btn btn-light'>
          <FcGoogle className='me-3' /> Sign up with Google
        </button>
    </div>

  );
};

export default Signup;
