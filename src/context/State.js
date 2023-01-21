import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./Context";
const ContextState = (props) => {
  const nevigate = useNavigate();
  //All use states

  const [userData, setUserdata] = useState("");
  const [avatar, setAvatar] = useState({ profile: "" });
  const [noteData, setNoteData] = useState("");
  const [profile, setProfile] = useState("");
  // fetch users
  const fetchUsers = async () => {
    let headersList = {
      Accept: "*/*",
      "auth-token": localStorage.getItem("token"),
    };

    let response = await fetch("/auth/fetchuser", {
      method: "POST",
      headers: headersList,
    });

    let data = await response.json();
    setUserdata(data);
  };

  //for fetching avatar and potsting it
  const uploadAvatar = async (valueAvatar) => {
    let headersList = {
      Accept: "*/*",
      "auth-token": localStorage.getItem("token"),
    };
    let bodyContent = new FormData();
    bodyContent.append("avatar", valueAvatar);

    let response = await fetch("/photo/avatar", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    let data = await response.json();
    if (data.success === true) {
      window.location.reload();
    }
  };

  //fetching avatar
  const fetchAvatar = async () => {
    let headersList = {
      Accept: "*/*",
      "auth-token": localStorage.getItem("token"),
    };

    let response = await fetch("/photo/fetchAvatar", {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    setProfile(data);
    Array.from(data).forEach((elems) => {
      setAvatar({
        profile: `/images/${elems.avatar}`,
      });
    });
  };

  //Delete Avatar
  const deleteAvatar = async (id) => {
    let header = {
      Accept: "*/*",
      "Content-type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };
    let response = await fetch(`/photo/deleteAvatar/${id}`, {
      method: "DELETE",
      headers: header,
    });
    let data = await response.json();
    if (data.success === true) {
      window.location.reload();
    }
  };

  //fetch notes
  const fetchNotes = async () => {
    const header = {
      Accept: "*/*",
      "auth-token": localStorage.getItem("token"),
    };
    const response = await fetch(`/notes/fetchnotes`, {
      method: "GET",
      headers: header,
    });
    const notesData = await response.json();
    setNoteData(notesData);
  };

  //add Note
  const addNote = async (title, discription) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };

    let bodyContent = JSON.stringify({
      title: title,
      discription: discription,
    });

    let response = await fetch(`/notes/addnote`, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });
    const data = await response.json();
    if (data.success === true) {
      window.location.reload();
      nevigate("dashboard/notes");
    }
  };

  //delete notes
  const deleteNote = async (id) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };

    let response = await fetch(`/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: headersList,
    });

    let data = await response.json();
    if (data.success === true) {
      window.location.reload();
    }
  };

  //edit notes
  const editNotes = async (title, discription, id) => {
    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    };

    let bodyContent = JSON.stringify({
      title: title,
      discription: discription,
    });

    let response = await fetch(`/notes/updatenote/${id}`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    if(data.success === true){
      window.location.reload();
    }
  };

  return (
    <Context.Provider
      value={{
        fetchUsers,
        userData,
        uploadAvatar,
        fetchAvatar,
        avatar,
        noteData,
        fetchNotes,
        addNote,
        deleteNote,
        profile,
        deleteAvatar,
        editNotes
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default ContextState;