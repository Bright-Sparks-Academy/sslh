import React from 'react';
import styled from 'styled-components';

// Container for the entire page
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fffce6; /* Light yellow background */
  color: black;
`;

// Header for the page title
const Header = styled.header`
  font-size: 40px;
  font-weight: bold;
  color: #222;
  margin-bottom: 40px;
  margin-top: 100px;
`;

// Container for username and profile
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

// Profile picture
const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  background-color: #C4C4C4;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

// Username
const UserName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #333;
`;

// Container for each section of the page (Account Information, User Activity, etc.)
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #FFD900; /* Yellow background */
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 350px; /* Adjust as necessary */
`;

// Account Information container
const AccountInfoContainer = styled(SectionContainer)`
  width: 350px;
`;

// User Activity container
const UserActivityContainer = styled(SectionContainer)`
  width: 450px;
  flex-direction: column;
`;

// Edit User Settings container
const EditUserSettingsContainer = styled(SectionContainer)`
  width: 350px;
`;

// Buttons for reporting or deleting an account
const Button = styled.button`
  background-color: ${props => (props.red ? '#FF0000' : '#808080')}; /* Red for report, gray for others */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
  font-size: 1rem;
`;

// Container for student list in user activity
const StudentListContainer = styled.div`
  background-color: #F2F2F2; /* Light gray background */
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;

// Button for each student or course item
const EditButton = styled.button`
  background-color: black;
  color: white;
  width: 50px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
`;

// Button for each report button
const ReportButton = styled.button`
  background-color: red;
  color: white;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
`;

// Header within sections like "Account Information", "User Activity"
const SectionHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

// Example of student or other small list items
const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFFF; /* White background */
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

// Main Component
const EditTeacher = () => {
  return (
<PageContainer>
<Header>Edit Teacher</Header>
      <UserContainer>
        <ProfilePicture />
        <UserName>Teacher Name</UserName>
      </UserContainer>

      <div style={{ display: 'flex' }}>
        <AccountInfoContainer>
          <SectionHeader>Account Information</SectionHeader>
          <p>User ID: UserID</p>
          <p>Class: Java</p>
          <p>Last joined: 5/24/24</p>
          <p>Email: example@site.com</p>
          <Button>Calendly Link</Button>
          <Button>Admin Options</Button>
          <Button red>Report Account</Button>
          <Button>Delete Account</Button>
        </AccountInfoContainer>

        <EditUserSettingsContainer>
        <SectionHeader>Edit User Settings</SectionHeader>
        {/* Add form elements here */}
        </EditUserSettingsContainer>

        <UserActivityContainer>
          <SectionHeader>User Activity</SectionHeader>

          <div>
            <h3>Post History</h3>
            <StudentItem>
              <span>Recordings: 12</span>
              <EditButton>Edit</EditButton>
              <ReportButton>Report</ReportButton>
            </StudentItem>
            <StudentItem>
              <span>Assignments: 11</span>
              <EditButton>Edit</EditButton>
              <ReportButton>Report</ReportButton>
            </StudentItem>
          </div>

          <div>
            <h3>Communication</h3>
            <StudentItem>
              <span>Online Meetings: 6</span>
              <EditButton>Edit</EditButton>
              <ReportButton>Report</ReportButton>
            </StudentItem>
            <StudentItem>
              <span>Messages: 37</span>
              <EditButton>Edit</EditButton>
              <ReportButton>Report</ReportButton>
            </StudentItem>
          </div>

          <StudentListContainer>
            <h3>All Students</h3>
            <StudentItem>
              <span>Student A</span>
              {/* <ViewButton onClick={() => navigate('/admin-editing-student')}>Edit</ViewButton>
              <ViewButton red>Report</ViewButton> */}
            </StudentItem>
            <StudentItem>
              <span>Student B</span>
              {/* <ViewButton onClick={() => navigate('/admin-editing-student')}>Edit</ViewButton>
              <ViewButton red>Report</ViewButton> */}
            </StudentItem>
          </StudentListContainer>
        </UserActivityContainer>
      </div>
    </PageContainer>
  );
};

export default EditTeacher;
