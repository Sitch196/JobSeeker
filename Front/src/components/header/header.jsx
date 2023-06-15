import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faQuestionCircle,
  faUsers,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import styled, { keyframes } from "styled-components";
import profile from "../../../../assets/profile.png";
import shortlogo from "../../../../assets/short-logo.png";
import { useContext } from "react";
import { AuthContext } from "../../../Context/authContext";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
    setUser(user && JSON.parse(user));

    setIsLoading(false);
  }, []);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user && user.id) {
          const response = await fetch(
            `http://127.0.0.1:5000/api/v1/companies/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          const data = await response.json();
          setCompany(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const closeMenu = () => {
    setShowMenu(false);
    setIsBurgerMenuOpen(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
  };

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
        {isLoading ? (
          ""
        ) : isLoggedIn ? (
          <CompanyName onClick={toggleDropdown}>
            {/* <h2>{user.name}</h2> */}
            <Img src={profile} alt="profile default picture" />
            {showDropdown && (
              <Dropdown>
                <LinkTo>
                  <FontAwesomeIcon icon={faUser} />
                  Profile
                </LinkTo>
                <LinkTo to="/addjob">
                  <FontAwesomeIcon icon={faBriefcase} />
                  Post a Job
                </LinkTo>
                <LinkTo>
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  Support
                </LinkTo>
                <LinkTo>
                  <FontAwesomeIcon icon={faUsers} />
                  Partners
                </LinkTo>
                <LinkTo onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  Log Out
                </LinkTo>
              </Dropdown>
            )}
          </CompanyName>
        ) : (
          <LoginBtn to="/login" onClick={closeMenu}>
            Log In
          </LoginBtn>
        )}
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
            {isLoggedIn ? (
              <>
                <Li to="/jobs" onClick={closeMenu}>
                  Profile
                </Li>
                <Li onClick={handleLogout}>Log Out</Li>
              </>
            ) : (
              <Li to="/login" onClick={closeMenu}>
                Log In
              </Li>
            )}
          </ul>
        </BurgerMenu>
      )}
    </HeaderWrapper>
  );
};

export default Header;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const Dropdown = styled.div`
  border: 1px solid lightgray;
  position: absolute;
  top: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  right: 0;
  width: 25rem;
  /* height: 40vh; */
  background-color: #4c35de;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  animation: ${fadeIn} 0.2s ease-in-out;
`;
const LinkTo = styled(Link)`
  padding: 5px 10px;
  /* border: 1px solid red; */
  color: whitesmoke;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  text-decoration: none;

  height: 3rem;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const Img = styled.img`
  width: 4rem;
  animation: ${fadeIn} 0.2s ease-in-out;
  &:hover {
    transform: translateY(-3px);
    transition: 0.4s;
  }
`;
const LoginBtn = styled(Link)`
  border: 2px solid lightgray;
  padding: 1rem 1.8rem;
  color: whitesmoke;
  text-decoration: none;
  font-family: "Roboto";
  border-radius: 5px;
  width: 10rem;
  font-size: 1.3rem;
  text-align: center;
  font-weight: bold;
  &:hover {
    font-weight: bold;
    background-color: rgba(245, 245, 245, 0.3);
  }
  @media (width<768px) {
    display: none;
  }
`;
const CompanyName = styled(Link)`
  /* background-color: whitesmoke; */
  text-decoration: none;
  font-family: "Roboto";
  border-radius: 10px;
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
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1.5rem;
  position: relative;
  z-index: 10000;
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
  font-size: 1.7rem;
  text-decoration: none;
  font-weight: bold;
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
