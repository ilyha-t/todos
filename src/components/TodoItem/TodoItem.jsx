import React from 'react';

const TodoItem = ({todo, doneTodo, deleteTodo}) => {
    return (
        <li className={todo.done && "editing"}>
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label onClick={() => doneTodo(todo)}>
                    <span className="description">{todo.description}</span>
                    <span className="created">{todo.created}</span>
                </label>
                <button className="icon icon-edit" ></button>
                <button className="icon icon-destroy" onClick={() => deleteTodo(todo.id)}></button>
            </div>
            <input type="text" className="edit" onChange={e => todo.description} value={todo.description} autoFocus/>
        </li>
    );
};

export default TodoItem;