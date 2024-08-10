import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import lightbulbIcon from '../assets/lightbulb.png';
import { auth } from '../firebaseConfig.js';

const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 98%;
  background-color: #fff;
  color: #FFD900;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: none;
  font-weight: ${props => props.$isActive ? 'bold' : 'normal'};
  &:hover {
    font-weight: bold;
  }
`;

const ProfileContainer = styled.div`
  position: relative;
`;

const ProfileImage = styled.button`
  cursor: pointer;

`;

const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 5px 10px;
  color: #000;
  text-decoration: none;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DropdownButton = styled.button`
  display: block;
  padding: 5px 10px;
  color: #000;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const LoginButton = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #FFD900;
  color: #000;
  padding: 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
`;

const NavBar = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <NavBarContainer>
      <NavLinks>
        <NavLink to="/" $isActive={location.pathname === '/'}>
          <img src={lightbulbIcon} alt="Home" style={{ width: '50px', height: '50px' }} />
        </NavLink>
        {user && (
          <>
            <NavLink to="/student/dashboard" $isActive={location.pathname === '/student/dashboard'}>Dashboard</NavLink>
            <NavLink to="/messaging" $isActive={location.pathname === '/messaging'}>Messaging</NavLink>
            {/* <NavLink to="/homework" $isActive={location.pathname === '/homework'}>Homework</NavLink>
            <NavLink to="/recordings-page" $isActive={location.pathname === '/recordings-page'}>Recordings</NavLink>
            <NavLink to="/mastery" $isActive={location.pathname === '/mastery'}>AI Learning Plans</NavLink>
            <NavLink to="/diagnostic-test" $isActive={location.pathname === '/diagnostic-test'}>Diagnostic Test</NavLink> */}
          </>
        )}
      </NavLinks>
      {user ? (
        <ProfileContainer>
          <ProfileImage onClick={handleLogout}>Logout</ProfileImage>
        </ProfileContainer>
      ) : (
        <LoginButton to="/login">Login</LoginButton>
      )}
    </NavBarContainer>
  );
};

export default NavBar;