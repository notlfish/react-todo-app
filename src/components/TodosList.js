import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

// eslint-disable-next-line react/prefer-stateless-function
class TodosList extends React.Component {
  render() {
    const { todos, handleChangeProps } = this.props;
    return (
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo}
                    handleChangeProps={handleChangeProps}/>
        ))}
      </ul>
    );
  }
}

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

export default TodosList;
