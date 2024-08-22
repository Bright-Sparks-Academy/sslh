import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './../firebaseConfig.js'; // Adjust path as necessary
import logo from '../assets/lightbulb.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFD700;
`;

const Card = styled.div`
  background-color: #f5f5dc;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  font-family: 'Quicksand', sans-serif;
`;

const InputFieldDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  gap: 15px;
`;

const Input = styled.input`
  font-family: 'Quicksand', sans-serif;
  border-radius: 5px;
  border: none;
  font-size: 0.85rem;
  padding: 9px 16px;
  width: 80%;

  &:hover, &:focus {
    border: 2px solid black;
  }
`;

const Button = styled.button`
  font-family: 'Quicksand', sans-serif;
  background-color: #FFD700;
  color: #000000;
  border: none;
  border-radius: 30px;
  padding: 0.85rem 1.7rem;
  font-size: 0.85rem;
  font-weight: bold;
  margin-top: 2rem;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #FFCC00;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate from react-router-dom

  const handleLogin = async () => {
    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;
  
      // Fetch user role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
  
      if (!userDoc.exists()) {
        throw new Error('User document does not exist.');
      }
      
      const userData = userDoc.data();
      const userRole = userData.role;
  
      console.log(`User role: ${userRole}`); // Add this line for debugging
  
      // Redirect based on role
      if (userRole === 'Student') {
        navigate('/student/dashboard');
      } else if (userRole === 'Teacher') {
        navigate('/teacher/dashboard');
      } else if (userRole === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        throw new Error('No role assigned to this user.');
      }
    } catch (error) {
      setError(error.message || 'Invalid username or password.');
    }
  };

  return (
    <PageContainer>
      <Card>
        <Logo src={logo} alt="Lightbulb Logo" />
        <Heading>Admin Login</Heading>
        <InputFieldDiv>
          <Input
            type="email"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputFieldDiv>
        <Button onClick={handleLogin}>Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Card>
    </PageContainer>
  );
};

export default AdminLogin;