import React from "react";
import { useNavigate } from "react-router-dom";
import success from './image/success.png'
export default function Success() {
    let nevigate = useNavigate()
  return (  
      <div className="fo-pw">
        <div className="forget-pw-card success-card">
            <img className="success" src={success} alt="successLogo" />
            <h2>Success!</h2>
            <h6>Password has been changed successfully</h6>
            <button onClick={()=>{nevigate('/login')}} className="btnLogin">Login</button>
        </div>
      </div>
  );
}
