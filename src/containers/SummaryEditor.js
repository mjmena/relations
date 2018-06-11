import React, { Fragment } from 'react';
import { Value, Text } from 'slate';
import { Editor } from 'slate-react';
import StickyInlines from 'slate-sticky-inlines'
import { Link } from 'react-router-dom'

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

const initialValue = {
  document: {
    nodes: [{
      object: 'block',
      type: 'paragraph',
      nodes: [{
        object: 'text',
        leaves: [{
          text: '',
        }, ],
      }, ],
    }, ],
  },
}


const MentionNode = (props, node) => {
  return (
    <Link to={'/thing/'+props.node.data.get('_id')} {...props.attributes}>{props.node.data.get('name')}</Link>
  )
}

const ActiveMentionNode = (props) => {
  return (
    <span style={{backgroundColor:'#ddeeff'}} {...props.attributes}>{props.children}</span>
  )
}

export default class SummaryEditor extends React.Component {
  state = {
    suggestions: null,
    selectedSuggestion: 0,
  };

  static getDerivedStateFromProps(props) {
    return {
      value: props.summary ?
        Value.fromJSON(JSON.parse(props.summary)) : Value.fromJSON(initialValue)
    }
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

  handleSave = (event) => {
    this.props.updateThing({
      variables: {
        id: this.props.id,
        summary: JSON.stringify(this.state.value.toJSON())
      }
    })
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

  render() {
    return <Fragment>
      <Editor
        value={this.state.value}
        onBlur={this.handleSave}
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
            onClick={(event, change, editor)=>{
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
