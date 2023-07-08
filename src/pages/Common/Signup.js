import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Select } from 'antd';
const { Option } = Select;

const Signup = () => {
  const isLoggedIn = useSelector(state => state.profile.signed_in);
  const actingAs = useSelector(state => state.profile.actingAs);
  const id = useSelector(state => state.profile.data ? state.profile.data._id : null);
  const { signInWithGoogle, handleRegistration, errorMessage } = useAuth();
    
  const history = useHistory();

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

  const handleSignUp = (values) => {
    // console.log(values);
    handleRegistration(values, history);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="880">+880</Option>
        <Option value="44">+44</Option>
        <Option value="966">+966</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div
      className='d-flex flex-column align-items-center justify-content-center'
      style={{ paddingTop: "80px" }}
    >
        <Card
          title={
            <h5>
              Create a new <strong>account</strong>
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
            onFinish={handleSignUp}
          >
            <Form.Item  label="Enter Your Username"
              name="userName"
              className="pb-1"
              rules={[
                {
                  type: 'name',
                  message: 'The input is not valid name!',
                },
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              hasFeedback
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

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

            <Form.Item
              name="mobileNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
              />
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

            <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: 'Please select gender!',
                },
              ]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                SIGN UP
              </Button>
            </Form.Item>
          </Form>
          
          {
            errorMessage ? <p className="text-warning text-center">{errorMessage}</p> : null
          }
        </Card>

        <div className="mt-4 text-center lit--14 below">Already have an account?
            <Link to="/login" className="ml-1"> <u>Sign In</u>
            </Link>
        </div>

        <strong className='text-primary my-4'>Or</strong>
        <Button onClick={signInWithGoogle}>
          <FcGoogle className='me-3' /> Sign up with Google
        </Button>
    </div>

  );
};

export default Signup;
