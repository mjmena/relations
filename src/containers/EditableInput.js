import React from 'react';

class EditableInput extends React.Component {
  state = {
    value: this.props.initialValue,
    editable: false,
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  enableEdit = (event) => {
    this.setState({ editable: true })
  }

  render() {
    if (this.state.editable) {
      return <form onSubmit={e => {
        e.preventDefault();
        this.props.handleSubmit(this.state.value);
        this.setState({editable: false})
      }}>
        <input type="text" value={this.state.value} onChange={this.handleChange} />
      </form>
    }
    else {
      return <span onClick={this.enableEdit}>{this.props.initialValue}</span>
    }
  }
}

export default EditableInput;
