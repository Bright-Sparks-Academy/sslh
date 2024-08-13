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
const Header = styled.h1`
  text-align: center;
  font-size: 2rem; /* Large font size */
  font-weight: bold;
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
  width: 250px;
`;

// User Activity container
const UserActivityContainer = styled(SectionContainer)`
  width: 500px;
  flex-direction: column;
`;

// Edit User Settings container
const EditUserSettingsContainer = styled(SectionContainer)`
  width: 500px;
  height: 100%; /* Full height */
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

// Container for user profile image and name
const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

// Profile image styling
const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

// Container for student list in user activity
const StudentListContainer = styled.div`
  background-color: #F2F2F2; /* Light gray background */
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
`;

// Button for each student or course item
const ViewButton = styled.button`
  background-color: black;
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

      <UserProfileContainer>
        <ProfileImage src="profile-pic-url" alt="Teacher" />
        <span>Teacher Name</span>
      </UserProfileContainer>

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

        <UserActivityContainer>
          <SectionHeader>User Activity</SectionHeader>

          <div>
            <h3>Post History</h3>
            <StudentItem>
              <span>Recordings: 12</span>
              <ViewButton>View</ViewButton>
              <ViewButton red>Report</ViewButton>
            </StudentItem>
            <StudentItem>
              <span>Assignments: 11</span>
              <ViewButton>View</ViewButton>
              <ViewButton red>Report</ViewButton>
            </StudentItem>
          </div>

          <div>
            <h3>Communication</h3>
            <StudentItem>
              <span>Online Meetings: 6</span>
              <ViewButton>View</ViewButton>
              <ViewButton red>Report</ViewButton>
            </StudentItem>
            <StudentItem>
              <span>Messages: 37</span>
              <ViewButton>View</ViewButton>
              <ViewButton red>Report</ViewButton>
            </StudentItem>
          </div>

          <StudentListContainer>
            <h3>All Students</h3>
            <StudentItem>
              <span>Student A</span>
              <ViewButton>View</ViewButton>
              <ViewButton red>Report</ViewButton>
            </StudentItem>
            <StudentItem>
              <span>Student B</span>
              <ViewButton>View</ViewButton>
              <ViewButton red>Report</ViewButton>
            </StudentItem>
          </StudentListContainer>
        </UserActivityContainer>
      </div>

      <EditUserSettingsContainer>
        <SectionHeader>Edit User Settings</SectionHeader>
        {/* Add form elements here */}
      </EditUserSettingsContainer>
    </PageContainer>
  );
};

export default EditTeacher;