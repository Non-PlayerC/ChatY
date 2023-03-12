/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/APIRouter';

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    // 声明一个state（状态）变量values，以及一个用于更新state的函数setValues
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const toastOptions = {
    // 配置react-toastify（一个Toast组件库）的一些参数
    position: "bottom-right",
    autoClose: 8080,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  // 它通过调用 event.preventDefault() 阻止表单默认的提交行为，然后通过 handleValidation() 方法来验证表单数据是否合法。
  // 如果数据合法，它会从 values 对象中取出 email、username 和 password 等字段，然后通过调用 axios.post() 方法向服务器发起一个 POST 请求，
  // 请求的地址是 registerRoute 变量所指定的 API 路径。
  // 请求中包含了用户填写的注册信息。请求完成后，响应数据存储在 data 变量中，这里没有处理响应数据，可以根据具体需求进行处理。
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      console.log("in validation @", registerRoute);
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-ser", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("username should be greater than 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder='Username' name="username" onChange={handleChange} />
          <input type="email" placeholder='Email' name="email" onChange={handleChange} />
          <input type="password" placeholder='Password' name="password" onChange={handleChange} />
          <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={handleChange} />
          <button type='submit'>Create User</button>
          <span>Already have an account ? <Link to="/login">Login</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Register;