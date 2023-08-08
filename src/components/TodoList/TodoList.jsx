import React from 'react';
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
    const todos = [{id: 1, description: 'Lean React', created: '1 seconds ago'}];

    return (
        <ul className="todo-list">
            {todos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
        </ul>
    );
};

export default TodoList;