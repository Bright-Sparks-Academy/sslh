import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import lightbulbIcon from '../assets/lightbulb.png';
import { auth, db } from './../firebaseConfig.js';
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import MenuButton from "../assets/menuButton.png";

const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 98%;
  background-color: #fff;
  color: #ffd900;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Align items horizontally on the same line */
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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
  cursor: pointer;
  transform: translateY(5px); /* Move the button down slightly */
  width: 35px;
  height: 35px;
`;

const HeaderLink = styled.a`
  color: #000;
  text-decoration: none;
  font-weight: bold;
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

const NavBar = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [teacherCalendlyLink, setTeacherCalendlyLink] = useState(""); //For students only!

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

 
  useEffect(() => {
    const fetchUserRole = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserRole(userDoc.data().role);
            if (userRole === "Student") {
              const studentSnapshot = await getDocs(
                collection(db, "users", user.uid)
              );
              setTeacherCalendlyLink(
                studentSnapshot.docs[0].data().teacherCalendlyLink
              );
            }
          } else {
            console.error("User document does not exist.");
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
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
      setUserRole(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderNavLinks = () => {
    if (userRole === 'Student') {
      return (
        <>
          <NavLink to="/student-dashboard" $isActive={location.pathname === '/student-dashboard'}>Dashboard</NavLink>
          <NavLink to="/scheduling" $isActive={location.pathname === '/scheduling'}>Schedule</NavLink>
          <NavLink to="/messaging" $isActive={location.pathname === '/messaging'}>Messaging</NavLink>
          <NavLink pathname={teacherCalendlyLink}>Schedule</NavLink>
        </>
      );
    } else if (userRole === 'Teacher') {
      return (
        <>
          <NavLink to="/teacher-dashboard" $isActive={location.pathname === '/teacher-dashboard'}>Dashboard</NavLink>
          <NavLink to="/messaging" $isActive={location.pathname === '/messaging'}>Messaging</NavLink>
        </>
      );
    } else if (userRole === 'Admin') {
      return (
        <>
          <NavLink to="/admin-dashboard" $isActive={location.pathname === '/admin-dashboard'}>Dashboard</NavLink>
          <NavLink to="/connections" $isActive={location.pathname === '/connections'}>Connections</NavLink>
          <NavLink to="/moderation" $isActive={location.pathname === '/moderation'}>Moderation</NavLink>
          <NavLink to="/admin-editing-student" $isActive={location.pathname === '/admin-editing-student'}>Edit Student</NavLink>
          <NavLink to="/admin-editing-teacher" $isActive={location.pathname === '/admin-editing-teacher'}>Edit Teacher</NavLink>
        </>
      );
    }
  };

  return (
    <NavBarContainer>
      <NavLinks>
        <NavLink to="/" $isActive={location.pathname === '/'}>
          <img src={lightbulbIcon} alt="Home" style={{ width: '75px', height: '75px' }} />
        </NavLink>
        {renderNavLinks()}
      </NavLinks>
      {auth.currentUser ? (
        <ProfileContainer>
          <ProfileImage src={MenuButton} alt="Profile" style={{ width: '35px', height: '35px' }} onClick={toggleDropdown} />
          <ProfileDropdown isOpen={isDropdownOpen}>
            <DropdownItem to="/settings">Settings</DropdownItem>
            <DropdownItem as="button" onClick={handleLogout}>Logout</DropdownItem>
          </ProfileDropdown>
        </ProfileContainer>
      ) : (
        <HeaderLink href="https://brightsparks.academy" target="_blank">Created by Bright Sparks Academy</HeaderLink>
      )}
    </NavBarContainer>
  );
};

export default NavBar;
