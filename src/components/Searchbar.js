import React, { Fragment } from "react";
import DropdownComponent from "./Dropdown";
import styled from "styled-components";
import memoize from "memoize-one";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import CreateThingPortal from "./../containers/CreateThingPortal";
const Dropdown = styled(DropdownComponent)`
  background: white;
  border: 1px solid black;
`;

class Searchbar extends React.Component {
  state = {
    search: "",
    selected: 0,
    navigating: null,
    creating: false
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
        let index = state.selected - 1;
        if (index < 0) index = this.getOptions(state.search).length - 1;

        return {
          selected: index
        };
      });
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      this.setState(state => {
        let index = state.selected + 1;
        if (index === this.getOptions(state.search).length) index = 0;
        return {
          selected: index
        };
      });
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (
        this.state.selected + 1 ===
        this.getOptions(this.state.search).length
      ) {
        this.setState({ creating: true });
      } else {
        this.setState({
          navigating: this.getOptions(this.state.search)[this.state.selected]
            .name
        });
      }
    }
  };

  handleSelect = (event, index) => {
    this.setState({ selected: index });
  };

  getOptions = memoize(search =>
    this.props.search(search).concat([{ id: -1, name: "Create " + search }])
  );

  handleClose = (event, name) => {
    this.setState({ creating: false, search: "", selected: 0 });
  };

  handleCancel = event => {
    this.setState({ creating: false });
    this.relative.current.focus();
  };

  handleConfirm = name => {
    this.setState({ creating: false, navigating: name });
  };

  render() {
    if (this.state.navigating)
      return <Redirect to={"/thing/" + this.state.navigating} push={true} />;
    return (
      <Fragment>
        <input
          ref={this.relative}
          type="text"
          placeholder="Search or Create"
          value={this.state.search}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyboardNavigation}
        />
        {this.state.search && (
          <Dropdown relative={this.relative}>
            <SearchOptions
              options={this.getOptions(this.state.search)}
              selected={this.state.selected}
              handleSelect={this.handleSelect}
            />
          </Dropdown>
        )}
        <CreateThingPortal
          active={this.state.creating}
          thing={this.state.search}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
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
