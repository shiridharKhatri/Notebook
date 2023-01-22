import React from "react";
import Loader from "../loader/Loader";
export default function Editnote(props) {
  return (
    <div className="editNote">
      <div className="editNoteCard">
        <h1>
          Edit Note{" "}
          <span
            onClick={() => {
              let editNote = document.querySelector(".editNote");
              editNote.style.display = "none";
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
        </h1>
        <form >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Edit your title"
            value={props.title}
            onChange={props.editOnChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Edit your description"
            value={props.description}
            onChange={props.editOnChange}
          />
           {(props.loader === false)?<button>
            <i className="fa-solid fa-circle-plus"></i> Save changes
          </button>
          :<button><Loader/></button>}
        </form>
      </div>
    </div>
  );
}
