import React, { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
      }
      function handleSubmit(e) {
        e.preventDefault();
        if(newName != '')
         props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
      }
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input
            id={props.id}
            className="todo-text"
            type="text"
            value={newName}
            data-testid = "Input-Edit"
            onChange={handleChange}
            ref={editFieldRef}
            />

          </div>
          <div className="btn-group">
              <span className="visually-hidden">new name for {props.name}</span>
            <button type="button" className="btn todo-cancel" data-testid = "Button-Cancel" onClick={() => setEditing(false)}>
             Cancel
             <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" data-testid= "Button-EditSave" className="btn btn__primary todo-edit">
              Save
            </button>
          </div>
        </form>
      );
      const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                data-testid = "CheckBox-Toggle"
                onChange={() => props.toggleTaskCompleted(props.id)}
              />
              <label className="todo-label" htmlFor={props.id} data-testid = "CheckBox-Label" >
                {props.name}
              </label>
            </div>
            <div className="btn-group">
              <button type="button" className="btn" data-testid="Button-Edit" onClick={() => setEditing(true)} ref={editButtonRef}>
               Edit <span className="visually-hidden">{props.name}</span>
              </button>
              <button
                type="button"
                className="btn btn__danger"
                data-testid="Button-Delete"
                onClick={() => props.deleteTask(props.id)}
              >
                Delete <span className="visually-hidden">{props.name}</span>
              </button>
            </div>
        </div>
      );

     useEffect(() => {
    if (!wasEditing && isEditing) {
    editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
    editButtonRef.current.focus();
    }
    }, [wasEditing, isEditing]);


      return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
  }