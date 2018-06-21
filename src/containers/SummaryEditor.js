import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import MentionDropDown from "./MentionDropDownContainer";
import MentionPlugin from "./../plugins/MentionPlugin";
import styled from "styled-components";

const StyledEditor = styled(Editor)`
  margin: auto
  min-height: 20%
  box-shadow: 10px 5px 5px #000
  background: ${props => props.theme.primary}
`;

class SummaryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(JSON.parse(props.summary), {
        plugins: [
          {
            data: {
              id: this.props.id
            }
          }
        ]
      })
    };
  }

  componentDidMount() {
    this.setState(state => {
      return {
        value: state.value
          .change()
          .focus()
          .collapseToEndOfBlock().value
      };
    });
  }

  componentWillUnmount() {
    this.props.updateThing({
      variables: {
        id: this.props.id,
        name: this.props.name,
        summary: JSON.stringify(this.state.value.toJSON())
      }
    });
  }

  handleChange = change => {
    this.updateValue(change.value);
  };

  updateValue = value => {
    this.setState({ value });
  };

  render() {
    return (
      <React.Fragment>
        <StyledEditor
          value={this.state.value}
          onChange={this.handleChange}
          plugins={MentionPlugin.plugins}
        />
        <MentionPlugin.portal value={this.state.value}>
          {props => (
            <MentionDropDown
              {...props}
              updateValue={this.updateValue}
              filter={this.props.filter}
              id={this.props.id}
            />
          )}
        </MentionPlugin.portal>
      </React.Fragment>
    );
  }
}

export default SummaryEditor;
