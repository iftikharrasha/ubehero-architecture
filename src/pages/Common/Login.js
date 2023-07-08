import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Form, Input, Row } from 'antd';

const Login = () => {
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const actingAs = useSelector(state => state.profile.actingAs);
  const id = useSelector(state => state.profile.data ? state.profile.data._id : null);
  const {  signInWithGoogle, handleLogin, errorMessage } = useAuth();
    
  const history = useHistory();
  const location = useLocation();

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

  const handleSignIn = (values) => {
    handleLogin(values, history, location);
  };

  return (
    <div className='d-flex flex-column align-items-center justify-content-center'
      style={{ paddingTop: "150px" }}
    >
      <Card
        title={
          <h5>
              Sign into <strong>your account</strong>
          </h5>
        }
        bordered={false}
        style={{
          width: '35rem',
        }}
      >
        <Form name="normal_login"
          className="login-form"
          layout='vertical'
          initialValues={{
            remember: true,
          }}
          onFinish={handleSignIn}
        >
          <Form.Item  label="Enter Your Email Address"
            name="emailAddress"
            className="pb-1"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid Email!',
              },
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
            hasFeedback
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item label="Enter Your Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>


          <Form.Item>
              <Row justify="space-between" align="middle">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Link to="/">
                  Forgot password
                </Link>
              </Row>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOG IN
            </Button>
          </Form.Item>
        </Form>
        
        {
          errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
        }
      </Card>

        <div className="mt-4 text-center">Don't have any account?
            <Link to="/signup" className="ml-1"> <u>Create Account</u></Link>
        </div>

        <div className="text-center">
          <div className='text-primary my-3'>Or</div>
          <Button onClick={signInWithGoogle}><FcGoogle className='me-3' /> Sign in with Google</Button>
        </div>
    </div>

  );
};

export default Login;
