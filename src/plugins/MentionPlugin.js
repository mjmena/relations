import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo'
import { Text } from 'slate';
import styled from 'styled-components';

import { GET_THING_BY_ID } from '../queries';

const BrokenLink = styled.span `
  color:red;
  font-style:italic;
`

const MentionPlugin = (options) => {
  let { filterSuggestions } = options;

  let state = {
    suggestions: null,
    selectedSuggestionIndex: 0
  };

  const ActiveMentionNode = (props) => {
    return (
      <span style={{backgroundColor:'#ddeeff'}} {...props.attributes}>{props.children}</span>
    )
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
  const submitMention = (change, mention) => {
    console.log(mention)
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
  const onChange = ({ value }) => {
    if (value.focusInline && value.focusInline.type === "active_mention") {
      state.suggestions = filterSuggestions(value.focusText.text.slice(1))
    }
    else {
      state.suggestions = null;
      state.selectedSuggestionIndex = 0;
    }
  }
  const onKeyDown = (event, change) => {
    //We are focusing on a Mention
    if (change.value.focusInline && change.value.focusInline.type === "active_mention") {
      const key = event.key;
      if (key === 'Enter') {
        event.preventDefault()
        change.call(submitMention, state.suggestions[state.selectedSuggestionIndex])
        return true;
      }
      else if (key === 'ArrowDown') {
        event.preventDefault();
        console.log(state)
        state.selectedSuggestionIndex = (state.selectedSuggestionIndex + 1) % state.suggestions.length
        console.log(state)
      }
      else if (key === 'ArrowUp') {
        event.preventDefault();
        state.selectedSuggestionIndex = Math.abs(state.selectedSuggestionIndex - 1) % state.suggestions.length
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
  const renderNode = props => {
    switch (props.node.type) {
      case 'active_mention':
        return <ActiveMentionNode {...props} />
      case 'mention':
        return <MentionNode {...props} />
      default:
        return
    }
  }

  return {
    plugin: {
      onChange,
      onKeyDown,
      renderNode,
    },
    changes: {
      submitMention
    },
    portal: (props) => {
      return props.children(state)
    }
  }
}

export default MentionPlugin;
