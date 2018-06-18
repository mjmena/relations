import React from 'react';

export default class Resize extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight,
      width: window.innerWidth
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize)
  }

  handleResize = (event) => {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    })
  }

  render() {
    return this.props.children({ height: this.state.height, width: this.state.width })
  }
}
