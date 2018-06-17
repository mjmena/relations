import React from 'react';
import styled from 'styled-components'
import SlateNodePortal from './SlateNodePortal'
import ReadOnlyEditor from './ReadOnlyEditor'

const Tooltip = styled.div `
  color: ${props => props.theme.secondary}
  background-color: ${props => props.theme.primary}
  border: 2px dotted ${props => props.theme.tertiary}
`

export default (props) => {
  const { node, summary } = props;
  return <SlateNodePortal node={node}>
    <Tooltip>
      <ReadOnlyEditor value={summary} />
    </Tooltip>
  </SlateNodePortal>
}
