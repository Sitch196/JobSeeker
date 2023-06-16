import React, { useState, useEffect } from "react";
import styled from "styled-components";
import shortLogo from "../../../../assets/short-logo.png";
import facebook from "../../../../assets/facebook.png";
import instagram from "../../../../assets/instagram.png";
import twitter from "../../../../assets/twitter.png";

const Footer = () => {
  const [news, setNews] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = () => {
    if (!news.match(emailRegex)) return;

    setShowSpinner(true);

    // Simulating an API call or delay
    setTimeout(() => {
      setShowSpinner(false);
      setShowMessage(true);
      setNews("");
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }, 2000);
  };

  return (
    <FooterContainer>
      <FooterContent>
        <Socials>
          <h1 style={{ color: "#4c35de" }}>WorkUp</h1>
          <Sub>The Most Reliable JobSeeking Platform</Sub>
          <LogoWrap>
            <a href="https://github.com/Sitch196" target="_blank">
              <Img src={facebook} alt="facebook" />
              <Img src={instagram} alt="instagram" />
              <Img src={twitter} alt="twitter" />
            </a>
          </LogoWrap>
          <h5>©2023 WorkUp, Inc.</h5>
        </Socials>
        <WordWrapper>
          <WordDiv>
            <h2>Product</h2>
            <P>Invoices</P>
            <P>Vacancies</P>
            <P>Reviews</P>
            <P>Pricing</P>
          </WordDiv>
          <WordDiv>
            <h2>Company</h2>
            <P>About</P>
            <P>Support</P>
            <P>Privacy Policy</P>
            <P>Terms of Service</P>
          </WordDiv>
        </WordWrapper>

        <NewsletterContainer>
          <label>Sign up for our Newsletter</label>
          <NewsletterInput
            type="email"
            onChange={(e) => setNews(e.target.value)}
            placeholder="Enter your email"
            pattern={emailRegex}
            value={news}
          />
          <NewsletterButton onClick={handleSignUp}>
            {showSpinner ? <Spinner /> : showMessage ? "Done ✅" : "Sign up"}
          </NewsletterButton>
        </NewsletterContainer>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const Socials = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 0;
  gap: 0.5rem;
`;

const LogoWrap = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Img = styled.img`
  width: 2rem;
  cursor: pointer;
`;

const P = styled.p`
  color: gray;
  font-size: 1.3rem;
  @media (max-width: 450px) {
    font-size: 1rem;
  }
`;

const WordWrapper = styled.div`
  display: flex;
  gap: 4rem;
`;

const WordDiv = styled.div``;

const Sub = styled.p`
  font-family: "Roboto";
  font-size: 1.1rem;
`;

const FooterContainer = styled.footer`
  background-color: whitesmoke;
  padding: 4rem;
`;

const FooterContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  height: 40px;
`;

const NewsletterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    padding: 1rem 0;
  }
`;

const NewsletterInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 8px;
  text-indent: 0.4rem;
  &:focus {
    outline: none;
  }

  &:invalid {
    border-color: red;
  }
`;

const NewsletterButton = styled.button`
  padding: 8px 16px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: whitesmoke;
  animation: spin 1s infinite linear;
  width: 16px;
  height: 16px;
  border-radius: 50%;

  @keyframes spin {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
