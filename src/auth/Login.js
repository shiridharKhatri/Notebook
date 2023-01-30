import React, { useState } from "react";
import picture from "./images/login.png";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
export default function Login() {
  let nevigate = useNavigate();
  const host = process.env.REACT_APP_HOST;
  //All use State 
  const [login, setLogin] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  //For login input 
  const loginOnChange = (event) => {
    setLogin({ ...login, [event.target.id]: event.target.value });
  };
  //take action after clicking login form
  const Login = async (e) => {
    e.preventDefault();
    setLoading(true);
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: login.email,
      password: login.password,
    });
    let response = await fetch(`${host}/auth/login`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    console.log(data)
    if (data.success === true) {
      localStorage.setItem("token", data.token);
      nevigate("/dashboard");
      window.location.reload();
      setLoading(false);
    } else {
      const LoginError = document.getElementById("LoginError");
      LoginError.style.opacity = "1";
      setLoading(false);
    }
  };

  //hiding error 
  const hideError = () => {
    const LoginError = document.getElementById("LoginError");
    LoginError.style.opacity = "0";
  };

  //hover effect on back button
  const mouseOver = () => {
    const back = document.querySelector(".back");
    back.style.opacity = "1";
  };

  //end hover effect on back button
  const mouseLeave = () => {
    const back = document.querySelector(".back");
    back.style.opacity = "0";
  };

  return (
    <>
    {!localStorage.getItem('token')?<div className="login">
      <div className="flex-display-login">
        <h1 className="LoginText">Welcome Back</h1>
        <Link className="goBack" to="/">
          {" "}
          <span
            style={{ backgroundColor: "#00a5bf" }}
            onMouseLeave={mouseLeave}
            onMouseEnter={mouseOver}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </span>
        </Link>
        <h3 className="back">Go Back</h3>
        <div className="item-one">
          <img src={picture} alt="signup" />
        </div>
        <div className="item-two-login">
          <form action="" onSubmit={Login}>
            <h3 id="LoginError">
              Please Login With Correct Crediential{" "}
              <span className="cross" onClick={hideError}>
                <i className="fa-solid fa-xmark"></i>
              </span>
            </h3>
            <label htmlFor="email">Email</label>
            <input
              onChange={loginOnChange}
              value={login.email}
              type="email"
              placeholder="Enter your email"
              id="email"
            />
            <p></p>
            <label htmlFor="password">Password</label>
            <input
              onChange={loginOnChange}
              value={login.password}
              type="password"
              placeholder="Enter your password"
              id="password"
            />
            <p></p>
            <button>{loading === true ? <Loader /> : "Login"}</button>
            <Link className="forgetPassword" to="/forgetPassword">Forget password?</Link>
            <Link className="dontHaveAnAccount" to="/signup">
              <button className="signup-btn">Create new account</button> 
            </Link>
          </form>
          <div className="contactus">
            <h2>Need Helps? Contact us.</h2>
            <div className="social-links">
              <a href="https://www.facebook.com">
                <span>
                  <i className="fa-brands fa-facebook-f"></i>
                </span>
              </a>
              <a href="https://www.instagram.com">
                <span>
                  <i className="fa-brands fa-instagram"></i>
                </span>
              </a>
              <a href="https://www.linkdin.com">
                <span>
                  <i className="fa-brands fa-linkedin-in"></i>
                </span>
              </a>
              <a href="https://www.giyhub.io">
                <span>
                  <i className="fa-brands fa-github"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>:nevigate('/dashboard')}
    </>
  );
}
