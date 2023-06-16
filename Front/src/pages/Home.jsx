import styled, { keyframes } from "styled-components";
import conference from "../../../assets/conference.png";
import Reviews from "../components/Reviews";
import pic1 from "../../../assets/reviewers/pic1.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const toJobs = function () {
    navigate("/jobs");
  };
  return (
    <BigWrapper>
      <HomeContainer>
        <TitleContainer>
          <h1>WorkUp: Your Gateway to Professional Success</h1>
          <h4>
            Discover Opportunities, Connect with Employers, and Build a
            Fulfilling Career Journey
          </h4>
          <TitleBtn onClick={toJobs}>Get Started</TitleBtn>
        </TitleContainer>
        <StockImage>
          <Img src={conference} alt="stock image of people in workplace" />
        </StockImage>
      </HomeContainer>
      <ReviewContainer>
        <MainTitle>
          <h2 style={{ color: "whitesmoke" }}>
            Look what people are saying about WorkUp ✨:
          </h2>
        </MainTitle>
        <Reviews
          name="Michael K Ambol"
          pic={pic1}
          score="10/10"
          review="The job alerts feature on this platform is a game-changer. I received customized notifications based on my preferences, which helped me stay ahead in my job search. It's a fantastic tool!"
        />
      </ReviewContainer>
    </BigWrapper>
  );
};

export default Home;
const BigWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const growShrinkAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;
const HomeContainer = styled.div`
  width: 100%;
  /* height: 35rem; */
  background-color: #4c35de;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (width<1100px) {
    display: flex;
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;
const ReviewContainer = styled.div`
  background-color: #4c35de;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  color: whitesmoke;
  font-size: 1.5rem;
  font-family: "Roboto";
  @media (width<900px) {
    font-size: 1.3rem;
    margin-top: 1rem;
  }
  @media (width<600px) {
    font-size: 1.1rem;
  }
  @media (width<400px) {
    font-size: 1rem;
  }
`;
const MainTitle = styled.div`
  font-family: "Roboto";
  margin: 1rem;
`;
const StockImage = styled.div`
  animation: ${growShrinkAnimation} 3s infinite;
`;
const Img = styled.img`
  width: 100%;
`;
const TitleBtn = styled.button`
  width: 13rem;
  height: 4rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  font-family: "Roboto";
  font-size: 1.1rem;
  font-weight: bold;
  color: black;
  background-color: whitesmoke;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    box-shadow: inset 0 0 4px black;
    border: none;
  }
  @media (width<500px) {
    width: 10rem;
    height: 3rem;
  }
`;
