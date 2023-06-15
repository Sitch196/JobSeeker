import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import styled from "styled-components";

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const { jobs } = useContext(AuthContext);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <FilterContainer>
      <Select value={selectedCategory} onChange={handleCategoryChange}>
        <Option value="">All Categories</Option>
        {Array.from(new Set(jobs.map((job) => job.category))).map(
          (category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          )
        )}
      </Select>
    </FilterContainer>
  );
};

export default Filter;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  padding: 16px;
  background-color: #4c35de;
`;

const Select = styled.select`
  text-transform: uppercase;
  width: 100%;
  max-width: 400px;
  padding: 8px;
  margin-bottom: 16px;
  height: 3rem;
  border: none;
  border-radius: 4px;
  background-color: #fff;
`;

const Option = styled.option``;
