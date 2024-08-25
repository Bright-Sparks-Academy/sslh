import React, {useState, useEffect} from 'react';
import axios from "axios";
import styled from 'styled-components';
import editIcon from '../assets/draft.png'
import plusIcon from '../assets/Plus.png'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #FFFAED;
  width: 99.4vw;
  height: 110vh;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  font-weight: bold;
  font-size: 1.3rem;
  color: black;
  margin: 0.8rem;
`;

const EditIcon = styled.img`
  height: 30px;
  width: 30px;
  cursor: pointer;
`;

const DashboardItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #FFD900;
`;

const DashboardLabel = styled.header`
  height: 35px;
  width: 93%;
  font-size: 1.5rem;
  font-weight: bold;
`;

const DashboardItemsContainer = styled.div`
  display: grid;
  height: 550px;
  width: 95%;
  grid-template: 1fr 1.35fr/ 1fr 1fr 1fr;
  gap: 10px;
`;

const DashboardTitle = styled.header`
  height: 50px;
  width: 380px;
  font-size: 2.5rem;
  font-weight: bold;
  padding-top: 95px;
`;

const AccountInfo = styled.div`
  width: 95%;
  height: 1.7rem;
  margin-left: 1rem;
  font-weight: 600;
`;

const AccountInfoView = styled.button`
  background-color: black;
  color: white;
  height: 2rem;
  width: 6rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin: 0 0 0 21rem;
  cursor: pointer;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  direction: rtl;
  border-radius: 1rem;
  margin-left: 1rem;
  width: 95%;
  height: 10rem;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6.5rem;
  width: 90%;
  border-radius: 1rem;
  margin-top: 0.5rem;
  background-color: lightgray;
  direction: ltr;
`;

const ProfileSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 33%;
`;

const ProfileName = styled.h3`
  padding: 0 1rem;
  text-align: center;
`;

const ManagedUserInfo = styled.span`
  display: block;
  font-size: 1.1rem;
  font-weight: 650;
`;

const EditButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  background-color: black;
  color: white;
  height: 1.7rem;
  width: 6rem;
  border-radius: 3rem;
  border-width: 0;
  cursor: pointer;
`;

const LetterGrade = styled.h1`
  margin: 0;
`;

const NumberGrade = styled.h4`
  margin: 0;
`;

const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Dropdown = styled.select`
  font-family: "Quicksand", sans-serif;
  font-size: 1.1rem;
  padding: 0 1rem;
  width: 13rem;
  height: 2.5rem;
  border-radius: 0.3rem;
  margin-left: 0.5rem;
`;

const CommunicationScrollContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: thin;
  width: 25rem;
  height: 7.5rem;
  margin-left: 1.3rem;
  padding-bottom: 0.5rem;
`;

const Contact = styled.button`
  font-family: "Quicksand", sans-serif;
  background-color: lightgray;
  height: 6rem;
  width: 8rem;
  border-radius: 2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: font-weight 0.3s ease;

  &:hover {
    font-weight: bold;
  }
`;

const ContactViewButton = styled.button`
  font-family: "Quicksand", sans-serif;
  color: white;
  font-size: 95%;
  font-weight: 500;
  border-radius: 1rem;
  height: 2rem;
  width: 6rem;
  border: none;
  margin-left: 20rem;
  margin-top: 0.25rem;
  background-color: black;
  cursor: pointer;
`;

const WhiteBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.7rem;
  padding-top: 1rem;
  background-color: white;
  border-radius: 1rem;
  height: 14rem;
  width: 95%;
`;

const CourseMaterialContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 95%;
  margin-top: 0.7rem;
  height: 10rem;
`;

const CourseMaterialSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 48%;
  heigth: 100%;
  border-radius: 1rem;
  background-color: #FFD900;
`;

const MaterialHeader = styled.header`
  font-weight: 550;
  margin: 0.2rem 0;
`;

