import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user && JSON.parse(user));
  }, []);

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        if (user) {
          const response = await fetch(
            `http://127.0.0.1:5000/api/v1/companies/me`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error fetching Profile details");
          }

          const data = await response.json();
          setProfile(data.data.company);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMyProfile();
  }, [user]);

  return (
    <ProfileContainer>
      {profile ? (
        <>
          <ProfileDetails>
            <h1>Profile Details</h1>
            <p>
              {" "}
              <b>Company Name:</b> 🏨 {profile.name}
            </p>
            <p>
              <b>Location:</b>🧣 {profile.location}
            </p>
            <p>
              <b>Number of Employees:</b>👷🏻‍♂️ {profile.size}
            </p>
            <p>
              <b>Email:</b> 📩{profile.email}
            </p>
            <p>
              <b>Description:</b> <br />
              {profile.description}
            </p>
          </ProfileDetails>
          <JobListings>
            <h1>Job Listings</h1>
            {profile.jobs && profile.jobs.length > 0 ? (
              <ul>
                {profile.jobs.map((job) => (
                  <li key={job.id}>{job.title}✅</li>
                ))}
              </ul>
            ) : (
              <p>No job listings available</p>
            )}
          </JobListings>
        </>
      ) : (
        <SpinWrap>
          <Spinner />
        </SpinWrap>
      )}
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  padding: 20px;
  background-color: #4c35de;
  color: white;
`;

const ProfileDetails = styled.div`
  margin-bottom: 20px;

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
  }
`;

const JobListings = styled.div`
  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  border: 1px solid lightgray;
  padding: 1rem;

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 5px;
      font-size: large;
    }
  }
`;

const SpinWrap = styled.div`
  width: 100%;
  height: 15rem;
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
