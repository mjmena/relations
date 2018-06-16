import React from 'react';
import { Text } from 'slate';

const CreateStickyInlinePlugin = (options) => {
  let { trigger, type, StickyInlineNode } = options;

  const onKeyDown = (event, change) => {
    if (!change.value.focusInline && event.key === trigger) {
      change
        .insertInline({
          type: type,
          isVoid: false,
          nodes: [Text.create(trigger)]
        })
      event.preventDefault()
      return true;
    }
  }

  const renderNode = props => {
    switch (props.node.type) {
      case type:
        return <StickyInlineNode {...props.attributes} {...props} />
      default:
        return
    }
  }

  return {
    onKeyDown,
    renderNode,
  }
}

export default CreateStickyInlinePlugin;
