import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class Dropdown extends React.Component {
  static propTypes = {
    relative: PropTypes.object
  };

  updatePosition = () => {
    if (!this.props.relative.current) return;
    const box = this.props.relative.current.getBoundingClientRect();
    this.element.style.position = "absolute";
    this.element.style.top = `${box.top + box.height}px`;
    this.element.style.left = `${box.left}px`;
  };

  constructor(props) {
    super(props);
    this.element = document.createElement("div");
    this.updatePosition();
  }

  componentDidUpdate() {
    this.updatePosition();
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    document.body.removeChild(this.element);
  }

  render = () => {
    return ReactDOM.createPortal(this.props.children, this.element);
  };
}

export default Dropdown;
