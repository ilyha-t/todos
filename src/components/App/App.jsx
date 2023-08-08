import React from 'react';
import TodoList from "../TodoList/TodoList";
import Footer from "../Footer/Footer";
import NewTaskForm from "../NewTaskForm/NewTaskForm";

const App = () => {
    return (
        <section className="todoapp">
            <NewTaskForm />
            <TodoList />
            <Footer />
        </section>
    );
};

export default App;