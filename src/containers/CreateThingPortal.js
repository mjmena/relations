import React from "react";
import styled from "styled-components";
import CreateThing from "./CreateThing";

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
`;

class CreateThingOverlay extends React.Component {
  render() {
    if (!this.props.active) return null;
    return (
      <Background onClick={this.props.handleCancel}>
        <Modal onClick={event => event.stopPropagation()}>
          <CreateThing
            name={this.props.thing}
            onCancel={this.props.onCancel}
            onConfirm={this.props.onConfirm}
          />
        </Modal>
      </Background>
    );
  }
}

export default CreateThingOverlay;
