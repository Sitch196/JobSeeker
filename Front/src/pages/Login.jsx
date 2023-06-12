import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import interview from "../../../assets/interview-removebg-preview.png";
import shortLogo from "../../../assets/short-logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";

const Login = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Email or Password Fields Can not be empty");
      return;
    }
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/companies/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));

        setIsLoggedIn(true);
        navigate("/");
        console.log("logged in..✨");
      }
      if (!response.ok) {
        setError(data.message);
      }

      console.log(data);
    } catch (error) {
      console.error("login error", error);
    }

    setLoading(false);
  };

  return (
    <SignupContainer>
      <SignupLeft>
        <Logo src={shortLogo} alt="company logo" onClick={handleLogoClick} />
        <Container>
          <TitleContainer>
            <Title>Create an Account ✨</Title>
            <Title>Sign up to get started</Title>
          </TitleContainer>
          <Img src={interview} alt="job interview stock photo" />
        </Container>
      </SignupLeft>
      <SignupRight>
        <SignupForm onSubmit={handleSubmit}>
          <Containerwrapper>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />

            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Containerwrapper>
          <Errormsg>{error}</Errormsg>
          <SignupButton type="submit" disabled={isLoading}>
            {" "}
            {isLoading ? <Spinner /> : "Log in"}{" "}
          </SignupButton>
          <p>
            Don't have an account? Sign up <Link to="/signup">here</Link>.
          </p>
        </SignupForm>
      </SignupRight>
    </SignupContainer>
  );
};

export default Login;
const Errormsg = styled.p`
  /* border: 1px solid red; */
  width: 100%;
  text-align: center;
  color: red;

  margin: 0.2rem;
  border-radius: 5px;
  @media (width<500px) {
    font-size: 0.8rem;
  }
`;
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: whitesmoke;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const SignupContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  background-color: whitesmoke;
  /* border: 1px solid red; */

  @media (max-width: 1250px) {
    flex-direction: column;
    overflow-y: initial;
    height: auto;
  }
`;

const SignupLeft = styled.div`
  height: 100%;
  width: 50%;
  padding: 2rem;
  background-color: #4330c0;
  position: fixed;
  left: 0;

  @media (max-width: 1250px) {
    position: initial;
    width: 100%;
    height: auto;
    padding-bottom: 2rem;
  }
`;
const SignupRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  padding: 2rem;
  background-color: whitesmoke;
  margin-left: 50%;

  @media (max-width: 1250px) {
    margin-left: 0;
    width: 100%;
    margin-top: 2rem;
  }
`;
const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  font-family: "Roboto";
  border: 1px solid lightgray;
  padding: 3rem;
  box-shadow: 0 2px 3px 0 lightgray;
  width: 100%;
  height: 20rem;
  padding: 3.5rem;

  @media (width<500px) {
    padding: 2.5rem;
  }
  @media (width<400px) {
    padding: 2.8rem 1.2rem;
  }
`;
const Containerwrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Label = styled.label`
  margin-top: 20px;
  font-size: 1rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  height: 45px;
  text-indent: 0.2rem;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline-color: rgba(76, 53, 222, 0.5);
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 6rem;
  cursor: pointer;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Img = styled.img`
  width: 100%;
`;

const TitleContainer = styled.div``;

const Title = styled.h2`
  font-family: "Roboto", sans-serif;
  color: whitesmoke;
  @media (width<500px) {
    font-size: 1rem;
    margin-left: 4rem;
  }
`;

const SignupButton = styled.button`
  background-color: rgba(76, 53, 222, 0.9);
  color: white;
  border: none;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 1rem;
  padding: 0.8rem 0;
  border-radius: 5px;
  width: 100%;
  @media (width<500px) {
    width: 90%;
  }
  @media (width<440px) {
    width: 70%;
  }

  &:hover {
    background-color: rgba(76, 53, 222, 1);
  }
`;
