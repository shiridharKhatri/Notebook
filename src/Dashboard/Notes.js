import React, { useEffect, useContext, useState } from "react";
import darkmode from "./image/logo/darkmode.png";
import nonote from "./image/nonote.png";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import Context from "../context/Context";
import AddNote from "./Addnote";
import Editnote from "./Editnote";
export default function Notes(props) {
  let context = useContext(Context);
  const [text, setText] = useState({title:"", description:""})
  const [ids, setId] = useState("")
  const [loaderTwo, setLoaderTwo] = useState(false);
  useEffect(() => {
    context.fetchNotes();
    // eslint-disable-next-line
  }, []);
  const deleteNotes = (id) => {
    props.progress(25);
    context.deleteNote(id);
    props.progress(50);
    if(context.deleteNote()){
      props.progress(85);
    }
  };
  const editOnChange = (e)=>{
    setText({...text, [e.target.id]:e.target.value})
  }
  const downloadTextFile = (title, discription) => {
    const element = document.createElement("a");
    const file = new Blob([`${title}-`, discription], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "Notes.txt";
    document.body.appendChild(element);
    element.click();
  };

  const editNoteOnClick = (title, description, id) => {
    let editNote = document.querySelector(".editNote");
    editNote.style.display = "block";
    setId(id)
    setText({title:title, description:description})
  };
  const editOnClick =(e)=>{
    setLoaderTwo(true)
    e.preventDefault()
    context.editNotes(text.title, text.description, ids);
  }
  return (
    <>
      <Editnote
        title={text.title}
        description={text.description}
        editOnChange={editOnChange}
        ChangeOnClick={editOnClick}
        loader = {loaderTwo}
      />
      {localStorage.getItem("token") ? (
        context.noteData.length <= 0 ? (
          <div className="notes">
            <div className="header">
              <Link to="/dashboard">
                <img src={darkmode} height="50" alt="logo" />
              </Link>
              <h1>Please Add Some Notes</h1>
              <button
                onClick={() => {
                  const addnote =
                    document.getElementsByClassName("addnoteContainer");
                  Array.from(addnote).forEach((elems) => {
                    elems.style.display = "block";
                  });
                }}
                className="addmore"
                href=""
              >
                <i className="fa-solid fa-circle-plus"></i> Add Notes
              </button>
              <AddNote />
            </div>
            <img className="nonote" src={nonote} alt="nonote" />
            <p>No notes to show add some notes</p>
            <button
              onClick={() => {
                const addnote =
                  document.getElementsByClassName("addnoteContainer");
                Array.from(addnote).forEach((elems) => {
                  elems.style.display = "block";
                });
              }}
              className="icon-btn add-btn"
            >
              <div className="add-icon"></div>
              <div className="btn-txt">Add Note</div>
            </button>
          </div>
        ) : (
          <div className="notesTwo">
            <div className="header">
              <Link to="/dashboard">
                <img src={darkmode} height="50" alt="logo" />
              </Link>
              <h1>Your Notes</h1>
              <button
                onClick={() => {
                  const addnote =
                    document.getElementsByClassName("addnoteContainer");
                  Array.from(addnote).forEach((elems) => {
                    elems.style.display = "block";
                  });
                }}
                className="addmore"
              >
                <i className="fa-solid fa-circle-plus"></i> Add More
              </button>
              <AddNote />
            </div>
             <div className="grid-display-notes">
              {context.loader && Array.from(context.noteData).map((elems) => {
                return (
                  <div className="cards" key={elems._id}>
                    <div className="title">
                      <h1>{elems.title}</h1>
                    </div>
                    <p>{elems.discription}</p>
                    <div className="btns">
                      <button
                        onClick={() => {
                          deleteNotes(elems._id);
                        }}
                        className="delete"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <button
                        className="edit"
                        onClick={() => {
                          editNoteOnClick(
                            elems.title,
                            elems.discription,
                            elems._id
                          );
                        }}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </button>
                      <button
                        className="down"
                        onClick={() => {
                          downloadTextFile(elems.title, elems.discription);
                        }}
                      >
                        <i className="fa-solid fa-download"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <Login />
      )}
    </>
  );
}
