import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  color: #333;
  min-height: 100vh;
  font-family: "Quicksand", sans-serif;
  position: relative;
  top: 100px
`;

const Header = styled.header`
  font-size: 40px;
  font-weight: bold;
  color: #222;
  margin-bottom: 40px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

// const ProfilePicture = styled.div`
//   width: 100px;
//   height: 100px;
//   background-color: #C4C4C4;
//   border-radius: 50%;
//   margin-right: 20px;
//   box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
// `;

const UserName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #333;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1300px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  width: 30%;
  font-weight: 550;
  background-color: #FFD900;
  padding: 30px;
  border-radius: 0px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;

  button {
    margin: 10px 0;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #333;
      color: white;
    }
  }
`;

const AdminOptionsButton = styled.button`
  background-color: #CCCCCC;
  color: #333;
  font-family: "Quicksand", sans-serif;

  &:hover {
    background-color: #b3b3b3;
  }
`;

const ReportAccountButton = styled.button`
  background-color: #FF4D4D;
  color: white;
  font-family: "Quicksand", sans-serif;

  &:hover {
    background-color: #e60000;
  }
`;

const DeleteAccountButton = styled.button`
  background-color: #000000;
  color: #FFFFFF;
  font-family: "Quicksand", sans-serif;

  &:hover {
    background-color: #b3b3b3;
  }
`;

const SelectStudentDropdown = styled.select`
  font-family: "Quicksand", sans-serif;
  font-weight: 550;
  font-size: 15px;
  height: 50px;
  margin: 10px 0;
  padding-left: 10px;
  border: none;
  border-radius: 10px;
`;

const UserActivitySection = styled(Section)`
  display: flex;
  flex-direction: column;
`;

const ActivityItem = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ActivityDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #555;
`;

const ActivityButtons = styled.div`
  display: flex;

  button {
    font-family: "Quicksand", sans-serif;
    font-weight: 550;
    margin-left: 10px;
    padding: 10px 15px;
    background-color: #333;
    color: white;
    border-radius: 8px;
    height: 40px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #444;
    }
  }

  button:last-child {
    background-color: #FF4D4D;

    &:hover {
      background-color: #e60000;
    }
  }
`;

const EditingStudent = () => {
  return (
    <Container>
      <Header>Edit Student</Header>
      <UserContainer>
        {/* <ProfilePicture /> */}
        <UserName>Student Name</UserName>
      </UserContainer>
      <SectionContainer>
        <Section>
          <h3>Account Information</h3>
          <p>User ID: {`{UserID}`}</p>
          <p>Class: Java</p>
          <p>Last joined: 5/24/24</p>
          <p>Email: example@site.com</p>
          <ButtonGroup>
            <SelectStudentDropdown>
              <option value="none" selected disabled hidden>View Another Student</option>
              {/* Add other options for students here */}
            </SelectStudentDropdown>
            <AdminOptionsButton>⚙️ Admin Options</AdminOptionsButton>
            <ReportAccountButton>Report Account</ReportAccountButton>
            <DeleteAccountButton>Delete Account</DeleteAccountButton>
          </ButtonGroup>
        </Section>
        <Section>
          <h3>Edit User Settings</h3>
          {/* Additional form elements for editing settings can go here */}
        </Section>
        <UserActivitySection>
          <h3>User Activity</h3>
          <ActivityItem>
            <ActivityDetails>
              <div>Assignment History</div>
              <div>Submitted: N/A</div>
              <div>Missing: N/A</div>
            </ActivityDetails>
            <ActivityButtons>
              <button>Coming soon!</button>
              <button>N/A</button>
            </ActivityButtons>
          </ActivityItem>
          <ActivityItem>
            <ActivityDetails>
              <div>Instructor: N/A</div>
              <div>Class: N/A</div>
              <div>Class Avg: N/A</div>
            </ActivityDetails>
            <ActivityButtons>
              <button>Coming soon!</button>
              <button>N/A</button>
            </ActivityButtons>
          </ActivityItem>
          <ActivityItem>
            <ActivityDetails>
              <div>Communication</div>
              <div>Online Meetings: 9</div>
              <div>Messages: 30</div>
            </ActivityDetails>
            <ActivityButtons>
              <button>View</button>
              <button>Report</button>
            </ActivityButtons>
          </ActivityItem>
          <ActivityItem>
            <ActivityDetails>
              <div>Course: Class A</div>
              <div>Total Students: 10</div>
              <div>Total Instructors: 5</div>
            </ActivityDetails>
            <ActivityButtons>
              <button>View</button>
            </ActivityButtons>
          </ActivityItem>
        </UserActivitySection>
      </SectionContainer>
    </Container>
  );
};

export default EditingStudent;
