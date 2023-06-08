import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Login from "../../pages/Login";
import shortlogo from "../../../../assets/short-logo.png";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const closeMenu = () => {
    setShowMenu(false);
    setIsBurgerMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth > 600) {
      setShowMenu(false);
      setIsBurgerMenuOpen(false);
    }
  }, [windowWidth]);

  return (
    <HeaderWrapper>
      <Headercontainer>
        <LogoNav>
          <Img src={shortlogo} alt="company logo" width="100px" />
          <Nav>
            <ul>
              <Li to="/" onClick={closeMenu}>
                Home
              </Li>
              <Li to="/jobs" onClick={closeMenu}>
                Jobs
              </Li>
              <Li to="/about" onClick={closeMenu}>
                About
              </Li>
            </ul>
          </Nav>
        </LogoNav>
        <LoginBtn to="/login" onClick={closeMenu}>
          Sign In
        </LoginBtn>
        <BurgerMenuIcon onClick={toggleMenu}>
          {isBurgerMenuOpen ? "✕" : "☰"}
        </BurgerMenuIcon>
      </Headercontainer>
      {showMenu && (
        <BurgerMenu closeMenu={isBurgerMenuOpen}>
          <ul>
            <Li to="/" onClick={closeMenu}>
              Home
            </Li>
            <Li to="/jobs" onClick={closeMenu}>
              Jobs
            </Li>
            <Li to="/about" onClick={closeMenu}>
              About
            </Li>
            <Li to="/login" onClick={closeMenu}>
              Log In
            </Li>
          </ul>
        </BurgerMenu>
      )}
      {/* {showMenu && <Overlay onClick={closeMenu} />} */}
    </HeaderWrapper>
  );
};

export default Header;
const Img = styled.img`
  width: 4rem;
`;
const LoginBtn = styled(Link)`
  border: 2px solid lightgray;
  padding: 0.6rem 1.3rem;
  color: whitesmoke;
  background-color: rgba(245, 245, 245, 0.2);
  /* text-transform: uppercase; */
  text-decoration: none;
  font-family: "Roboto";
  border-radius: 10px;

  &:hover {
    font-weight: bold;
    background-color: rgba(245, 245, 245, 0.3);
  }
  @media (width<768px) {
    display: none;
  }
`;
const LogoNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;
const HeaderWrapper = styled.div`
  background: linear-gradient(to bottom, #4c35de, #4c35de);
  /* border-radius: 5px; */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(140, 141, 151, 0.28);
  padding: 1rem;
  position: relative;
  /* border: 1px solid red; */
`;

const Headercontainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Nav = styled.nav`
  ul {
    display: flex;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const Li = styled(Link)`
  color: whitesmoke;
  font-size: 1.5rem;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
`;
const Links = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  color: #7c7f7e;
`;

const BurgerMenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  color: whitesmoke;

  @media (min-width: 768px) {
    display: none;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
`;

const BurgerMenu = styled.div`
  background-color: #4c35de;
  color: whitesmoke;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.15);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${({ closeMenu }) => (closeMenu ? slideIn : slideOut)} 0.3s
    ease-in-out;

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin: 0;
    padding: 0;
    list-style: none;
    transition: 1s;
  }
`;
