import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";
import Loader from "../loader/Loader";
export default function DeleteAccount(props) {
  let context = useContext(Context);
  const nevigate = useNavigate();
  const [deleteAcInput, setDeleteAcInp] = useState("");
  const [loader, setLoader] = useState(false);
  const inpChange = (e) => {
    setDeleteAcInp(e.target.value);
  };
  useEffect(() => {
    context.fetchUsers();
    // eslint-disable-next-line
  }, []);
  const deleteAcOnClick = () => {
    setLoader(true)
    context.deleteAccount(deleteAcInput);
  };
  return (
    <div className="DeleteAccount">
      <div className="deleteAccCard">
        <h3>Confirm</h3>
        <p>
          You're about to delete this account permanently, type{" "}
          <span style={{ color: "#ffc107" }}>{context.userData.email}</span> to
          delete your account
        </p>
        <input
          value={deleteAcInput}
          onChange={inpChange}
          type="email"
          placeholder="Enter email address"
        />
        {/* <h6>sdfsdfsdfsf</h6> */}
        <div className="btns-deletion">
          <button
            style={{
              backgroundColor: "rgb(77 215 77)",
              color: "#101010",
              fontWeight: "400",
            }}
            onClick={() => {
              nevigate("/dashboard");
            }}
          >
            Cancel
          </button>
          {(loader===true)?<button
            disabled={deleteAcInput !== context.userData.email}
            style={
              deleteAcInput === context.userData.email
                ? {
                    backgroundColor: "#E10600 ",
                    color: "#000",
                    fontWeight: "400",
                  }
                : {
                    backgroundColor: "rgb(195 79 76)",
                    color: "#000",
                    fontWeight: "400",
                  }
            }
            onClick={deleteAcOnClick}
          >
           <Loader/>
          </button>:<button
            disabled={deleteAcInput !== context.userData.email}
            style={
              deleteAcInput === context.userData.email
                ? {
                    backgroundColor: "#E10600 ",
                    color: "#000",
                    fontWeight: "400",
                  }
                : {
                    backgroundColor: "rgb(195 79 76)",
                    color: "#000",
                    fontWeight: "400",
                  }
            }
            onClick={deleteAcOnClick}
          >
           Delete
          </button>}
        </div>
      </div>
    </div>
  );
}
