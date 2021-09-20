import React from 'react';
import PropTypes from 'prop-types';

class TodoItem extends React.Component {
  render() {
    const { todo: { title } } = this.props;
    return <li>{title}</li>;
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;
