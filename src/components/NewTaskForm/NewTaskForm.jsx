import React, { Component } from 'react';

export default class NewTaskForm extends Component {
    constructor() {
        super();
        this.state = {
            label: ''
        };
    }

    onChangeLabel = (label) => {
        this.setState({label});
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state.label);
        this.setState({label: ''});
    };

    render() {
        return (
            <header className="header">
                <h1>Todos</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input className="new-todo"
                           placeholder="What needs to be done?"
                           autoFocus
                           onChange={(e) => this.onChangeLabel(e.target.value)}
                           value={this.state.label}
                    />
                </form>
            </header>
        );
    }
};