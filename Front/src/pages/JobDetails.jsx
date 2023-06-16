import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faDollarSign,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const JobDetails = ({ jobId }) => {
  // Receive jobId as a prop
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/v1/jobs/${jobId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching job details");
        }
        const data = await response.json();
        console.log("Job Details:", data);
        setJob(data.data.job);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  return (
    <JobWrapper>
      {job ? (
        <React.Fragment>
          <JobTitle>{job.title}</JobTitle>
          <CompanyTitle>
            <FontAwesomeIcon icon={faBuilding} /> {job.company.name}
          </CompanyTitle>
          <JobCategory>{job.category}</JobCategory>
          <JobSalary>
            <FontAwesomeIcon icon={faDollarSign} /> {job.salary}
          </JobSalary>
          <JobLocation>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}
          </JobLocation>
          <JobDescription>{job.description}</JobDescription>
        </React.Fragment>
      ) : (
        <LoadingText>
          <Spinner />
        </LoadingText>
      )}
    </JobWrapper>
  );
};

export default JobDetails;
const CompanyTitle = styled.div`
  color: white;
`;
const JobWrapper = styled.div`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: center;
  padding: 2rem;
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

const JobTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: whitesmoke;
`;

const JobCategory = styled.p`
  margin: 0;
  font-size: 14px;
  color: whitesmoke;
`;

const JobSalary = styled.p`
  margin: 0;
  font-size: 14px;
  color: whitesmoke;
`;

const JobLocation = styled.p`
  margin: 0;
  font-size: 14px;
  color: whitesmoke;
`;

const JobDescription = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: whitesmoke;
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: whitesmoke;
`;
