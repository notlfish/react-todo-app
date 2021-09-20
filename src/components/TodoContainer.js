import React from 'react';
import TodosList from './TodosList';
import Header from './Header';

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          id: 1,
          title: 'Setup development environment',
          completed: true,
        },
        {
          id: 2,
          title: 'Develop website and add content',
          completed: false,
        },
        {
          id: 3,
          title: 'Deploy to live server',
          completed: false,
        },
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.delTodo = this.delTodo.bind(this);
  }

  handleChange = (id) => {
    this.setState((state) => {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
      return { todos: newTodos };
    });
  };

  delTodo = (id) => {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <div>
        <Header />
        <TodosList
          todos={todos}
          handleChangeProps={this.handleChange}
          handleDelete={this.delTodo}
        />
      </div>
    );
  }
}
export default TodoContainer;
