import React from "react";
import styled from "styled-components";

import Image1 from "../../../assets/about/image1.jpg";
import Image2 from "../../../assets/about/image2.jpg";
import Image3 from "../../../assets/about/image3.jpg";
import Image4 from "../../../assets/about/image4.jpg";

const About = () => {
  return (
    <>
      <h1
        style={{
          color: "#4c35de",
          margin: "2rem",
          textTransform: "uppercase",
        }}
      >
        What is the Story of WorkUp?
      </h1>
      <Container>
        <Image src={Image1} alt="Image 1" />
        <Image src={Image2} alt="Image 2" />
        <Image src={Image3} alt="Image 3" />
        <Image src={Image4} alt="Image 4" />
        <Text>
          In the bustling city of Freyton, WorkUp emerged as a beacon of hope
          for job seekers. Founded in 2012 by visionary entrepreneur Emily
          Parker, the company was built on the bedrock of integrity, empathy,
          and innovation. WorkUp's mission was simple yet powerful: to empower
          individuals by connecting them with meaningful employment
          opportunities. With unwavering dedication, Emily fostered a culture
          that valued transparency and fairness. <br />
          As WorkUp flourished, it never lost sight of its humble beginnings,
          continuously striving to uplift communities and bridge the gap between
          talent and opportunity. Today, WorkUp stands tall, epitomizing its
          values and transforming lives, one job at a time.
        </Text>
      </Container>
    </>
  );
};

export default About;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
  background-color: #4c35de;
`;

const Image = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin: 10px;
  border-radius: 10px;
`;

const Text = styled.p`
  margin: 20px;
  color: whitesmoke;
  font-size: 1.3rem;
`;
