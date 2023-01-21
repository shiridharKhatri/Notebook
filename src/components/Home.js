import React from "react";
import { Link } from "react-router-dom";
import darkmode from "../images/logo/darkmode.png";
export default function Home(props) {
  return (
    <>
      <div className="home">
        <div className="flex-display-home">
          <div className="home-item-One">
            <div className="logo">
              <img src={darkmode} alt="logo" />
            </div>
            {!localStorage.getItem("token") ? (
              <div className="authBtn">
                <Link to="/signup">
                  <button>Signup</button>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="home-item-Two">
            {localStorage.getItem("token") !== props.token ? (
              <h1>
                Create your account and store notes and access from anywhere in
                the world
              </h1>
            ) : (
              <h1>
                Welcome! Now you can click Redirect button below and save your
                notes
              </h1>
            )}
            {!localStorage.getItem("token") ? (
              <Link
                style={{ textDecoration: "none" }}
                to="/dashboard"
                className="cssbuttons-io-button"
              >
                {" "}
                Get started
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </Link>
            ) : (
              <Link
                style={{ textDecoration: "none" }}
                to="/dashboard"
                className="cssbuttons-io-button"
              >
                {" "}
                Redirect
                <div className="icon">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