const Material = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 550;
  background-color: lightgray;
  border-radius: 1rem;
  padding: 0.5rem;
  direction: ltr;
  width: 85%;
  height: 2.5rem;
`;

const MaterialInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MaterialInfo = styled.span`
  font-size: 0.9rem;
`;

const ViewMaterialButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  color: white;
  border-radius: 0.5rem;
  height: 1.5rem;
  width: 3.5rem;
  border: none;
  background-color: black;
  cursor: pointer;
`;

const IconContainer = styled.div`
  width: 100%;
  direction: rtl;
`;

const EditMaterialIcon = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: lightgray;
`;

const ChatroomLabel = styled.header`
  margin-top: 1rem;
`;

const Line = styled.hr`
  width: 20rem;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ChatroomButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-radius: 1rem;
  color: white;
  margin: 0.3rem;
  height: 2rem;
  width: 6rem;
  border: none;
  cursor: pointer;
`;


const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [instructorData, setInstructorData] = useState(null);
  const [courseMaterialData, setCourseMaterialData] = useState(null);
  const [chatroomMonitorData, setChatroomMonitorData] = useState(null);
  const [isAdminInfoOpened, setIsAdminInfoOpened] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [adminInfoResponse, courseMaterialDataResponse, instructorDataResponse, chatroomMonitorDataResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/admin-info"),
          axios.get("http://localhost:3000/api/course-materials"),
          axios.get("http://localhost:3000/api/instructors"),
          axios.get("http://localhost:3000/api/chatroom-monitor"),
        ]);
  
        setAdminInfo(adminInfoResponse.data);
        setCourseMaterialData(courseMaterialDataResponse.data);
        setInstructorData(instructorDataResponse.data);
        setChatroomMonitorData(chatroomMonitorDataResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };
  
    fetchData();
  }, []);

  const displayAdminInfo = () => {
    setIsAdminInfoOpened(!isAdminInfoOpened);
  };

  return (
    <PageContainer>
      <DashboardTitle>Admin Dashboard</DashboardTitle>
      <DashboardLabel>{`{Admin Name}'s`} Profile</DashboardLabel>
      <DashboardItemsContainer>
        <DashboardItem>
          <SectionHeader>
            Account Information
            <EditIcon src={editIcon} alt='Edit Icon'></EditIcon>
          </SectionHeader>
          
          <AccountInfo>Admin: </AccountInfo>
          <AccountInfo>User ID: </AccountInfo>
          <AccountInfo>Class: </AccountInfo>
          <AccountInfo>Last Joined: </AccountInfo>
          <AccountInfo>Email: </AccountInfo>
          <AccountInfoView>View</AccountInfoView>
        </DashboardItem>

        <DashboardItem>
          <SectionHeader>
            Managed Instructors
            <EditIcon src={editIcon} alt='Edit Icon'></EditIcon>
          </SectionHeader>

          <ScrollContainer>
            <UserContainer>
              <ProfileSectionContainer>
                <ProfileName>Instructor A</ProfileName>
              </ProfileSectionContainer>
              <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                <ManagedUserInfo>Class:</ManagedUserInfo>
                <ManagedUserInfo>Recordings:</ManagedUserInfo>
                <ManagedUserInfo>Students:</ManagedUserInfo>
                <EditButton>Edit</EditButton>
              </ProfileSectionContainer>
              <ProfileSectionContainer>
                <ManagedUserInfo>Class Avg</ManagedUserInfo>
                <LetterGrade>B</LetterGrade>
                <NumberGrade>99.28%</NumberGrade>
              </ProfileSectionContainer>
            </UserContainer>
          </ScrollContainer>
        </DashboardItem>
          
        <DashboardItem>
          <SectionHeader>Communication</SectionHeader>
          <CommunicationScrollContainer>
            <Contact>Instructor A</Contact>
            <Contact>Student B</Contact>
            <Contact>Admin C</Contact>
          </CommunicationScrollContainer>
          <ContactViewButton>View</ContactViewButton>
        </DashboardItem>
      
        <DashboardItem>
          <SectionHeader>Course Materials</SectionHeader>
          <WhiteBackground>
            <DropdownContainer>
                <Dropdown>
                  <option value="none" selected disabled hidden>Select Class</option>
                </Dropdown>
            </DropdownContainer>

            <CourseMaterialContainer>
              <CourseMaterialSection>
                <MaterialHeader>Lesson Recordings</MaterialHeader>
                <ScrollContainer style={{ height: '6.5rem', margin: '0' }}>
                  <Material>Recording 1: TITLE 6/22/24</Material>
                </ScrollContainer>

              </CourseMaterialSection>

              <CourseMaterialSection>
                <MaterialHeader>Published Assignments</MaterialHeader>
                <ScrollContainer style={{ height: '6.5rem', margin: '0' }}>
                  <Material>
                    <MaterialInfoContainer>
                      <MaterialInfo>Homework 1</MaterialInfo>
                      <MaterialInfo>7/22</MaterialInfo>
                    </MaterialInfoContainer>
                    <ViewMaterialButton>View</ViewMaterialButton>
                  </Material>
                </ScrollContainer>
              </CourseMaterialSection>
            </CourseMaterialContainer>
          </WhiteBackground>
        </DashboardItem>

        <DashboardItem>
          <SectionHeader>
            Managed Students
            <EditIcon src={editIcon} alt='Edit Icon'></EditIcon>
          </SectionHeader>

          <DropdownContainer>
            <Dropdown>
              <option value="none" selected disabled hidden>Select Instructor</option>
            </Dropdown>
          </DropdownContainer>
          <ScrollContainer style={{ height: '12rem' }}>
            <UserContainer>
              <ProfileSectionContainer>
                <ProfileName>Student A</ProfileName>
              </ProfileSectionContainer>
              <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                <ManagedUserInfo>Class:</ManagedUserInfo>
                <ManagedUserInfo>Recordings:</ManagedUserInfo>
                <ManagedUserInfo>Students:</ManagedUserInfo>
                <EditButton>Edit</EditButton>
              </ProfileSectionContainer>
              <ProfileSectionContainer>
                <LetterGrade>B</LetterGrade>
                <NumberGrade>99.28%</NumberGrade>
              </ProfileSectionContainer>
            </UserContainer>
          </ScrollContainer>
        </DashboardItem>

        <DashboardItem>
          <SectionHeader>Chatroom Monitor</SectionHeader>

          <WhiteBackground>
            <DropdownContainer>
              <Dropdown>
                <option value="none" selected disabled hidden>Select Instructor</option>
              </Dropdown>
            </DropdownContainer>
            
            <ChatroomLabel>Chatroom History</ChatroomLabel>
            <Line />
            <ScrollContainer style={{ height: '8.5rem', width: '90%' }}>
              <UserContainer>
                <ProfileSectionContainer>
                  <ProfileName>Student A</ProfileName>
                </ProfileSectionContainer>
                <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                  <ManagedUserInfo>Class:</ManagedUserInfo>
                  <ManagedUserInfo>Started:</ManagedUserInfo>
                  <ManagedUserInfo>Messages:</ManagedUserInfo>
                </ProfileSectionContainer>
                <ProfileSectionContainer>
                  <ButtonContainer>
                    <ChatroomButton style={{ backgroundColor: '#000000' }}>View</ChatroomButton>
                    <ChatroomButton style={{ backgroundColor: 'red' }}>Report</ChatroomButton>
                  </ButtonContainer>
                </ProfileSectionContainer>
              </UserContainer>
            </ScrollContainer>
          </WhiteBackground>
        </DashboardItem>
      </DashboardItemsContainer>
    </PageContainer>
  );
};

export default AdminDashboard;
