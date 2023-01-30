import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import ChangePassword from "./ChangePassword";
export default function VerificationCode(props) {
  let nevigate = useNavigate();
  const [tokenCode, setTokenCode] = useState("");
  const [data, setDate] = useState("");
  const[loading, setLoading] = useState(false)
  const getTokenOnChange = (e) => {
    setTokenCode(e.target.value);
    setDate("");
  };
  const validateCode = async () => {
    setLoading(true)
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: props.email,
      token: tokenCode,
    });

    let response = await fetch(`${process.env.REACT_APP_HOST}/auth/tokenValidation`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    setDate(data);
    if(data.success === true){
      setLoading(false)
     }else{
      setLoading(false)
     }
  };
  return (
    <>
      {data.success === true ? (
        <ChangePassword email={props.email} />
      ) : (
        <div className="fo-pw">
          <div className="forget-pw-card">
            <h1><i className="fa-solid fa-key"></i> Enter Verification Code</h1>
            <h5>{props.h5}</h5>
            <input
           style={
            data.success === false
              ? { border: ".2rem solid #ff0028", animation: "shake 0.2s ease-in-out 0s 2"}
              : { border: ".1rem solid #00cec9" }
          }
              onChange={getTokenOnChange}
              value={tokenCode}
              type="number"
              placeholder="Enter code here"
            />
            <p>{data.success === false ? data.msg : ""}</p>
            <div className="bt-fp">
              <Link to="/forgetPassword">
                <button
                  onClick={() => {
                    nevigate(-1);
                  }}
                >
                  Back
                </button>
              </Link>
              <button
                onClick={validateCode}
                style={{ backgroundColor: "#00cec9" }}
              >
                {(loading === true)?<Loader/>:"Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
