import React from "react";
import styled from "styled-components";
import ReviewDetails from "./ReviewDetails";
import pic1 from "../../../assets/reviewers/pic1.jpg";
import pic2 from "../../../assets/reviewers/pic2.jpg";
import pic3 from "../../../assets/reviewers/pic3.jpg";
import pic4 from "../../../assets/reviewers/pic4.jpg";
import pic5 from "../../../assets/reviewers/pic5.jpg";
import pic6 from "../../../assets/reviewers/pic6.jpg";

const Reviews = ({ name, pic, score, review }) => {
  return (
    <ReviewWrapper>
      <ReviewDetails name={name} pic={pic} score={score} review={review} />
      <ReviewDetails
        name="John C Riley"
        pic={pic2}
        score="9/10"
        review="I landed my dream job thanks to this platform! The job search process was streamlined and efficient, and I received excellent support from the team. Highly recommended!"
      />
      <ReviewDetails
        name="Sandra B Jordan"
        pic={pic3}
        score="9/10"
        review="Finding work has never been easier. This website has a wide range of job listings, and the application process is straightforward. I secured a great position within weeks of signing up"
      />
      <ReviewDetails
        name="Jane P Foster"
        pic={pic4}
        score="10/10"
        review="I appreciate how user-friendly this employment website is. The interface is clean and intuitive, making it simple to search for jobs and submit applications. It's definitely my go-to platform"
      />
      <ReviewDetails
        name="Cassandra M Codd"
        pic={pic5}
        score="10/10"
        review="I was impressed by the quality of the job postings on this site. The employers are reputable, and the descriptions are detailed and informative. I found my ideal job here and couldn't be happier."
      />
      <ReviewDetails
        name="Todd K Packer"
        pic={pic6}
        score="10/10"
        review="I appreciate the personalized support I received from the customer service team. They were quick to respond to my queries and provided valuable guidance throughout the application process. Exceptional service!."
      />
    </ReviewWrapper>
  );
};

export default Reviews;
const ReviewWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* border: 1px solid lightgray; */
  margin: 1rem 0;
  padding: 0.5rem;
  background-color: #4c35de;
`;
