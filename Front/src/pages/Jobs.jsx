import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jobGif from "../../../assets/jobGif.gif";
import {
  faBuilding,
  faDollarSign,
  faMapMarkerAlt,
  faClock,
  faExternalLinkAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import JobDetails from "./JobDetails";
import Filter from "../components/Filter";
import { AuthContext } from "../../Context/authContext";

const Jobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const { jobs: allJobs, setJobs } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://workup-job-seeking-app.onrender.com/api/v1/jobs`
        );
        if (!response.ok) {
          setError(data.message);
          setIsLoading(false);
        }
        const data = await response.json();
        setJobs(data.data.jobs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredJobs(allJobs);
    } else {
      const filtered = allJobs.filter(
        (job) => job.category === selectedCategory
      );
      setFilteredJobs(filtered);
    }
  }, [selectedCategory, allJobs]);

  const handleGoToJob = (jobId) => {
    setSelectedJobId(jobId);
    setIsExpanded(true);
  };

  const handleCloseJob = () => {
    setSelectedJobId(null);
    setIsExpanded(false);
  };

  return (
    <HugeWrapper>
      <Filter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Wrapper>
        <JobListing>
          {isLoading ? (
            <div>
              <h3 style={{ color: "whitesmoke" }}>
                Loading Job Listings 🔃 You may have to wait a bit
              </h3>
              <Spinner />
            </div>
          ) : (
            filteredJobs.map((job) => (
              <JobItem key={job.id}>
                <JobHeader>
                  <ClockIcon>
                    <FontAwesomeIcon icon={faClock} />
                  </ClockIcon>
                  <FullTimeText>Full Time</FullTimeText>
                </JobHeader>
                <div>
                  <JobTitle>{job.title}</JobTitle>
                  <CompanyTitle>
                    <FontAwesomeIcon icon={faBuilding} />{" "}
                    {job.company ? job.company.name : "Unknown"}
                  </CompanyTitle>
                </div>
                <JobInfo>
                  <JobCategory>{job.category}</JobCategory>
                  <JobSalary>
                    <FontAwesomeIcon icon={faDollarSign} /> {job.salary}
                  </JobSalary>
                  <JobLocation>
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}
                  </JobLocation>
                </JobInfo>
                <GoToJobButton onClick={() => handleGoToJob(job.id)}>
                  Go To Job
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </GoToJobButton>
              </JobItem>
            ))
          )}
        </JobListing>
        <SelectedJob isExpanded={isExpanded}>
          {isExpanded ? (
            <>
              <CloseButton onClick={handleCloseJob}>
                <FontAwesomeIcon icon={faTimes} />
              </CloseButton>
              <JobDetails jobId={selectedJobId} />
            </>
          ) : (
            <PlaceholderText>
              <Img src={jobGif} alt="" />
            </PlaceholderText>
          )}
        </SelectedJob>
      </Wrapper>
      {error && <Errormsg>{error}</Errormsg>}
    </HugeWrapper>
  );
};

export default Jobs;
const Spinner = styled.div`
  border: 2px solid #fff;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  margin: 0 auto;
  width: 25px;
  height: 25px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const HugeWrapper = styled.div``;
const Img = styled.img`
  width: 90%;
  border-radius: 50%;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 40rem;
  background-color: #4c35de;

  display: flex;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
  }
`;

const SelectedJob = styled.div`
  width: 60%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;

  background-color: ${(props) =>
    props.isExpanded ? "#4c35de" : "transparent"};
  /* height: ${(props) => (props.isExpanded ? "100vh" : "40rem")}; */
  @media (max-width: 800px) {
    width: 100%;
    height: ${(props) => (props.isExpanded ? "100vh" : "auto")};
    position: absolute;
    /* height: 40rem; */
  }
`;
const PlaceholderText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4c35de;
  @media (max-width: 800px) {
    display: none;
  }
`;
const CompanyTitle = styled.div``;
const JobListing = styled.div`
  width: 50%;
  /* height: 40rem; */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #4c35de;
  background-color: #4c35de;
  @media (max-width: 800px) {
    width: 100%;
  }
  overflow-x: hidden;
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
`;
const JobHeader = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  color: #777;
  font-size: 14px;
`;
const ClockIcon = styled.div`
  margin-right: 5px;
`;
const FullTimeText = styled.div`
  color: black;
`;

const JobItem = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
  background-color: whitesmoke;
  position: relative;
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
`;

const GoToJobButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  padding: 0.7rem 1rem;
  background-color: rgba(76, 53, 222, 0.9);
  &:hover {
    background-color: rgba(76, 53, 222, 1);
  }
  color: whitesmoke;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;

  svg {
    margin-left: 0.5rem;
  }
`;

const JobCategory = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const JobSalary = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const JobLocation = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
`;

const JobDescription = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #555;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  z-index: 1;

  &:hover {
    color: #ccc;
  }
`;

const Errormsg = styled.p`
  width: 100%;
  text-align: center;
  color: red;
  margin: 0.2rem;
  border-radius: 5px;

  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;
