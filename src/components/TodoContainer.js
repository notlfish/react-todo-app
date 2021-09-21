import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';

const STORAGE_KEY = 'CANCION_CON_TODOS';

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: JSON.parse(localStorage.getItem(STORAGE_KEY)) || [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.delTodo = this.delTodo.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
  }

  componentDidUpdate() {
    const { todos } = this.state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
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

  addTodoItem = (title) => {
    this.setState((state) => {
      const { todos } = state;
      return {
        todos: [...todos, {
          id: uuidv4(),
          title,
          completed: false,
        }],
      };
    });
  };

  setUpdate = (updatedTitle, id) => {
    this.setState((state) => {
      const newTodos = {
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, title: updatedTitle };
          }
          return todo;
        }),
      };

      return newTodos;
    });
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="container">
        <div className="inner">
          <Header />
          <InputTodo addTodoProps={this.addTodoItem} />
          <TodosList
            todos={todos}
            handleChangeProps={this.handleChange}
            handleDelete={this.delTodo}
            setUpdate={this.setUpdate}
          />
        </div>
      </div>
    );
  }
}
export default TodoContainer;
