import React, { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            updatePeriod: ''
        };
        this.inputRef = React.createRef();
    }

    updateIntervalFunc;

    componentDidMount() {
        this.setState({updatePeriod: formatDistanceToNow(this.props.todo.created)})
        this.updateIntervalFunc = setInterval(() => {
            this.setState({updatePeriod: formatDistanceToNow(this.props.todo.created)})
        }, this.props.config.updateIntervalCreated);
    };

    componentWillUnmount() {
        clearInterval(this.updateIntervalFunc)
    }

    activateEditMode = () => {
        if (!this.props.todo.done) {
            this.setState(() => {
                return {edit: !this.state.edit};
            })
        }
        this.inputRef.current.focus();
    }

    render() {
        return (
            <li className={(this.props.todo.done && "completed") || (this.state.edit && "editing")} >
                <div className="view">
                    <form>
                        <input className="toggle"
                               type="checkbox"
                               checked={this.props.todo.done}
                               onChange={() => this.props.doneTodo(this.props.todo)}
                        />
                        <label onClick={() => this.props.doneTodo(this.props.todo)}>
                            <span className="description">{this.props.todo.description}</span>
                            <span className="created">{this.state.updatePeriod}</span>
                        </label>
                    </form>
                    <button className="icon icon-edit" onClick={this.activateEditMode}></button>
                    <button className="icon icon-destroy" onClick={() => this.props.deleteTodo(this.props.todo.id)}></button>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.setState(() => {
                        return {edit: !this.state.edit}}
                    );
                }}>
                    <input className="edit"
                           onChange={(e) => {
                               this.props.editTodo(this.props.todo, e.target.value);
                           }}
                           value={this.props.todo.description}
                           ref={this.inputRef}
                    />
                </form>
            </li>
        );
    }
};