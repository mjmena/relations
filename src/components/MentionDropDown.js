import React from 'react';
import styled from 'styled-components';

const Option = styled.div `
  border: 1px solid ${props => props.theme.tertiary}
  color: ${props => props.selected ? props.theme.primary : props.theme.secondary}
  background-color: ${props => !props.selected ? props.theme.primary : props.theme.secondary}
  width: 100px
`

class MentionDropDown extends React.Component {
  state = {
    selectedSuggestionIndex: 0
  }

  static getDerivedStateFromProps(props, state) {
    if (props.search !== state.previousSearch) {
      return {
        previousSearch: props.search,
        suggestions: props.filter(props.search),
        selectedSuggestionIndex: 0
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = (event) => {
    if (this.props.isFocusingActiveMention(this.props.value)) {
      if (event.key === "ArrowUp") {
        event.preventDefault()
        this.setState(state => {
          return {
            selectedSuggestionIndex: state.selectedSuggestionIndex - 1
          }
        })
      }
      else if (event.key === "ArrowDown") {
        event.preventDefault()
        this.setState(state => {
          return {
            selectedSuggestionIndex: state.selectedSuggestionIndex + 1
          }
        })
      }
      else if (event.key === "Enter") {
        event.preventDefault();
        this.props.updateValue(this.props.value.change().call(this.props.submitMention, this.state.suggestions[this.state.selectedSuggestionIndex]).value)
        this.setState({
          selectedSuggestionIndex: 0
        })
      }
    }
  }

  render() {
    const { isFocusingActiveMention, value } = this.props;
    if (!isFocusingActiveMention(value)) return null;
    return <div>
      {this.state.suggestions.map((suggestion, index) => {
        let selected = index === this.state.selectedSuggestionIndex;
        return <Option key={suggestion._id} selected={selected} >{suggestion.name}</Option>
      })}
      </div>
  }
}

export default MentionDropDown;
