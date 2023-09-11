import React, { useEffect, useState } from "react";

import TodoList from '../TodoList/TodoList';
import Footer from '../Footer/Footer';
import NewTaskForm from '../NewTaskForm/NewTaskForm';
import config from '../../config/configUI';

function App() {
  const [data, setData] = useState({
    todos: [],
    filter: 'All',
  });

  useEffect(() => {
    for(let todo of data.todos) {
      if(todo.timer.timerId === null && todo.timer.isActive) {
        console.log('init timer');
        let todoOld = todo;
        const interval = setInterval(() => {
            console.log('interval')
            if (todoOld.timer.value !== 0) {
              todoOld = {...todoOld, timer: {...todoOld.timer, value: todoOld.timer.value - 1, isActive: true, timerId: interval}};
              changeTimer(todoOld);
            } else {
              console.log('delete timer');
              clearInterval(interval);
              todoOld = {...todoOld, timer: {...todoOld.timer, isActive: false, timerId: -1}};
              changeTimer(todoOld);
            }

        }, 1000);
      }
    }
  }, [data.todos, data.filter]);

  useEffect(() => {console.log(data)}, [data.todos])

  function addTodo(todo) {
      setData(prevData => {
        return {
          ...prevData,
          todos: [
            ...prevData.todos,
            {
              id: Date.now(),
              description: todo.text,
              done: false,
              important: false,
              created: new Date(),
              timer: { ...todo.timer, timerId: null }
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

  function changeTimer(todo) {
    const findIndex = data.todos.findIndex((f) => f.id === todo.id);
    setData((prevData) => {
      return {
        ...prevData,
        todos: [
          ...prevData.todos.slice(0, findIndex),
          { ...todo },
          ...prevData.todos.slice(findIndex + 1),
        ],
      };
    });
  };

  function pauseTimer(todo) {
    changeTimer({ ...todo, timer: {...todo.timer, isActive: false} });
  }

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
          pauseTimer={pauseTimer}
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