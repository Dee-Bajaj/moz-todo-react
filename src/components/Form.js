import React, { useState } from "react";

function Form(props) {
    function handleChange(e) {
        setName(e.target.value);
      }
      const [name, setName] = useState('');
      
      function handleSubmit(e) {
        e.preventDefault();
        if(name != '')
        props.addTask(name);
        setName("");
      }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
  type="text"
  id="new-todo-input"
  className="input input__lg"
  name="text"
  autoComplete="off"
  value={name}
  data-testid="Input-Text"
  onChange={handleChange}
/>
      <button type="submit" className="btn btn__primary btn__lg" data-testid="Submit-Button">
        Add
      </button>
    </form>
  );
}



export default Form;