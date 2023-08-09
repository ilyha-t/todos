import React, { Component } from 'react';

export default class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
        };
    }

    render() {
        return (
            <li className={(this.props.todo.done && "completed") || (this.state.edit && "editing")} >
                <div className="view">
                    <form>
                        <input className="toggle" type="checkbox" checked={this.props.todo.done} onChange={() => this.props.doneTodo(this.props.todo)}/>
                        <label onClick={() => this.props.doneTodo(this.props.todo)}>
                            <span className="description">{this.props.todo.description}</span>
                            <span className="created">{this.props.todo.created}</span>
                        </label>
                    </form>
                    <button className="icon icon-edit" onClick={(e) => {
                        this.setState({edit: !this.state.edit})
                    }}></button>
                    <button className="icon icon-destroy" onClick={() => this.props.deleteTodo(this.props.todo.id)}></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.setState({edit: !this.state.edit});
                }}>
                    <input className="edit"
                           onChange={(e) => {
                               this.props.editTodo(this.props.todo, e.target.value);
                           }}
                           value={this.props.todo.description}
                           autoFocus
                    />
                </form>
            </li>
        );
    }
};