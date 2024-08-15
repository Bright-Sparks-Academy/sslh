import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import lightbulbIcon from '../assets/lightbulb.png';
import { auth, db } from './../firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';

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

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

const HeaderLink = styled.a`
  color: #000;
  text-decoration: none;
  font-weight: bold;
`;

const NavBar = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
          } else {
            console.error('User document does not exist.');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (!loading && userRole) {
      if (location.pathname === '/student-login' && userRole === 'Student') {
        navigate('/student/dashboard');
      } else if (location.pathname === '/teacher-login' && userRole === 'Teacher') {
        navigate('/teacher/dashboard');
      } else if (location.pathname === '/admin-login' && userRole === 'Admin') {
        navigate('/admin/dashboard');
      }
    }
  }, [userRole, loading, navigate, location.pathname]);

  return (
    <NavBarContainer>
      <NavLinks>
        <NavLink to="/" $isActive={location.pathname === '/'}>
          <img src={lightbulbIcon} alt="Home" style={{ width: '75px', height: '75px' }} />
        </NavLink>
        {userRole && (
          <>
            <NavLink to="/student/dashboard" $isActive={location.pathname === '/student/dashboard'}>Dashboard</NavLink>
            <NavLink to="/messaging" $isActive={location.pathname === '/messaging'}>Messaging</NavLink>
            <NavLink to="/homework" $isActive={location.pathname === '/homework'}>Homework</NavLink>
            <NavLink to="/recordings-page" $isActive={location.pathname === '/recordings-page'}>Recordings</NavLink>
            <NavLink to="/connections" $isActive={location.pathname === '/connections'}>Connections</NavLink>
            <NavLink to="/moderation" $isActive={location.pathname === '/moderation'}>Moderation</NavLink>
          </>
        )}
      </NavLinks>
      {auth.currentUser ? (
        <ProfileContainer>
          <ProfileImage src={auth.currentUser.photoURL} alt="Profile" onClick={handleLogout} />
        </ProfileContainer>
      ) : (
        <HeaderLink href="https://brightsparks.academy" target="_blank">Created by Bright Sparks Academy</HeaderLink>
      )}
    </NavBarContainer>
  );
};

export default NavBar;