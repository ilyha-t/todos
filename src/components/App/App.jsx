import React, { Component } from 'react';
import TodoList from "../TodoList/TodoList";
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            todos: [],
        };
    }

    addTodo = (label) =>  {
        this.setState(() => {
            return {
                todos: [...this.state.todos,
                    {id: Date.now(), description: label, done: false, important: false}]};
        });
    }

    doneTodo = (todo) => {
        const findIndex = this.state.todos.findIndex(f => f.id === todo.id);
        this.setState(() => {
            return {
                todos: [...this.state.todos.slice(0,findIndex),
                    {...todo, done: !todo.done},
                    ...this.state.todos.slice(findIndex+1)]
            }
        })
    }

    deleteTodo = (id) => {
        const findIndex = this.state.todos.findIndex(f => f.id === id);
        this.setState(() => {
            return {
                todos: [...this.state.todos.slice(0,findIndex),
                    ...this.state.todos.slice(findIndex+1)]
            }
        })
    }

    render() {
        return (
            <section className="todoapp">
                <NewTaskForm addTodo={this.addTodo} />
                <TodoList todos={this.state.todos} doneTodo={this.doneTodo} deleteTodo={this.deleteTodo} />
                <Footer />
            </section>
        );
    }
};
