import React, { Fragment } from 'react';
import { Value, Text } from 'slate';
import { Editor } from 'slate-react';
import StickyInlines from 'slate-sticky-inlines'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { GET_THING_BY_ID } from '../queries';
import styled from 'styled-components';

const BrokenLink = styled.span `
  color:red;
  font-style:italic;
`

const plugins = [
  StickyInlines({
    allowedTypes: ['active_mention'],
    bannedTypes: ['mention'],
    canBeEmpty: false,
    hasStickyBoundaries: false,
    stickOnDelete: false,
  })
]

const submitMention = (change, mention) => {
  change.setNodeByKey(change.value.focusInline.key, {
      type: 'mention',
      isVoid: true,
      data: mention
    })
    .collapseToStartOfNextText()
    .focus()
    .insertText(' ')
  return true;
}

const MentionNode = (props) => {
  return (
    <Query query={GET_THING_BY_ID} variables={{id:props.node.data.get('_id')}}>
      {({loading, error, data})=>{
        if (loading) return <Link to={'/thing/'+props.node.data.get('_id')} {...props.attributes}>{props.node.data.get('name')}</Link>
        if (error) return <BrokenLink>{props.node.data.get('name')}</BrokenLink>;
        return <Link to={'/thing/'+data.thing._id} {...props.attributes}>{data.thing.name}</Link>
      }}
    </Query>
  )
}

const ActiveMentionNode = (props) => {
  return (
    <span style={{backgroundColor:'#ddeeff'}} {...props.attributes}>{props.children}</span>
  )
}

class SummaryEditor extends React.Component {
  state = {
    suggestions: null,
    selectedSuggestion: 0,
  };

  static getDerivedStateFromProps(props) {
    return {
      value: Value.fromJSON(JSON.parse(props.summary))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      console.log("ROUTE CHANGED");
      this.handleSave(prevProps, prevState);
    }
  }

  handleSave = (props, state) => {
    props.updateThing({
      variables: {
        id: props.id,
        summary: JSON.stringify(state.value.toJSON())
      }
    })
  }

  handleChange = ({ value }) => {
    this.setState({ value })
    if (value.focusInline && value.focusInline.type === "active_mention") {
      this.setState({
        suggestions: this.props.filterSuggestions(value.focusText.text.slice(1))
      })
    }
    else {
      this.setState({ suggestions: null, selectedSuggestion: 0 })
    }
  }

  handleKeyDown = (event, change) => {
    //We are focusing on a Mention
    if (change.value.focusInline && change.value.focusInline.type === "active_mention") {
      const key = event.key;
      if (key === 'Enter') {
        event.preventDefault()
        change.call(submitMention, this.state.suggestions[this.state.selectedSuggestion])
        return true;
      }
      else if (key === 'ArrowDown') {
        event.preventDefault();
        this.setState((state) => {
          return { selectedSuggestion: ++state.selectedSuggestion % state.suggestions.length }
        })
      }
      else if (key === 'ArrowUp') {
        event.preventDefault();
        this.setState((state) => {
          return { selectedSuggestion: Math.abs(--state.selectedSuggestion) % state.suggestions.length }
        })
      }
    }
    //We are not focusing on a Mention
    else {
      if (event.key === '@') {
        change
          .insertInline({
            type: 'active_mention',
            isVoid: false,
            nodes: [Text.create('@')]
          })
        event.preventDefault()
        return true;
      }
    }
  }

  renderNode = props => {
    switch (props.node.type) {
      case 'active_mention':
        return <ActiveMentionNode {...props} />
      case 'mention':
        return <MentionNode {...props} />
      default:
        return
    }
  }

  componentWillUnmount() {
    console.log('unmounting')
    this.handleSave(this.props, this.state);
  }

  render() {
    return <Fragment>
      <Editor
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        renderNode={this.renderNode}
        plugins={plugins}
        autoFocus={true}
      />
      {this.state.suggestions
        ? this.state.suggestions.map((suggestion, index) =>{
          return <div
            key={suggestion._id}
            style={{
              backgroundColor: index===this.state.selectedSuggestion ? 'red' : 'transparent'
            }}
            onMouseDown={(event, change, editor)=>{
              event.preventDefault()
              this.setState({
                value:this.state.value.change().call(submitMention, suggestion).value,
                suggestions: null,
                selectedSuggestion: 0
              })
            }}
          >{suggestion.name}</div>})
        : <Fragment />}
    </Fragment>
  }
}

export default withRouter(SummaryEditor)
