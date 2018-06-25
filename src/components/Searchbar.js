import React, { Fragment } from "react";
import ThingLinkList from "./ThingLinkList";
import Dropdown from "./Dropdown";

class Searchbar extends React.Component {
  state = {
    value: ""
  };

  constructor(props) {
    super(props);
    this.relative = React.createRef();
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <Fragment>
        <input
          ref={this.relative}
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Dropdown relative={this.relative}>
          <ThingLinkList things={this.props.search(this.state.value)} />
        </Dropdown>
      </Fragment>
    );
  }
}

export default Searchbar;
