import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Success from "../components/Success";
import Loader from "../loader/Loader";
export default function ChangePassword(props) {
  const nevigate = useNavigate();
  const [newPassword, setNewpas] = useState("");
  const [changeData, setChangedata] = useState("");
  const[loading, setLoading] = useState(false)
  const changePasOnChange = (e) => {
    setNewpas(e.target.value);
    setChangedata("")
  };
  const ChangePassword = async () => {
    setLoading(true)
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: props.email,
      password: newPassword,
    });

    let response = await fetch(`${process.env.REACT_APP_HOST}/auth/changePassword`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    setChangedata(data);
    if(data.success === true){
        setLoading(false)
       }else{
        setLoading(false)
       }
  };
  return (
    <>
      {(changeData.success === true)?<Success/>:<div className="fo-pw">
        <div className="forget-pw-card">
          <h1><i className="fa-solid fa-lock"></i> Enter New Password</h1>
          <h5>
            Enter a new password to process, we suggest you to type strong
            password so that no one can stole it.
          </h5>
          <input
          style={
            changeData.success === false
              ? { border: ".2rem solid #ff0028", animation: "shake 0.2s ease-in-out 0s 2"}
              : { border: ".1rem solid #00cec9" }
          }
            onChange={changePasOnChange}
            value={newPassword}
            type="password"
            placeholder="Enter your new password"
          />
          <p>{(changeData.success === false)?changeData.msg:""}</p>
          <div className="bt-fp">
            <button
              onClick={() => {
                nevigate(-1);
              }}
            >
              Back
            </button>
            <button
              onClick={ChangePassword}
              style={{ backgroundColor: "#00cec9" }}
            >
             {(loading === true)?<Loader/>:"Reset"}
            </button>
          </div>
        </div>
      </div>}
    </>
  );
}
