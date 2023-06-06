import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Login from "../../pages/Login";
const Header = () => {
  return (
    <HeaderWrapper>
      <Headercontainer>
        <div>
          <p>LOGO</p>
        </div>
        <Nav>
          <ul>
            <Link to="/">Home</Link>
            <li>about</li>
            <Link to="/login">Log In</Link>
          </ul>
        </Nav>
      </Headercontainer>
    </HeaderWrapper>
  );
};

export default Header;
const HeaderWrapper = styled.div`
  /* border: 2px solid red; */
  margin: 0 1rem;
`;
const Headercontainer = styled.header`
  display: flex;
  justify-content: space-between;
`;
const Nav = styled.nav`
  ul {
    display: flex;
    gap: 0.5rem;
  }
  ul li {
    list-style-type: none;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: larger;
  }
`;
