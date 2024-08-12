import React from 'react';
import styled from 'styled-components';

// Main container for the entire page
const EditTeacherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #FFFFF0; /* Light cream background */
  height: 100vh;
`;

// Header section with the teacher's name and profile picture
const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
  margin: 0 auto 10px;
`;

const TeacherName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

// Container for all the sections
const SectionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

// Section styles
const Section = styled.div`
  background-color: #FFD700; /* Gold background */
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

// Specific style for the Edit User Settings section
const EditUserSettingsSection = styled(Section)`
  background-color: #FFFFF0;
`;

// Account Information styles
const AccountInfo = styled.div`
  font-size: 1rem;
  color: #000;
`;

const InfoItem = styled.p`
  margin-bottom: 10px;
`;

const CalendlyLink = styled.a`
  display: inline-block;
  background-color: #d3d3d3;
  padding: 5px 10px;
  border-radius: 5px;
  color: #000;
  text-decoration: none;
  margin-top: 10px;
`;

const EditIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1.2rem;
`;

// Buttons at the bottom of the Account Information section
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  background-color: ${props => props.bgColor || '#d3d3d3'};
  color: ${props => props.color || '#000'};
`;

// User Activity styles
const ActivitySection = styled.div`
  background-color: #d3d3d3;
  padding: 15px;
  border-radius: 5px;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ActivityLabel = styled.span`
  flex: 1;
`;

const ActivityActions = styled.div`
  display: flex;
  gap: 5px;
`;

const ViewButton = styled(Button)`
  background-color: #000;
  color: #FFF;
`;

const ReportButton = styled(Button)`
  background-color: #FF0000;
  color: #FFF;
`;

// Student list style
const StudentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
`;

const StudentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StudentActions = styled.div`
  display: flex;
  gap: 5px;
`;

// Course section style
const CourseSection = styled.div`
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
`;

// Main Component
const EditTeacher = () => {
  return (
    <EditTeacherContainer>
      <HeaderSection>
        <ProfileImage />
        <TeacherName>Teacher Name</TeacherName>
      </HeaderSection>
      <SectionsContainer>
        <Section>
          <AccountInfo>
            <InfoItem>User ID: {`{UserID}`}</InfoItem>
            <InfoItem>Class: Java</InfoItem>
            <InfoItem>Last joined: 5/24/24</InfoItem>
            <InfoItem>Email: example@site.com</InfoItem>
            <InfoItem>
              Calendly Link: <CalendlyLink href="#">LINK HERE</CalendlyLink>
              <EditIcon>✏️</EditIcon>
            </InfoItem>
          </AccountInfo>
          <ButtonGroup>
            <Button bgColor="#d3d3d3">⚙️ Admin Options</Button>
            <Button bgColor="#FF0000" color="#FFF">Report Account</Button>
            <Button bgColor="#FFD700">Delete Account</Button>
          </ButtonGroup>
        </Section>

        <EditUserSettingsSection>
          <h2>Edit User Settings</h2>
        </EditUserSettingsSection>

        <Section>
          <h2>User Activity</h2>
          <ActivitySection>
            <ActivityItem>
              <ActivityLabel>Recordings: 12</ActivityLabel>
              <ActivityActions>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </ActivityActions>
            </ActivityItem>
            <ActivityItem>
              <ActivityLabel>Assignments: 11</ActivityLabel>
              <ActivityActions>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </ActivityActions>
            </ActivityItem>
            <ActivityItem>
              <ActivityLabel>Online Meetings: 6</ActivityLabel>
              <ActivityActions>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </ActivityActions>
            </ActivityItem>
            <ActivityItem>
              <ActivityLabel>Messages: 37</ActivityLabel>
              <ActivityActions>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </ActivityActions>
            </ActivityItem>
          </ActivitySection>
          <StudentList>
            <StudentItem>
              <StudentInfo>
                <div>Class: Java</div>
                <div>Started: 6/1/24</div>
                <div>Messages: 47</div>
              </StudentInfo>
              <StudentActions>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </StudentActions>
            </StudentItem>
            <StudentItem>
              <StudentInfo>
                <div>Class: Java</div>
                <div>Started: 6/1/24</div>
                <div>Messages: 47</div>
              </StudentInfo>
              <StudentActions>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </StudentActions>
            </StudentItem>
          </StudentList>
          <CourseSection>
            <div>Course:</div>
            <div>Total Students: 10</div>
            <div>Total Instructors: 5</div>
            <ViewButton>View</ViewButton>
          </CourseSection>
        </Section>
      </SectionsContainer>
    </EditTeacherContainer>
  );
};

export default EditTeacher;