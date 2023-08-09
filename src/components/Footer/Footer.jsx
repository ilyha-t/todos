import React from 'react';
import TasksFilter from "../TasksFilter/TasksFilter";

const Footer = ({todoCount, filter, changeFilterTodo, clearCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <TasksFilter filter={filter} changeFilterTodo={changeFilterTodo}/>
            <button className="clear-completed" onClick={() => clearCompleted()}>Clear completed</button>
        </footer>
    );
};

export default Footer;