import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: "",
    };
  }

  static defaultProps = {
    config: {
      appName: "Todo or not Todo?",
    },
  };

  static propTypes = {
    config: PropTypes.object,
  };

  onChangeLabel = (label) => {
    this.setState({ label });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    const label = this.state.label;
    if (label.trim().length > 0) {
      this.props.addTodo(label);
    }
    this.setState({ label: "" });
  };

  render() {
    return (
      <header className="header">
        <h1>{this.props.config.appName}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={(e) => this.onChangeLabel(e.target.value)}
            value={this.state.label}
          />
        </form>
      </header>
    );
  }
}
