import React from 'react';
import StickyInlines from 'slate-sticky-inlines'
import CreateStickyInlinePlugin from './CreateStickyInlinePlugin';
import ActiveMentionNode from './../components/slate/ActiveMentionNode';
import MentionNode from './../components/slate/MentionNode';
import SlateNodePortal from './../components/slate/SlateNodePortal'

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

let plugins = [StickyInlinePlugin, CreateMentionInlinePlugin]

const MentionPlugin = (options) => {

  let search = '';

  const isFocusingActiveMention = (value) => value.focusInline && value.focusInline.type === "active_mention"

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
    if (isFocusingActiveMention(value)) {
      search = value.focusText.text.slice(1);
    }
    else {
      search = '';
    }
  }

  const onKeyDown = (event, change) => {
    if (isFocusingActiveMention(change.value) && event.key === "Enter") return false
  }

  const renderNode = props => {
    switch (props.node.type) {
      case 'mention':
        return <MentionNode {...props} />
      default:
        return
    }
  }

  plugins = [{
    onChange,
    onKeyDown,
    renderNode,
  }].concat(plugins)

  return {
    plugins,
    portal: (props) => {
      return <SlateNodePortal node={props.value.focusInline}>
        {props.children({value:props.value, search, isFocusingActiveMention, submitMention })}
      </SlateNodePortal>
    }
  }
}

export default MentionPlugin({ data: { name: "Martin" } });
