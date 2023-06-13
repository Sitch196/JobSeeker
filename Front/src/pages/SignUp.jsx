import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import interview from "../../../assets/interview-removebg-preview.png";
import shortLogo from "../../../assets/short-logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Context/authContext";

const Signup = () => {
  const { image, setImage } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [size, setSize] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "passwordConfirm") {
      setPasswordConfirm(value);
    } else if (name === "size") {
      setSize(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "description") {
      setDescription(value);
    } else if (name === "image") {
      const uploadedImage = files[0];
      setImage(uploadedImage);
      setImage(uploadedImage);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm ||
      !size ||
      !location ||
      !description
    ) {
      setError("Please fill in all the fields.");
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("passwordConfirm", passwordConfirm);
      formData.append("size", size);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("image", image);
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/companies/signup",
        {
          method: "POST",

          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/login");
      }
      if (!response.ok) {
        setError(data.message);
      }
    } catch (error) {
      console.error("signup error", error);
    }
    setIsLoading(false);
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
            <Label>Employer/Company</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />

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

            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handleChange}
            />

            <Label>Number of Empoyees</Label>
            <Input
              type="number"
              name="size"
              min="1"
              value={size}
              onChange={handleChange}
            />

            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              value={location}
              onChange={handleChange}
            />
            <Label>Image</Label>
            <Input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
            />

            <Label>Description</Label>
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Containerwrapper>
          <Errormsg>{error}</Errormsg>

          <SignupButton
            type="submit"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? <Spinner /> : "Sign up"}
          </SignupButton>
          <p>
            Already have an account? Login <Link to="/login">here</Link>.
          </p>
        </SignupForm>
      </SignupRight>
    </SignupContainer>
  );
};

export default Signup;
const Errormsg = styled.p`
  width: 100%;
  text-align: center;
  color: red;
  margin: 0.2rem;
  border-radius: 5px;
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
  /* height: 95vh; */
  padding: 3.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #4c35de;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(76, 53, 222, 0.3);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  @media (width<500px) {
    padding: 2.5rem;
  }
  @media (width<400px) {
    padding: 3.1rem 1.2rem;
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
    border-color: rgba(76, 53, 222, 0.5);
    outline-color: rgba(76, 53, 222, 0.5);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
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
  margin-top: 0.5rem;
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
