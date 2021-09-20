import React from 'react';
import PropTypes from 'prop-types';
import styles from './TodoItem.module.scss';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      bufferTitle: props.todo.title,
    };
  }

  handleEditing = () => {
    this.setState({
      editing: true,
    });
  }

  changeUpdate = (e) => {
    this.setState({
      bufferTitle: e.target.value,
    });
  }

  render() {
    const completedStyle = {
      fontStyle: 'italic',
      color: '#595959',
      opacity: 0.4,
      textDecoration: 'line-through',
    };

    const {
      todo: { id, title, completed }, handleChangeProps,
      handleDelete, setUpdate,
    } = this.props;
    const { editing, bufferTitle } = this.state;

    const viewMode = {};
    const editMode = {};

    if (editing) {
      viewMode.display = 'none';
    } else {
      editMode.display = 'none';
    }

    return (
      <li className={styles.item}>
        <div onDoubleClick={this.handleEditing} style={viewMode}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={completed}
            onChange={() => { handleChangeProps(id); }}
          />
          <button type="button" onClick={() => handleDelete(id)}>Delete</button>
          <span style={completed ? completedStyle : null}>
            {title}
          </span>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          setUpdate(bufferTitle, id);
          this.setState({
            editing: false,
          });
        }}
        >
          <input
            type="text"
            className={styles.textInput}
            style={editMode}
            value={bufferTitle}
            onChange={this.changeUpdate}
          />
        </form>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleChangeProps: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  setUpdate: PropTypes.func.isRequired,
};

export default TodoItem;
