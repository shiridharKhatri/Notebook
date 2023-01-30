import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import VerificationCode from "./VerificationCode";
export default function ForgetPas() {
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setData("");
  };
  const submitEmail = async () => {
    setLoading(true);

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      email: email,
    });

    let response = await fetch(`${process.env.REACT_APP_HOST}/auth/forgetPassword`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    setData(data);
    if (data.success === true) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  return (
    <>
      {data.success === true ? (
        <VerificationCode h5={data.msg} email={email} />
      ) : (
        <div className="fo-pw">
          <div className="forget-pw-card">
            <h1>
              <i className="fa-solid fa-envelope"></i> User verification
            </h1>
            <h5>
              Please enter your email address for verification code, Enter only
              valid email address.
            </h5>
            <input
              style={
                data.success === false
                  ? { border: ".2rem solid #ff0028", animation: "shake 0.2s ease-in-out 0s 2"}
                  : { border: ".1rem solid #00cec9" }
              }
              onChange={onChangeEmail}
              value={email}
              type="email"
              placeholder="Enter valid email"
            />
            <p>{data.success === false ? data.msg : ""}</p>
            <div className="bt-fp">
              <Link to="/login">
                <button>Cancel</button>
              </Link>
              <button
                onClick={submitEmail}
                style={{ backgroundColor: "#00cec9" }}
              >
                {loading === true ? <Loader /> : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
