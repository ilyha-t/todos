import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      updatePeriod: '',
      timer: {value: 0, active: false},
      timerId: null
    };
    this.inputRef = React.createRef();
  }

  updateIntervalFunc;

  componentDidMount() {
    this.setState({
      updatePeriod: formatDistanceToNow(this.props.todo.created),
      timer: {value: this.props.todo.timer, active: false},
    });
    this.updateIntervalFunc = setInterval(() => {
      this.setState({
        updatePeriod: formatDistanceToNow(this.props.todo.created),
      });
    }, this.props.config.updateIntervalCreated);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.timer.active === false && this.state.timer.active) {
      const timerTodo = setInterval(() => {
        if(this.state.timer.value !== 0) {
          this.setState({
            timer: {...this.state.timer ,value: this.state.timer.value - 1},
          })
        } else {
          clearInterval(this.state.timerId);
        }
      }, 1000);
      this.setState({timerId: timerTodo})
    }

    if(this.props.todo.done && prevState.timer.active) {
      clearInterval(this.state.timerId);
      console.log(prevState);
      this.setState({timer: {...prevState.timer, value: 0, active: false}});
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateIntervalFunc);
    clearInterval(this.state.timerId);
  }

  activateEditMode = () => {
    new Promise((resolve) => {
      if (!this.props.todo.done) {
        this.setState(() => {
          return { edit: !this.state.edit };
        });
      }
      resolve();
    }).then(() => this.inputRef.current.focus());
  };

  cancelEdit = (code) => {
    if (code === 27) {
      this.setState(() => {
        return { edit: false };
      });
    }
  };

  calcTimer = (timer) => {
    const min = Math.floor(timer / 60);
    const sec = timer % 60;
    return `${min <= 9 ? '0': ''}${min}:${sec <= 9 ? '0': ''}${sec}`;
  };

  playTimer = (e) => {
    e.preventDefault();
    if(this.state.timer.active || this.props.todo.done) {
      return;
    } else {
      this.setState(() => {
        return { timer: {...this.state.timer, active: true} };
      });
    };
  }

  pauseTimer = (e) => {
    e.preventDefault();
    if(this.state.timer.active || this.props.todo.done) {
      this.setState(() => {
        clearInterval(this.state.timerId);
        return { timer: {...this.state.timer, active: false} };
      });
    }
  };

  render() {
    return (
      <li className={(this.props.todo.done ? 'completed' : undefined) || (this.state.edit ? 'editing' : undefined)}>
        <div className="view">
          <form>
            <input
              className="toggle"
              type="checkbox"
              checked={this.props.todo.done}
              onChange={() => this.props.doneTodo(this.props.todo)}
            />
            <label className="todo-item">
              <span className="title">{this.props.todo.description}</span>
              <span className="description">
                  <button className="icon icon-play" onClick={(e) => this.playTimer(e)}></button>
                  <button className="icon icon-pause" onClick={(e) => this.pauseTimer(e)}></button>
                {this.calcTimer(this.state.timer.value)}
              </span>
              <span className="created">{this.state.updatePeriod}</span>
            </label>
          </form>
          <button className="icon icon-edit" onClick={this.activateEditMode}></button>
          <button className="icon icon-destroy" onClick={() => this.props.deleteTodo(this.props.todo.id)}></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.setState(() => {
              return { edit: !this.state.edit };
            });
          }}
        >
          <input
            className="edit"
            onChange={(e) => {
              this.props.editTodo(this.props.todo, e.target.value);
            }}
            onKeyDown={(e) => this.cancelEdit(e.keyCode)}
            value={this.props.todo.description}
            ref={this.inputRef}
          />
          <button type="submit" style={{ display: 'none' }}></button>
        </form>
      </li>
    );
  }
}
