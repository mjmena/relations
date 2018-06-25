import React from "react";
import styled from "styled-components";
import Dropdown from "./../Dropdown";
import ReadOnlyEditor from "./ReadOnlyEditor";

const Tooltip = styled.div`
  color: ${props => props.theme.secondary}
  background-color: ${props => props.theme.primary}
  border: 2px dotted ${props => props.theme.tertiary}
`;

export default props => {
  const { relative, summary } = props;
  return (
    <Dropdown relative={relative}>
      <Tooltip>
        <ReadOnlyEditor value={summary} />
      </Tooltip>
    </Dropdown>
  );
};
