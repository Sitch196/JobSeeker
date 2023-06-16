import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faDollarSign,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "../components/Modal";

const JobDetails = ({ jobId }) => {
  const [job, setJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `https://workup-job-seeking-app.onrender.com/api/v1/jobs/${jobId}`
        );
        if (!response.ok) {
          throw new Error("Error fetching job details");
        }
        const data = await response.json();
        setJob(data.data.job);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <Button onClick={openModal}>Send Resume</Button>
          <JobDescription>{job.description}</JobDescription>
        </React.Fragment>
      ) : (
        <LoadingText>
          <Spinner />
        </LoadingText>
      )}

      {isModalOpen && (
        <Modal>
          <ModalComponent closeModal={closeModal} />
        </Modal>
      )}
    </JobWrapper>
  );
};

const JobWrapper = styled.div`
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: center;
  padding: 2rem;
`;

const JobTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: whitesmoke;
`;

const CompanyTitle = styled.div`
  color: white;
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

const Button = styled.button`
  width: 7rem;
  padding: 0.8rem;
  font-weight: bold;
  cursor: pointer;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  cursor: pointer;
`;

const ModalContent = styled.div`
  background-color: #4c35de;
  border-radius: 4px;
  padding: 1rem;
  width: 20rem;
  height: 30rem;
  box-shadow: 0 0 7px black;
  position: relative;
  margin-top: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: transparent;
  border: none;
  color: whitesmoke;
  font-size: 1.5rem;
  cursor: pointer;
`;

const ModalText = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
`;

export default JobDetails;
