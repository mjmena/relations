import React from 'react';
import styled from 'styled-components';

const ActiveMention = styled.span `
  background-color: #ddeeff
`

const ActiveMentionNode = (props) => <ActiveMention {...props.attributes}>{props.children}</ActiveMention>

export default ActiveMentionNode;