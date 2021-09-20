import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      invalid: false,
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { addTodoProps } = this.props;
    const { title } = this.state;
    if (title.trim()) {
      addTodoProps(title);
      this.setState({ title: '', invalid: false });
    } else {
      this.setState({ invalid: true });
    }
  };

  render() {
    const { title, invalid } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form-container">
          <input
            type="text"
            className="input-text"
            placeholder="Add todo..."
            value={title}
            name="title"
            onChange={this.onChange}
          />
          <button type="submit" className="input-submit">Submit</button>
        </form>
        {invalid ? <p className="form-alert">Task description cannot be empty</p> : null}
      </div>
    );
  }
}

InputTodo.propTypes = {
  addTodoProps: PropTypes.func.isRequired,
};

export default InputTodo;
