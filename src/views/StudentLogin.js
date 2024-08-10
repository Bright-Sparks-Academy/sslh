import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/lightbulb.png';

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFD700;
`;

const Card = styled.div`
  background-color: #faf3e0;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #e6e6e6;
  text-align: center;
  max-width: 400px;
  margin-top: 75px;
  width: 100%;
`;

const Logo = styled.img`
  width: 75px;
  height: 75px;
`;

const Heading = styled.h1`
  font-size: 1.7rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  font-family: 'Quicksand', sans-serif;
  color: #333;
`;

const InputFieldDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  margin-top: 2rem;
`;

const InputField = styled.input`
  font-family: 'Quicksand', sans-serif;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
  padding: 12px 20px;
  width: 100%;
  max-width: 300px;
  transition: border-color 0.3s ease;
  background-color: #fff;

  &:hover, &:focus {
    border-color: #FFD700;
    outline: none;
  }
`;

const Button = styled.button`
  font-family: 'Quicksand', sans-serif;
  background-color: #ffcc00;
  color: #333;
  border: none;
  border-radius: 30px;
  padding: 12px 0;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 2rem;
  width: 100%;
  max-width: 200px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #e6b800;
    transform: translateY(-3px);
  }
`;

const SignUpLink = styled.p`
  cursor: pointer;
  font-size: 0.9rem;
  color: blue;
  font-weight: bold;
  margin-top: 1rem;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const StudentLogin = () => {
  const [error, setError] = useState(null);

  const handleLogin = () => {
    // Simulating login validation
    const isError = true; // Replace this with actual login validation logic

    if (isError) {
      setError('Invalid username or password.');
    } else {
      setError(null);
    }
  };

  const handleSignupRedirect = () => {
    window.location.href = 'https://tally.so/r/mO4r8A';
  };

  return (
    <PageContainer>
      <Card>
        <Logo src={logo} alt="Lightbulb Logo" />
        <Heading>Student Login</Heading>
        <InputFieldDiv>
          <InputField placeholder="Enter your username" />
          <InputField placeholder="Enter your password" type="password" />
        </InputFieldDiv>
        <Button onClick={handleLogin}>Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <SignUpLink onClick={handleSignupRedirect}>Sign up</SignUpLink>
      </Card>
    </PageContainer>
  );
};

export default StudentLogin;