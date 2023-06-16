import React, { useState } from "react";
import styled from "styled-components";

const ModalComponent = ({ closeModal }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [file, setFile] = useState(null);

  const isFormValid = () => {
    return (
      fullName.trim() !== "" &&
      email.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      file !== null
    );
  };

  const handleFormSubmit = () => {
    if (isFormValid()) {
      closeModal();
    }
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <InputWrapper>
          <Label>Full Name:</Label>
          <Input type="text" value={fullName} onChange={handleFullNameChange} />
        </InputWrapper>
        <InputWrapper>
          <Label>Email:</Label>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </InputWrapper>
        <InputWrapper>
          <Label>Phone Number:</Label>
          <Input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label> Upload CV:</Label>
          <Input type="file" onChange={handleFileChange} />
        </InputWrapper>
        <Button onClick={handleFormSubmit} disabled={!isFormValid()}>
          Send Application
        </Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default ModalComponent;
const Button = styled.button`
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
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  &:focus {
    outline: rgb(76, 53, 222);
  }
`;
