import React from 'react'
import ReactDOM from 'react-dom';
import { findDOMNode } from 'slate-react'

class SlateNodePortal extends React.Component {
  static defaultProps = {
    menuAnchor: 'bottom middle',
    nodeAnchor: 'bottom middle',
  };

  updatePosition = () => {
    if (!this.props.node) return
    this.element.style.position = 'absolute'
    const box = findDOMNode(this.props.node).getBoundingClientRect()
    this.element.style.top = `${box.top + box.height}px`
    this.element.style.left = `${box.left}px`
  }

  constructor(props) {
    super(props)
    this.element = document.createElement('div');
    this.updatePosition()
  }

  componentDidUpdate() {
    this.updatePosition()
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
    return (
      ReactDOM.createPortal(this.props.children, this.element)
    )
  }

}

export default SlateNodePortal
