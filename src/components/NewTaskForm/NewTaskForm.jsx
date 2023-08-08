import React from 'react';

const NewTaskForm = () => {
    return (
        <header className="header">
            <h1>Todos</h1>
            <input className="new-todo" placeholder="What needs to be done?" autoFocus />
        </header>
    );
};

export default NewTaskForm;