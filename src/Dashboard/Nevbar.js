import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Theme from "../components/Theme";
import Context from "../context/Context";
import avatar from "./image/avatar.png";

export default function Nevbar(props) {
  const context = useContext(Context);
  const nevigate = useNavigate();
  const [avatarValue, setAvataeValue] = useState("");
  const [theme, setTheme] = useState("Night");
  const [icon, setIcon] = useState(`fa-solid fa-chevron-right`);
  //logout section
  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    nevigate("/login");
  };

  //fetchAvatar
  useEffect(() => {
    context.fetchAvatar();
    // eslint-disable-next-line
  }, []);

  //action on change
  const onChangeState = (e) => {
    if (e.target.checked) {
      setIcon(`fa-solid fa-chevron-left`);
      const hidden = document.getElementsByClassName("hidden");
      for (let elems of hidden) {
        elems.style.display = "inline-block";
      }
      const nav = document.getElementsByTagName("nav");
      for (let elems of nav) {
        elems.style.width = "30rem";
      }
      const description = document.querySelector(".description");
      description.style.display = "block";

      const iconsLink = document.querySelectorAll(".iconsLink");
      for (let elems of iconsLink) {
        elems.style.justifyContent = "left";
      }
    } else {
      setIcon(`fa-solid fa-chevron-right`);
      const hidden = document.getElementsByClassName("hidden");
      for (let elems of hidden) {
        elems.style.display = "none";
      }
      const nav = document.getElementsByTagName("nav");
      for (let elems of nav) {
        elems.style.width = "10rem";
      }
      const description = document.querySelector(".description");
      description.style.display = "none";
      const avatar = document.querySelector(".avatar");
      avatar.style.marginRight = "0";
      const iconsLink = document.querySelectorAll(".iconsLink");
      for (let elems of iconsLink) {
        elems.style.justifyContent = "center";
      }
    }
  };

  //upload picture
  const uploadOnClick = () => {
    context.uploadAvatar(avatarValue);
  };

  //visiblity
  const uploadSectonOnClick = () => {
    const fileUploadData = document.getElementsByClassName("fileUploadData");
    for (let fileSec of fileUploadData) {
      fileSec.style.display = "block";
    }
  };

  const onChangeValue = (e) => {
    setAvataeValue(e.target.files[0]);
  };
  const closephotomenu = () => {
    const fileUploadData = document.getElementsByClassName("fileUploadData");
    for (let fileSec of fileUploadData) {
      fileSec.style.display = "none";
    }
  };
  const checkboxTheme = (e) => {
    if (e.target.checked) {
      localStorage.setItem("checked", "Dark Mode Activated");
      setTheme("Day");
    } else {
      localStorage.removeItem("checked");
      setTheme("Night");
    }
  };

  return (
    <>
      <nav>
      <div onClick={()=>{
        let nav = document.querySelector('nav');
        nav.style.left = "-100%";
      }} className="close"><i className="fa-solid fa-xmark"></i></div>
        <div className="menu">
          
          <label htmlFor="toggleOnClick">
            <i className={icon}></i>
          </label>
          <input onChange={onChangeState} type="checkbox" id="toggleOnClick" />
        </div>
        <div className="profile">
        
          <h5
            onClick={uploadSectonOnClick}
            style={{ fontWeight: "400" }}
            className="avatarLabel"
            htmlFor="avatar"
          >
            <img
              className="avatar"
              name="avatar"
              src={!context.avatar.profile ? avatar : context.avatar.profile}
              alt="avatar"
            />
          </h5>
          <div className="fileUploadData">
            <h4 onClick={closephotomenu} className="closephotomenu">
              <i className="fa-solid fa-circle-xmark"></i>
            </h4>
            <input
              name="avatar"
              onChange={onChangeValue}
              id="avatarUpload"
              type="file"
            />
            <button onClick={uploadOnClick}>
              Upload <i className="fa-solid fa-cloud-arrow-up"></i>
            </button>
          </div>
          <div className="description">
            <h1>{props.name}</h1>
            <p>{props.profession}</p>
          </div>
        </div>
        <ul>
          <li>
            <Link className="iconsLink" to="/">
              <i className="fa-solid fa-house"></i>
              <span className="hidden"> Home </span>
            </Link>
          </li>
          <li>
            <Link className="iconsLink" to="profile">
              <i className="fa-solid fa-user"></i>
              <span className="hidden"> Profile </span>
            </Link>
          </li>
          <li>
            <Link className="iconsLink" to="notes">
              <i className="fa-solid fa-note-sticky"></i>
              <span className="hidden"> Notes </span>
            </Link>
          </li>
          <li>
            <Link className="iconsLink" to="/dashboard">
              <i className="fa-solid fa-calendar-check"></i>
              <span className="hidden"> Todo </span>
            </Link>
          </li>
          <li>
            <Link to="notes" className="iconsLink">
              <i className="fa-solid fa-circle-plus"></i>
              <span className="hidden"> Add Note </span>
            </Link>
          </li>
        </ul>
        <div className="theme">
          <span className="hidden">
            <h1>{theme} Mode</h1>
          </span>
          <div className="toggleTheme">
            <Theme checkboxTheme={checkboxTheme}/>
          </div>
        </div>
        <div className="footer">
          <button onClick={logOut}>
            <span className="hidden logout">Logout</span>{" "}
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </nav>
    </>
  );
}
