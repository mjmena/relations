import React from "react";
import { Inline, Text } from "slate";

const TriggeredInlinePlugin = options => {
  const { trigger, type, TriggeredInlineNode } = options;

  const onKeyDown = (event, change) => {
    if (!change.value.focusInline && event.key === trigger) {
      change
        .insertInline({
          type: type,
          isVoid: false,
          nodes: [Text.create(trigger)]
        })
        .collapseToStartOfNextText()
        .insertText(" ")
        .extendToEndOfPreviousText();
      event.preventDefault();
      return true;
    }
  };

  const onChange = change => {
    //Not in a inline but at the start of some node
    if (!change.value.focusInline && change.value.selection.focusOffset === 0) {
      //Find the index of the node
      const textNodeIndex = change.value.focusBlock.nodes.findIndex(
        node => node.key === change.value.focusText.key
      );
      //check the node before it to see if its an inline
      const upcomingNode = change.value.focusBlock.nodes.get(textNodeIndex - 1);
      if (Inline.isInline(upcomingNode)) {
        //put me at the end of the inline
        return change.extendToEndOf(upcomingNode);
      }
    }
  };

  const renderNode = props => {
    switch (props.node.type) {
      case type:
        return <TriggeredInlineNode {...props.attributes} {...props} />;
      default:
        return;
    }
  };

  return {
    onChange,
    onKeyDown,
    renderNode
  };
};

export default TriggeredInlinePlugin;
