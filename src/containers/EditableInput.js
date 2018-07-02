import React from "react";
import styled from "styled-components";

const Title = styled.span`
  font-size: 2em;
`;

const TitleEdit = styled.input`
  font-size: 2em;
  font-family: ${props => props.theme.font};
`;

class EditableInput extends React.Component {
  state = {
    value: this.props.initialValue,
    editable: false
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  enableEdit = event => {
    this.setState({ editable: true });
  };

  render() {
    if (this.state.editable) {
      return (
        <form
          onSubmit={e => {
            e.preventDefault();
            this.props.handleSubmit(this.state.value);
            this.setState({ editable: false });
          }}
        >
          <TitleEdit
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      );
    } else {
      return <Title onClick={this.enableEdit}>{this.props.initialValue}</Title>;
    }
  }
}

export default EditableInput;
