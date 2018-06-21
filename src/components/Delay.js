import React from "react";
import { Transition } from "react-transition-group";

class Delay extends React.Component {
  render() {
    return (
      <Transition timeout={{ enter: 300 }} in={this.props.start}>
        {state => this.props.children(state !== "entered")}
      </Transition>
    );
  }
}

export default Delay;
