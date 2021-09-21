import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Route, Switch } from 'react-router-dom';
import TodosList from './TodosList';
import Header from './Header';
import InputTodo from './InputTodo';
import About from '../pages/About';
import NotMatch from '../pages/NotMatch';
import Navbar from './Navbar';

const STORAGE_KEY = 'Angie';

class TodoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.delTodo = this.delTodo.bind(this);
    this.addTodoItem = this.addTodoItem.bind(this);
  }

  componentDidMount() {
    const localTodos = localStorage.getItem(STORAGE_KEY);
    if (localTodos) {
      this.setState({ todos: JSON.parse(localTodos) });
      return;
    }
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => response.json())
      .then((todos) => this.setState({
        todos: todos.map((todo) => ({ ...todo, id: uuidv4() })),
      }));
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
      <>
        <Navbar />
        <Switch>
          <Route exact path="/">
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
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </>
    );
  }
}
export default TodoContainer;
