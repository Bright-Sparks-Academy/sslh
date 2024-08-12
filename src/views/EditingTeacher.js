import React from 'react';
import styled from 'styled-components';

// Main Container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFFFF0;
  height: 100vh;
  padding: 20px;
`;

// Header
const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ddd;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TeacherName = styled.h2`
  font-size: 1.5rem;
  text-align: center;
`;

// Sections Layout
const SectionsContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1400px;
`;

const Section = styled.div`
  background-color: #FFD700;
  border-radius: 10px;
  padding: 20px;
  flex: 1;
  margin: 0 10px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
`;

const WhiteSection = styled(Section)`
  background-color: #FFFFF0;
`;

// Account Information Section
const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  font-size: 1rem;
`;

const CalendlyLink = styled.a`
  display: inline-block;
  background-color: #d3d3d3;
  padding: 5px 10px;
  border-radius: 5px;
  color: #000;
  text-decoration: none;
`;

const EditIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1rem;
`;

const AdminOptions = styled.button`
  background-color: #d3d3d3;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
`;

const ReportAccount = styled.button`
  background-color: #FF0000;
  color: #FFF;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
  margin-bottom: 10px;
`;

const DeleteAccount = styled.button`
  background-color: #FFD700;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 1rem;
`;

// User Activity Section
const UserActivity = styled.div`
  background-color: #D3D3D3;
  padding: 15px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #D3D3D3;
  border-radius: 5px;
`;

const ViewButton = styled.button`
  background-color: #000;
  color: #FFF;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ReportButton = styled.button`
  background-color: #FF0000;
  color: #FFF;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// Students List Section
const StudentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #FFF;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
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

// Course Section
const CourseSection = styled.div`
  background-color: #F5F5F5;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin-top: auto;
`;

const CourseInfo = styled.div`
  margin-bottom: 10px;
`;

const CourseViewButton = styled(ViewButton)`
  background-color: #000;
`;

// Main Component
const EditTeacher = () => {
  return (
    <Container>
      <Header>Edit Teacher</Header>
      <ProfileSection>
        <ProfileImage />
        <TeacherName>Teacher Name</TeacherName>
      </ProfileSection>
      <SectionsContainer>
        {/* Left Section */}
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
          <AdminOptions>⚙️ Admin Options</AdminOptions>
          <ReportAccount>Report Account</ReportAccount>
          <DeleteAccount>Delete Account</DeleteAccount>
        </Section>

        {/* Center Section */}
        <WhiteSection>
          <h2>Edit User Settings</h2>
        </WhiteSection>

        {/* Right Section */}
        <Section>
          <h2>User Activity</h2>
          <UserActivity>
            <ActivityItem>
              <span>Recordings: 12</span>
              <div>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </div>
            </ActivityItem>
            <ActivityItem>
              <span>Assignments: 11</span>
              <div>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </div>
            </ActivityItem>
            <ActivityItem>
              <span>Online Meetings: 6</span>
              <div>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </div>
            </ActivityItem>
            <ActivityItem>
              <span>Messages: 37</span>
              <div>
                <ViewButton>View</ViewButton>
                <ReportButton>Report</ReportButton>
              </div>
            </ActivityItem>
          </UserActivity>

          <StudentsList>
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
          </StudentsList>

          <CourseSection>
            <CourseInfo>Course:</CourseInfo>
            <CourseInfo>Total Students: 10</CourseInfo>
            <CourseInfo>Total Instructors: 5</CourseInfo>
            <CourseViewButton>View</CourseViewButton>
          </CourseSection>
        </Section>
      </SectionsContainer>
    </Container>
  );
};

export default EditTeacher;