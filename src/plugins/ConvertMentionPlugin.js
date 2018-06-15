import React from 'react';
import StickyInlines from 'slate-sticky-inlines'
import CreateStickyInlinePlugin from './CreateStickyInlinePlugin';
import ActiveMentionNode from './../components/slate/ActiveMentionNode';
import MentionNode from './../components/slate/MentionNode';

const StickyInlinePlugin = StickyInlines({
  allowedTypes: ['active_mention'],
  bannedTypes: ['mention'],
  canBeEmpty: false,
  hasStickyBoundaries: false,
  stickOnDelete: false,
})

const CreateMentionInlinePlugin = CreateStickyInlinePlugin({
  trigger: '@',
  type: 'active_mention',
  StickyInlineNode: ActiveMentionNode
})

const plugins = [StickyInlinePlugin, CreateMentionInlinePlugin]

const MentionPlugin = (options) => {
  const { filter } = options;
  let suggestions = [];
  let suggestionIndex = 0;

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

  const onChange = ({ value }) => {
    if (value.focusInline && value.focusInline.type === "active_mention") {
      suggestions = filter(value.focusText.text.slice(1));
      // suggestionIndex = 0;
    }
    else {
      suggestions = [];
      suggestionIndex = 0;
    }
  }

  const onKeyDown = (event, change) => {
    if (change.value.focusInline && change.value.focusInline.type === 'active_mention') {
      const key = event.key;
      if (key === 'ArrowDown') {
        event.preventDefault();
        suggestionIndex = (suggestionIndex + 1) % suggestions.length
      }
      else if (key === 'ArrowUp') {
        event.preventDefault();
        suggestionIndex = Math.abs(suggestionIndex - 1) % suggestions.length
      }
      else if (key === 'Enter') {
        event.preventDefault()
        change.call(submitMention, suggestions[suggestionIndex])
        return true;
      }
    }
  }

  const renderNode = props => {
    switch (props.node.type) {
      case 'mention':
        return <MentionNode {...props} />
      default:
        return
    }
  }

  return {
    plugins: plugins.concat([{
      onChange,
      onKeyDown,
      renderNode,
    }]),
    portal: (props) => {
      return props.children({ suggestions, suggestionIndex })
    }
  }
}

export default MentionPlugin;
