import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
class TodoItem extends React.Component {
  render() {
    const {
      todo: { id, title, completed }, handleChangeProps,
      handleDelete,
    } = this.props;
    return (
      <li>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => { handleChangeProps(id); }}
        />
        {title}
        <button type="button" onClick={() => handleDelete(id)}>Delete</button>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TodoItem;
