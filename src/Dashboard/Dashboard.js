import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import Context from "../context/Context";
import MainLoader from "../loader/MainLoader";
import logoMain from "./image/logoMain.png";
import Nevbar from "./Nevbar";
export default function Dashboard() {
  const context = useContext(Context);
  const nevigate = useNavigate();
  useEffect(() => {
    context.fetchUsers();
    context.fetchNotes();
    context.fetchAvatar();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {(localStorage.getItem('token')) ? (
        <div className="container">
          {context.loader === true ? (
            <MainLoader />
          ) : (
            <header>
              <Nevbar
                name={context.userData.name}
                profession={context.userData.profession}
              />
              <div className="homeContainer">
                <div className="headerContainer">
                <img className="logoMain" src={logoMain} alt="logoMain" />
              <div
                onClick={() => {
                  let nav = document.querySelector("nav");
                  nav.style.bottom = "0";
                }}
                className="openMenu"
              >
                <i className="fa-solid fa-bars"></i>
              </div>
                </div>
            
                <div className="intro">
                  <h1 style={{ color: "white" }}>
                    Hello! <span>{context.userData.name}</span>
                  </h1>
                  <h3>
                    Thank you for registration, You can save your note now
                  </h3>
                </div>
                <div className="overview">
                  <h5>Overview</h5>
                  <div className="grid-overview-section">
                    <div className="totalnotes">
                      <div className="totalNotes">
                        <h4>Total Notes</h4>
                        <p>
                          <i className="fa-solid fa-book"></i>{" "}
                          {context.noteData.length} Notes
                        </p>
                      </div>
                      <div className="addMore">
                        <button
                          onClick={() => {
                            nevigate("notes");
                          }}
                        >
                          <i className="fa-solid fa-circle-plus"></i>
                        </button>
                      </div>
                    </div>
                    <div className="totalPhotos">
                      <div className="totalphoto">
                        <h4>Total Photo</h4>
                        <p>
                          <i className="fa-regular fa-image"></i>{" "}
                          {context.profile.length} Photo
                        </p>
                      </div>
                      <div className="addMore">
                        <button
                          onClick={() => {
                            const fileUploadData =
                              document.getElementsByClassName("fileUploadData");
                            for (let fileSec of fileUploadData) {
                              fileSec.style.display = "block";
                            }
                          }}
                        >
                          <i className="fa-solid fa-circle-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="recentActivities">
                  <h5>Recent Activities</h5>
                  <div className="activities">
                    {context.noteData.length > 0
                      ? context.noteData.map((elems) => {
                          return (
                            <p key={elems._id}>
                              <i className="fa-solid fa-book"></i> You Have
                              Added Notes <br></br>
                              <span>{elems.date.slice(0, 10)}</span>
                            </p>
                          );
                        })
                      : ""}
                    {context.noteData.length <= 0 &&
                    context.profile.length <= 0 ? (
                      <h5>
                        <i className="fa-solid fa-chart-line"></i>&nbsp; No
                        activity yet
                      </h5>
                    ) : (
                      ""
                    )}
                    {context.profile.length > 0
                      ? context.profile.map((elems) => {
                          return (
                            <p key={elems._id}>
                              <i className="fa-regular fa-image"></i> You Have
                              Added Profile Photo <br></br>
                              <span>{elems.date.slice(0, 10)}</span>
                            </p>
                          );
                        })
                      : ""}
                  </div>
                </div>
              </div>
            </header>
          )}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
}
