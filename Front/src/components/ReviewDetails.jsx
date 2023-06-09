import React from "react";
import styled from "styled-components";

const ReviewDetails = ({ name, pic, score, review }) => {
  return (
    <Container>
      <Title>
        <Img src={pic} alt="profile picture" />
        <p>{name}</p>
      </Title>
      <div>
        <p>{review}</p>
        <p>{score} 👏</p>
      </div>
    </Container>
  );
};

export default ReviewDetails;
const Container = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  font-family: "Roboto";
  color: black;
  margin: 1rem;
  padding: 1rem;
  @media (width<1100px) {
    font-size: 0.9rem;
    width: 17rem;
  }
  @media (width<675px) {
    width: 100%;
  }
  gap: 0.5rem;
  box-shadow: 0 0 7px 3px lightgray;
  background-color: whitesmoke;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Img = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  @media (width<900px) {
    width: 4rem;
    height: 4rem;
  }
`;
