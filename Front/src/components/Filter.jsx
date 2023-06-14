import React from "react";
import styled from "styled-components";

const Filter = () => {
  return (
    <FilterContainer>
      <SearchInput type="text" placeholder="Search jobs..." />
      <Select>
        <Option value="">All Categories</Option>
        <Option value="category1">Category 1</Option>
        <Option value="category2">Category 2</Option>
        <Option value="category3">Category 3</Option>
      </Select>
      <Select>
        <Option value="">All Locations</Option>
        <Option value="location1">Location 1</Option>
        <Option value="location2">Location 2</Option>
        <Option value="location3">Location 3</Option>
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

const SearchInput = styled.input`
  width: 100%;
  max-width: 400px;
  height: 3rem;
  padding: 8px;
  margin-bottom: 16px;
  border: none;
  font-size: 1.1rem;
  border-radius: 4px;
  background-color: #fff;
  &:focus {
    border-color: rgba(76, 53, 222, 0.5);
    outline-color: rgba(76, 53, 222, 0.5);
  }
`;

const Select = styled.select`
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
