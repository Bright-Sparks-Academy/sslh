import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LightBulbAnimation from '../components/LightBulbAnimation.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const PageContainer = styled.div`
  font-family: 'Quicksand', sans-serif;
  background: #ffd900;
  color: #333;
  height: 100vh; /* For parallax effect */
  overflow-x: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 100vh;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 3.5rem;
  font-weight: bold;
  color: #000;
  text-align: center;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Subheading = styled.p`
  font-size: 1.8rem;
  color: #555;
  text-align: center;
  margin-bottom: 3.5rem;
`;

const ParallaxSection = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CenterTextButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  gap: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledButton = styled.button`
  color: white;
  background: linear-gradient(135deg, #ff9800, #ff5722);
  border: none;
  border-radius: 30px;
  padding: 15px 25px;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'Quicksand', sans-serif;
  font-weight: 600;
  width: 180px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover, &:focus {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const Home = () => {
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  }

  const handleTeacherLogin = () => {
    navigate('/teacher-login');
  }

  const handleAdminLogin = () => {
    navigate('/admin-login');
  }

  useEffect(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    gsap.fromTo(
      subheadingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
    );

    gsap.fromTo(
      '.light-bulb',
      { y: '20%' },
      {
        y: '-20%',
        scrollTrigger: {
          trigger: '.light-bulb',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <PageContainer>
      <ContentContainer>
        <Heading ref={headingRef}>Welcome to SparkSmart Learning Hub</Heading>
        <Subheading ref={subheadingRef}>Choose an option below</Subheading>
        
        <ParallaxSection className="light-bulb">
          <LightBulbAnimation />
        </ParallaxSection>
        
        <CenterTextButtonDiv>
          <StyledButton onClick={handleStudentLogin}>Student</StyledButton>
          <StyledButton onClick={handleTeacherLogin}>Teacher</StyledButton>
        </CenterTextButtonDiv>
        
        <StyledButton onClick={handleAdminLogin}>Admin</StyledButton>
      </ContentContainer>
    </PageContainer>
  );
};

export default Home;