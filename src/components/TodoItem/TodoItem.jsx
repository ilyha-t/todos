import React from 'react';

const TodoItem = ({todo}) => {
    return (
        <li>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>
                    <span className="description">{todo.description}</span>
                    <span className="created">{todo.created}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button className="icon icon-destroy"></button>
            </div>
        </li>
    );
};

export default TodoItem;