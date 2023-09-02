import React, { useEffect, useState } from "react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

function TodoItem({ props, config, doneTodo, deleteTodo, editTodo }) {
  const inputRef = React.createRef();

  const [todo, setTodo] = useState({
    edit: false,
    updatePeriod: '',
  });

  useEffect(() => {
    setTodo({...todo, updatePeriod: formatDistanceToNow(props.created)});
    const idUpdateF = updateInterval();
    return () => clearInterval(idUpdateF);
  }, [])



  function updateInterval() {
    const updateF = setInterval(() => {
      setTodo({...todo, updatePeriod: formatDistanceToNow(props.created)});
    }, config.updateIntervalCreated);
    return updateF;
  }

  function activateEditMode() {
      if (!props.done) {
        setTodo(() => {
          return { ...todo, edit: !todo.edit };
        });
        inputRef.current.focus();
      }
  };

  function cancelEdit(code)  {
    if (code === 27) {
      setTodo(() => {
        return { ...todo, edit: false };
      });
    }
  };

    return (
      <li className={(props.done ? 'completed' : undefined) || (todo.edit ? 'editing' : undefined)}>
        <div className="view">
          <form>
            <input
              className="toggle"
              type="checkbox"
              checked={props.done}
              onChange={() => doneTodo(props)}
            />
            <label onClick={() => doneTodo(props)}>
              <span className="description">{props.description}</span>
              <span className="created">{todo.updatePeriod}</span>
            </label>
          </form>
          <button className="icon icon-edit" onClick={activateEditMode}></button>
          <button className="icon icon-destroy" onClick={() => deleteTodo(props.id)}></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setTodo(() => {
              return { ...todo, edit: !todo.edit };
            });
          }}
        >
          <input
            className="edit"
            onChange={(e) => {
              editTodo(props, e.target.value);
            }}
            onKeyDown={(e) => cancelEdit(e.keyCode)}
            value={props.description}
            ref={inputRef}
          />
        </form>
      </li>
    );
}

export default TodoItem;