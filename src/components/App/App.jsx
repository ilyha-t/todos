import React, { useState } from "react";

import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import config from '../../config/configUI';

function App() {
  const [data, setData] = useState({
    todos: [],
    filter: 'All',
    filterTodos: [],
  });

  function addTodo(label) {
      setData(prevData => {
        return {
          ...prevData,
          todos: [
            ...prevData.todos,
            {
              id: Date.now(),
              description: label,
              done: false,
              important: false,
              created: new Date(),
            },
          ]
        }});
  };

  function doneTodo(todo) {
      const findIndex = data.todos.findIndex((f) => f.id === todo.id);
      setData(() => {
        return {
          ...data,
          todos: [
            ...data.todos.slice(0, findIndex),
            { ...todo, done: !todo.done },
            ...data.todos.slice(findIndex + 1),
          ],
        };
      });
  };

  function deleteTodo(id) {
      setData((prevData) => {
        return {
          ...prevData,
          todos: data.todos.filter((taskId) => taskId.id !== id),
        };
      });
  };

  function filterTodo(filterName) {
    switch (filterName) {
      case 'Active':
        return data.todos.filter((todo) => !todo.done);
      case 'Completed':
        return data.todos.filter((todo) => todo.done);
      default:
        return data.todos;
    }
  };

  function changeFilterTodo(element) {
      setData(prevData => {
        return {...prevData, filter: element.target.textContent };
      });
  };

  function clearCompleted() {
      setData(() => {
        return {
          ...data,
          todos: data.todos.filter((todo) => !todo.done),
        };
      });
  };

  function editTodo(todo, value) {
      const findIndex = data.todos.findIndex((f) => f.id === todo.id);
      setData(() => {
        return {
          ...data,
          todos: [
            ...data.todos.slice(0, findIndex),
            { ...todo, description: value },
            ...data.todos.slice(findIndex + 1),
          ],
        };
      });
  };

    return (
      <section className="todoapp">
        <NewTaskForm addTodo={addTodo} config={config} />
        <TodoList
          todos={filterTodo(data.filter)}
          doneTodo={doneTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
          config={config}
        />
        <Footer
          todoCount={data.todos.filter((todo) => !todo.done).length}
          filter={data.filter}
          changeFilterTodo={changeFilterTodo}
          filters={config.filters}
          clearCompleted={clearCompleted}
        />
      </section>
    );
}

export default App;