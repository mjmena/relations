import React from "react";
import SearchContainer from "./containers/SearchContainer";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  flex-direction: column;
`;

const SearchSection = styled.div`
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Navbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    background: ${props => props.theme.secondary};
  }

  border: 2px solid ${props => props.theme.secondary};
  background: ${props => props.theme.tertiary};
  color: ${props => props.theme.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
`;

export default () => {
  return (
    <Header>
      <SearchSection>
        <SearchContainer />
      </SearchSection>
      <Navbar>
        <StyledNavLink to="/">Dashboard</StyledNavLink>
        <StyledNavLink to="/thing">Create Thing</StyledNavLink>
      </Navbar>
    </Header>
  );
};
