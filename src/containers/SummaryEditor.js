import React from "react";
import { Value } from "slate";
import { Editor } from "slate-react";
import MentionDropDown from "./MentionDropDownContainer";
import MentionPlugin from "./../plugins/MentionPlugin";
import styled from "styled-components";
import { debounce } from "lodash";

const StyledEditor = styled(Editor)`
  box-shadow: 10px 5px 5px ${props => props.theme.secondary}
  background: ${props => props.theme.primary}
  border: 1px solid ${props => props.theme.tertiary}
`;

class SummaryEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: Value.fromJSON(JSON.parse(props.summary))
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
    }, this.handleSave.cancel);
  }

  componentWillUnmount() {
    this.handleSave.flush();
  }

  handleSave = debounce(() => {
    const mentions = this.state.value.document.filterDescendants(
      node => node.type === "mention"
    );
    console.log(mentions);
    this.props.updateThing({
      variables: {
        id: this.props.id,
        name: this.props.name,
        summary: JSON.stringify(this.state.value.toJSON())
      }
    });
  }, 2000);

  handleChange = change => {
    this.updateValue(change.value);
  };

  updateValue = value => {
    this.setState({ value }, this.handleSave);
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
        <button onClick={this.handleSave}>Save Summary</button>
      </React.Fragment>
    );
  }
}

export default SummaryEditor;
