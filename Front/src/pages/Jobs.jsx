import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faDollarSign,
  faMapMarkerAlt,
  faClock,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import JobDetails from "./JobDetails";
import Filter from "../components/Filter";

const Jobs = () => {
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null); // New state to store the selected job ID
  const { jobId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/v1/jobs");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        console.log("Data:", data);
        setJobs(data.data.jobs); // Store the jobs data in the state
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Function to handle the "Go To Job" button click
  const handleGoToJob = (jobId) => {
    setSelectedJobId(jobId);
  };

  return (
    <HugeWrapper>
      <Filter />
      <Wrapper>
        <JobListing>
          {jobs.map((job) => (
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
                  <FontAwesomeIcon icon={faBuilding} /> {job.company.name}
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
                {" "}
                Go To Job
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </GoToJobButton>
            </JobItem>
          ))}
        </JobListing>
        <SelectedJob>
          {selectedJobId ? ( // Render the JobDetails component if a job ID is selected
            <JobDetails jobId={selectedJobId} />
          ) : (
            <PlaceholderText>Select a job to view details</PlaceholderText>
          )}
        </SelectedJob>
      </Wrapper>
      {error && <Errormsg>{error}</Errormsg>}
    </HugeWrapper>
  );
};

export default Jobs;
const HugeWrapper = styled.div``;
const Wrapper = styled.div`
  display: flex;
  @media (width<800px) {
    display: flex;
    flex-direction: column;
  }
`;

const SelectedJob = styled.div`
  width: 60%;
  z-index: -1;
  /* height: 400px; */
  position: relative;
  /* overflow: hidden; */
  background-color: #4c35de;
`;
const PlaceholderText = styled.p``;
const CompanyTitle = styled.div``;
const JobListing = styled.div`
  width: 50%;
  height: 600px; /* Set the desired height */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #4c35de;
  background-color: #4c35de;
  @media (width<800px) {
    width: 100%;
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
