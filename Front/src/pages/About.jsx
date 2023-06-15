import React, { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { animated, useSpring } from "react-spring";

import Image1 from "../../../assets/about/image1.jpg";
import Image2 from "../../../assets/about/image2.jpg";
import Image3 from "../../../assets/about/image3.jpg";
import Image4 from "../../../assets/about/image4.jpg";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled(animated.section)`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(50px);
  animation: ${fadeIn} 0.5s ease forwards;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 50%;
  margin: 20px;
`;

const About = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const [props1, set1] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(-100px)",
  }));
  const [props2, set2] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(100px)",
  }));
  const [props3, set3] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(-100px)",
  }));
  const [props4, set4] = useSpring(() => ({
    opacity: 0,
    transform: "translateX(100px)",
  }));

  const onScroll = () => {
    const { top: top1 } = ref1.current.getBoundingClientRect();
    const { top: top2 } = ref2.current.getBoundingClientRect();
    const { top: top3 } = ref3.current.getBoundingClientRect();
    const { top: top4 } = ref4.current.getBoundingClientRect();

    const windowBottom = window.innerHeight;

    if (top1 < windowBottom) {
      set1({ opacity: 1, transform: "translateX(0)" });
    }

    if (top2 < windowBottom) {
      set2({ opacity: 1, transform: "translateX(0)" });
    }

    if (top3 < windowBottom) {
      set3({ opacity: 1, transform: "translateX(0)" });
    }

    if (top4 < windowBottom) {
      set4({ opacity: 1, transform: "translateX(0)" });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Container>
      <Section ref={ref1} style={props1}>
        <Image src={Image1} alt="Image 1" />
      </Section>
      <Section ref={ref2} style={props2}>
        <Image src={Image2} alt="Image 2" />
      </Section>
      <Section ref={ref3} style={props3}>
        <Image src={Image3} alt="Image 3" />
      </Section>
      <Section ref={ref4} style={props4}>
        <Image src={Image4} alt="Image 4" />
      </Section>
    </Container>
  );
};

export default About;
