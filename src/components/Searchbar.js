import React, { Fragment } from 'react';
import ThingLinkList from './ThingLinkList';

class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return <Fragment>
      <input type="text" value={this.state.value} onChange={this.handleChange} />
      <ThingLinkList things={this.props.search(this.state.value)} />
    </Fragment>
  }
}

export default Searchbar;
