import React from "react";
import { GET_RELATIONS_TO_BY_ID, GET_RELATIONS_FROM_BY_ID } from "./../queries";

import styled from "styled-components";

const Option = styled.div`
  border: 1px solid ${props => props.theme.tertiary}
  color: ${props =>
    props.selected ? props.theme.primary : props.theme.secondary}
  background-color: ${props =>
    !props.selected ? props.theme.primary : props.theme.secondary}
  width: 100px
`;

class MentionDropDown extends React.Component {
  state = {
    selectedSuggestionIndex: 0
  };

  static getDerivedStateFromProps(props, state) {
    if (props.search !== state.previousSearch) {
      return {
        previousSearch: props.search,
        suggestions: props.filter(props.search).concat({
          id: 0,
          name: "Add " + (props.search ? props.search : "a Thing")
        }),
        selectedSuggestionIndex: 0
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (this.props.isFocusingActiveMention(this.props.value)) {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        this.setState(state => {
          return {
            selectedSuggestionIndex: state.selectedSuggestionIndex - 1
          };
        });
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        this.setState(state => {
          return {
            selectedSuggestionIndex: state.selectedSuggestionIndex + 1
          };
        });
      } else if (event.key === "Enter") {
        event.preventDefault();
        this.handleSubmit(
          this.state.suggestions[this.state.selectedSuggestionIndex]
        );
      }
    }
  };

  handleClick = (event, suggestion) => {
    event.preventDefault();
    this.handleSubmit(suggestion);
  };

  handleSubmit = suggestion => {
    if (
      this.state.selectedSuggestionIndex ===
      this.state.suggestions.length - 1
    ) {
      this.props
        .addThing({
          variables: {
            name: suggestion.name.slice(4),
            summary: JSON.stringify({
              document: {
                nodes: [
                  {
                    object: "block",
                    type: "paragraph",
                    nodes: [{ object: "text", leaves: [{ text: "" }] }]
                  }
                ]
              }
            })
          }
        })
        .then(data => {
          this.props.updateValue(
            this.props.value
              .change()
              .call(this.props.submitMention, data.data.addThing).value
          );
          this.props.addRelation({
            variables: {
              from: this.props.id,
              to: data.data.addThing.id
            },
            refetchQueries: [
              {
                query: GET_RELATIONS_TO_BY_ID,
                variables: {
                  id: this.props.id
                }
              },
              {
                query: GET_RELATIONS_FROM_BY_ID,
                variables: {
                  id: data.data.addThing.id
                }
              }
            ]
          });
        });
    } else {
      if (
        !this.props.relationsTo.find(
          relation => relation.to.id === suggestion.id
        )
      ) {
        this.props.addRelation({
          variables: {
            from: this.props.id,
            to: suggestion.id
          },
          refetchQueries: [
            {
              query: GET_RELATIONS_FROM_BY_ID,
              variables: {
                id: suggestion.id
              }
            },
            {
              query: GET_RELATIONS_TO_BY_ID,
              variables: {
                id: this.props.id
              }
            }
          ]
        });
      }
      this.props.updateValue(
        this.props.value.change().call(this.props.submitMention, suggestion)
          .value
      );
    }
  };

  handleMouseOver = (event, index) => {
    this.setState({
      selectedSuggestionIndex: index
    });
  };

  render() {
    return this.state.suggestions.map((suggestion, index) => {
      let selected =
        index ===
        Math.abs(this.state.selectedSuggestionIndex) %
          this.state.suggestions.length;
      return (
        <Option
          key={suggestion.id}
          selected={selected}
          onMouseOver={event => this.handleMouseOver(event, index)}
          onClick={event => this.handleClick(event, suggestion)}
        >
          {suggestion.name}
        </Option>
      );
    });
  }
}

export default MentionDropDown;
