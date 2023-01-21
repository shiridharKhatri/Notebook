import React, { useState, useContext } from "react";
import Context from "../context/Context";
export default function AddNote() {
  const context = useContext(Context);
  const [add, setAdd] = useState({ title: "", discription: "" });
  const addNoteOnChange = (e) => {
    setAdd({ ...add, [e.target.name]: e.target.value });
  };
  const addNoteOnSubmitForm = (e) => {
    e.preventDefault();
    context.addNote(add.title, add.discription);
  };
  return (
    <div className="addnoteContainer">
      <div className="addnoteonclick">
        <h4>
          Add Notes{" "}
          <span
            onClick={() => {
              const addnote =
                document.getElementsByClassName("addnoteContainer");
              Array.from(addnote).forEach((elems) => {
                elems.style.display = "none";
              });
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </h4>
        <form onSubmit={addNoteOnSubmitForm}>
          <label htmlFor="title">Title</label>
          <input
            onChange={addNoteOnChange}
            value={add.title}
            placeholder="Type your title"
            type="text"
            name="title"
            id="title"
          />
          <label htmlFor="discription">Discription</label>
          <textarea
            onChange={addNoteOnChange}
            value={add.discription}
            placeholder="Type your description"
            type="text"
            name="discription"
            id="discription"
          />
          <button>
            <i className="fa-solid fa-circle-plus"></i> Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
