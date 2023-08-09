import React from 'react';
import TodoItem from "../TodoItem/TodoItem";

const TodoList = ({todos, doneTodo, deleteTodo, editTodo}) => {

    return (
        <ul className="todo-list">
            {todos.map(todo => <TodoItem key={todo.id}
                                         todo={todo}
                                         doneTodo={doneTodo}
                                         deleteTodo={deleteTodo}
                                         editTodo={editTodo}
            />)}
        </ul>
    );
};

export default TodoList;