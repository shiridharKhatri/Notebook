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
  const [loader, setLoader] = useState(true);
  const host = process.env.REACT_APP_HOST;
  // fetch users
  const fetchUsers = async () => {
    let headersList = {
      Accept: "*/*",
      "auth-token": localStorage.getItem("token"),
    };

    let response = await fetch(`${host}/auth/fetchuser`, {
      method: "POST",
      headers: headersList,
    });
    let data = await response.json();
    setUserdata(data.user);
    if(data.success === true){
      setLoader(false)
    }
  };

  //for fetching avatar and potsting it
  const uploadAvatar = async (valueAvatar) => {
    let headersList = {
      Accept: "*/*",
      "auth-token": localStorage.getItem("token"),
    };
    let bodyContent = new FormData();
    bodyContent.append("avatar", valueAvatar);

    let response = await fetch(`${host}/photo/avatar`, {
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

    let response = await fetch(`${host}/photo/fetchAvatar`, {
      method: "GET",
      headers: headersList,
    });
    let data = await response.json();
    setProfile(data);
    Array.from(data).forEach((elems) => {
      setAvatar({
        profile: `${host}/images/${elems.avatar}`,
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
    let response = await fetch(`${host}/photo/deleteAvatar/${id}`, {
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
    const response = await fetch(`${host}/notes/fetchnotes`, {
      method: "GET",
      headers: header,
    });
    const notesData = await response.json();
    setNoteData(notesData);
    if(notesData.success === true){
      setLoader(false)
    }
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

    let response = await fetch(`${host}/notes/addnote`, {
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

    let response = await fetch(`${host}/notes/deletenote/${id}`, {
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

    let response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: "PUT",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    if(data.success === true){
      window.location.reload();
    }
  };

  //delete user account
  const deleteAccount = async(email)=>{
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json",
      "auth-token":localStorage.getItem('token')
     }
     
     let bodyContent = JSON.stringify({
       "email":email
     });
     
     let response = await fetch(`${host}/auth/deleteAccount`, { 
       method: "DELETE",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.json();
     if(data.success === true){
      nevigate('/login');
      localStorage.removeItem('token')
     }
  }

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
        editNotes,
        deleteAccount,
        loader
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
export default ContextState;
