import React from 'react';
import styled from 'styled-components';

const Option = styled.div `
  border: 1px solid ${props => props.theme.tertiary}
  width: 100px
`

export default (props) => {
  if (!props.suggestions) return null;

  return props.suggestions.map((suggestion, index) => {
    return <Option key={suggestion._id}>{suggestion.name}</Option>
  })
}
