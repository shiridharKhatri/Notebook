import React from "react";
import "./Theme.css";
export default function Theme(props) {
  if (localStorage.getItem("checked")) {
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }
  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          checked={localStorage.getItem("checked")}
          onChange={props.checkboxTheme}
        />
        <span className="slider"></span>
      </label>
    </>
  );
}
