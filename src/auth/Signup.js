import picture from "./images/signup.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Loader from "../loader/Loader";
export default function Signup(props) {
  const nevigate = useNavigate();

  //all the states
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
    profession: "",
  });
  const [error, setError] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  //On change states
  const signupOnChange = (event) => {
    setSignup({ ...signup, [event.target.id]: event.target.value });
    setError({ name: "", email: "", password: "" });
  };

  //this runs after clicking signup btns
  const signUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    props.progress(0);
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      name:signup.name,
      email: signup.email,
      password: signup.password,
      profession: signup.profession,
    });

    let response = await fetch("/auth/signup", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    props.progress(50);
    if (data.success === true) {
      nevigate("/login");
      setLoading(false);
      props.progress(100);
    } else if (data.success === false && data.status === 409) {
      setError({ name: "", email: data.msg, password: "" });
      setLoading(false);
      props.progress(100);
    } else {
      Array.from(data.errors).forEach((elems) => {
        if (elems.param === "name") {
          setError({ name: elems.msg, email: "", password: "" });
          setLoading(false);
          props.progress(100);
        }
        if (elems.param === "email") {
          setError({ name: "", email: elems.msg, password: "" });
          setLoading(false);
          props.progress(100);
        }
        if (elems.param === "password") {
          setError({ name: "", email: "", password: elems.msg });
          setLoading(false);
          props.progress(100);
        }
      });
    }
  };

  const mouseOver = () => {
    const back = document.querySelector(".back");
    back.style.opacity = "1";
  };
  const mouseLeave = () => {
    const back = document.querySelector(".back");
    back.style.opacity = "0";
  };
  return (
    <div className="signup">
      <div className="flex-display-signup">
        <h1 className="signupText">Create Account</h1>
        <Link className="goBack" to="/">
          {" "}
          <span onMouseLeave={mouseLeave} onMouseEnter={mouseOver}>
            <i className="fa-solid fa-chevron-left"></i>
          </span>
        </Link>
        <h3 className="back">Go Back</h3>
        <div className="item-one">
          <img src={picture} alt="signup" />
        </div>
        <div className="item-two-validation">
          <form onSubmit={signUp}>
            <div className="name_profession">
              <div className="name">
                <label htmlFor="name">Full Name</label>
                <input
                  style={
                    error.name
                      ? { border: "1px solid red" }
                      : { border: "1px solid #5ac3b0" }
                  }
                  onChange={signupOnChange}
                  value={signup.name}
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                />
                <p>{error.name}</p>
              </div>
              <div className="profession">
                <label htmlFor="profession">Profession</label>
                <input
                  onChange={signupOnChange}
                  value={signup.profession}
                  type="text"
                  id="profession"
                  placeholder="eg - web developer"
                />
              </div>
            </div>
            <label htmlFor="email">Email</label>
            <input
              style={
                error.email
                  ? { border: "1px solid red" }
                  : { border: "1px solid #5ac3b0" }
              }
              value={signUp.email}
              onChange={signupOnChange}
              type="email"
              placeholder="Enter your valid email"
              id="email"
            />
            <p>{error.email}</p>
            <label htmlFor="password">Password</label>
            <input
              style={
                error.password
                  ? { border: "1px solid red" }
                  : { border: "1px solid #5ac3b0" }
              }
              onChange={signupOnChange}
              value={signup.password}
              type="password"
              placeholder="Enter new password"
              id="password"
            />
            <p>{error.password}</p>
            <button>{loading === true ? <Loader /> : "Signup"}</button>
            <Link className="alreadyHaveAnAccount" to="/login">
              Already have an account? Login
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
              <a href="https://www.github.io">
                <span>
                  <i className="fa-brands fa-github"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
