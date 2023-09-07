import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: {
        text: '',
        minutes: 0,
        seconds: 0,
      },
    };
  }

  static defaultProps = {
    config: {
      appName: 'Todo or not Todo?',
    },
  };

  static propTypes = {
    config: PropTypes.object,
  };

  onChangeLabel = (label) => {
    this.setState({ label: { ...this.state.label, text: label } });
  };

  onChangeTimerSec = (seconds) => {
    if (isNaN(Number(seconds))) {
      return;
    }

    console.log(Number(seconds))

    if (seconds >= 60) {
      const totalMin = Math.floor(seconds / 60);
      const totalSec = seconds % 60;
      this.setState({ label: { ...this.state.label, minutes: this.state.label.minutes + totalMin, seconds: totalSec } });
    } else if (seconds === '') {
        this.setState({ label: { ...this.state.label, seconds: 0 } });
    } else {
        this.setState({ label: { ...this.state.label, seconds } });
    }
  };

  onChangeTimerMin = (minutes) => {
    console.log(Number(minutes))
    this.setState({ label: { ...this.state.label, minutes: Number(minutes) } });
  };

  onSubmitForm = (e) => {
    const label = this.state.label;
    if (label.text.trim().length > 0) {
      this.props.addTodo({...label, timer: Number(label.minutes * 60) + Number(label.seconds)});
      this.setState({ label: {text: '', minutes: 0, seconds: 0} });
    }
  };

  render() {
    return (
      <header className="header">
        <h1>{this.props.config.appName}</h1>
        <form className="new-todo-form" onKeyDown={e => e.keyCode === 13 && this.onSubmitForm()}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={(e) => this.onChangeLabel(e.target.value)}
            value={this.state.label.text}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={(e) => this.onChangeTimerMin(e.target.value)}
            onKeyPress={(e) => {
              if (isNaN(Number(e.key))) {
                e.preventDefault();
              }
            }}
            value={this.state.label.minutes > 0 ? this.state.label.minutes : ''}
          />
          <input
            type="number"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={(e) => this.onChangeTimerSec(e.target.value)}
            onKeyPress={(e) => {
              if (isNaN(Number(e.key))) {
                e.preventDefault();
              }
            }}
            value={this.state.label.seconds > 0 ? this.state.label.seconds : ''}
          />
        </form>
      </header>
    );
  }
}
