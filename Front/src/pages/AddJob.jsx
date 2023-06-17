import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../Context/authContext";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "category") {
      setCategory(value);
    } else if (name === "salary") {
      setSalary(value);
    } else if (name === "location") {
      setLocation(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user && JSON.parse(user));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !category || !salary || !location || !description) {
      setError("Please fill in all the fields.");
      return;
    }
    setIsLoading(true);

    const jobs = { title, category, salary, location, description };

    try {
      const response = await fetch(
        `https://workup-job-seeking-app.onrender.com/api/v1/jobs`,
        {
          method: "POST",
          body: JSON.stringify(jobs),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
      }
      if (response.ok) {
        navigate("/jobs");
      }

      setTitle("");
      setCategory("");
      setSalary("");
      setLocation("");
      setDescription("");
      setError(null);
    } catch (error) {
      console.error("create job error", error);
      setError("An error occurred while creating the job. Please try again.");
    }
    setIsLoading(false);
  };

  const categoryOptions = [
    "Finance",
    "Software Engineering",
    "Banking",
    "HR",
    "Design",
    "Sales",
    "Administrative",
  ];

  return (
    <CreateJobContainer>
      <CreateJobForm onSubmit={handleSubmit}>
        <Title>Create a New Job ✨</Title>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange}
        />
        <Select name="category" value={category} onChange={handleChange}>
          <option value="">Select a category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Input
          type="number"
          name="salary"
          min="0"
          placeholder="Salary"
          value={salary}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="location"
          placeholder="Location"
          value={location}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={handleChange}
        />
        {error && <Errormsg>{error}</Errormsg>}
        <CreateJobButton type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Create Job"}
        </CreateJobButton>
      </CreateJobForm>
    </CreateJobContainer>
  );
};

export default CreateJob;

const CreateJobContainer = styled.div`
  display: flex;
  /* height: 100vh; */
  align-items: center;
  justify-content: center;
  background-color: #4c35de;
  padding-bottom: 4rem;
`;

const CreateJobForm = styled.form`
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  width: 45rem;
  align-items: center;
  color: #333;
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: "Roboto";
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: rgba(76, 53, 222, 0.5);
    outline-color: rgba(76, 53, 222, 0.5);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  &:focus {
    border-color: rgba(76, 53, 222, 0.5);
    outline-color: rgba(76, 53, 222, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: rgba(76, 53, 222, 0.5);
    outline-color: rgba(76, 53, 222, 0.5);
  }
`;

const Errormsg = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const CreateJobButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  background-color: #4c35de;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Spinner = styled.div`
  border: 2px solid #fff;
  border-top: 2px solid #007bff;
  border-radius: 50%;
  margin: 0 auto;
  width: 16px;
  height: 16px;
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
