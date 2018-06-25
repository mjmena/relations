import React, { Fragment } from "react";
import Dropdown from "./Dropdown";
import styled from "styled-components";
import memoize from "memoize-one";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";

const DropdownWell = styled.div`
  background: white;
  border: 1px solid black;
`;

class Searchbar extends React.Component {
  state = {
    search: "",
    selected: 0,
    navigating: null
  };

  constructor(props) {
    super(props);
    this.relative = React.createRef();
  }

  componentDidMount() {
    this.props.history.listen(() =>
      this.setState({ navigating: null, search: "", selected: true })
    );
  }

  handleChange = event => {
    this.setState({ search: event.target.value, selected: 0 });
  };

  handleKeyboardNavigation = event => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.setState(state => {
        return {
          selected: state.selected - 1
        };
      });
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this.setState(state => {
        return {
          selected: state.selected + 1
        };
      });
    } else if (event.key === "Enter") {
      event.preventDefault();
      this.setState(state => {
        return {
          navigating: this.getOptions(state.search)[state.selected].name
        };
      });
    }
  };

  handleSelect = (event, index) => {
    this.setState({ selected: index });
  };

  getOptions = memoize(search => this.props.search(search));

  render() {
    if (this.state.navigating)
      return <Redirect to={"/thing/" + this.state.navigating} push={true} />;
    return (
      <Fragment>
        <input
          ref={this.relative}
          type="text"
          value={this.state.search}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyboardNavigation}
          autoFocus
        />
        {this.state.search && (
          <Dropdown relative={this.relative}>
            <DropdownWell>
              <SearchOptions
                options={this.getOptions(this.state.search)}
                selected={Math.abs(
                  this.state.selected %
                    this.getOptions(this.state.search).length
                )}
                handleSelect={this.handleSelect}
              />
            </DropdownWell>
          </Dropdown>
        )}
      </Fragment>
    );
  }
}

export default withRouter(Searchbar);

const Option = styled.div`
  background: ${props =>
    props.selected ? props.theme.secondary : props.theme.tertiary};

  > a {
    color: ${props => props.theme.primary};
    &:focus,
    &:hover,
    &:visited,
    &:link,
    &:active {
      text-decoration: none;
    }
  }
`;

const SearchOptions = props =>
  props.options.map((option, index) => (
    <Option
      selected={index === props.selected}
      key={option.id}
      onMouseOver={event => props.handleSelect(event, index)}
    >
      <Link to={"/thing/" + option.name}>{option.name} </Link>
    </Option>
  ));
