import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Context from "../context/Context";
import logo from "./image/logo/darkmode.png";
import avatar from "./image/avatar.png";
export default function Profile() {
  const context = useContext(Context);
  useEffect(() => {
    context.fetchAvatar();
    context.fetchUsers();
    // eslint-disable-next-line
  }, []);
  const deleteOnClick = (id)=>{
   context.deleteAvatar(id)
  }
  return (
    <>
      <div className="profileContainer">
        <Link to="/dashboard">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <div className="profileDesc">
          <img
            src={!context.avatar.profile ? avatar : context.avatar.profile}
            alt="profile"
          />
          <h1>{context.userData.name}</h1>
          <p>{context.userData.profession}</p>
          <p>{context.userData.email}</p>
        </div>
        <h3>Recent Profile Pictures</h3>
        {context.profile.length <= 0 ? (
          <div
            className="profilePicGrid"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "20rem",
            }}
          >
            <h4 style={{ color: "white", fontSize: "2rem", fontWeight: "400" }}>
              <i className="fa-regular fa-image"></i> No image added
            </h4>
          </div>
        ) : (
          <div className="profilePicGrid">
            {Array.from(context.profile).map((elems) => {
              return (
                <div className="recentImage" key={elems._id}>
                  <p>Uploaded on {elems.date.slice(0, 10)}</p>
                  <button onClick={()=>{
                    deleteOnClick(elems._id)
                  }}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <img
                    src={`/images/${elems.avatar}`}
                    alt="avatar"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
