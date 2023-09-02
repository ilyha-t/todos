import React from 'react';

import TodoItem from '../TodoItem/TodoItem';

const TodoList = ({ todos, doneTodo, deleteTodo, editTodo, config }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          props={todo}
          doneTodo={doneTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          config={config}
        />
      ))}
    </ul>
  );
};

export default TodoList;
