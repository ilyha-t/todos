import React, { useState } from "react";

function NewTaskForm({ config, addTodo }) {
    const [label, setLabel] = useState('');

    function onChangeLabel(label) {
      setLabel(label);
    };

    function onSubmitForm(e) {
      e.preventDefault();
      const newLabel = label;
      if (newLabel.trim().length > 0) {
        addTodo(newLabel);
      }
      setLabel('');
    };

    return (
      <header className="header">
        <h1>{config.appName}</h1>
        <form onSubmit={onSubmitForm}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={(e) => onChangeLabel(e.target.value)}
            value={label}
          />
        </form>
      </header>
    );
}

export default NewTaskForm;