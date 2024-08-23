import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import userIcon from "../assets/user.png";
import { auth, storage, db } from "../firebaseConfig.js";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import {EditInfo} from '../components/Modals.js';
import { roles, getRole } from '../roles.js';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffef;
  width: 99.4vw;
  height: 125vh;
`;

const ProfileTitle = styled.header`
  color: black;
  width: 19rem;
  height: 4rem;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 8rem;
`;

const ProfilePicture = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: 0.2rem;
`;

const ProfileName = styled.div`
  display: flex;
  width: 11rem;
  height: 2rem;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ProfileInfoContainer = styled.div`
  display: grid;
  height: 34rem;
  width: 95%;
  grid-template: 1fr 0.6fr 0.3fr / 1fr 1.1fr 1.2fr 1.2fr;
  gap: 10px;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #ffd900;
`;

const SectionHeader = styled.header`
  width: 13rem;
  height: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 0 0 1.5rem;
`;

const SectionContent = styled.div`
  height: 100%;
  width: 100%;
`;

const RedButton = styled.button`
  background-color: red;
  height: 3rem;
  width: 8rem;
  font-family: "Quicksand", sans-serif;
  color: white;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  cursor: pointer;
  margin: 0 0 3rem 6.3rem;
`;

const AccountInfo = styled.div`
  width: 15rem;
  height: 1.7rem;
  margin: 0.5rem 0 0 1.5rem;
  font-weight: 500;
`;

const DoubleButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 3rem;
  margin-top: 0.8rem;
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
  height: 6rem;
`;

const Message = styled.div`
  display: flex;
  height: 6rem;
  width: 14rem;
  border-radius: 1rem;
  direction: ltr;
  background-color: lightgray;
`;

const NumMessagesContainer = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NumMessages = styled.h1`
  margin: 0;
`;

const NewMessages = styled.h5`
  margin: 0;
  text-align: center;
`;

const MessageInfoContainer = styled.div`
  display: flex;
  width: 70%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

const MessageInfo = styled.div`
  font-weight: 550;
  font-size: 0.9rem;
`;

const ViewButton = styled.button`
  background-color: black;
  color: white;
  height: 1.5rem;
  width: 8rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin-top: 1rem;
  cursor: pointer;
`;

const WhiteBackground = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 0.5rem;
  background-color: white;
  border-radius: 1rem;
  height: 30rem;
  width: 95%;
`;

const Meeting = styled.div`
  display: flex;
  flex-direction: column;
  width: 16rem;
  height: 5.5rem;
  padding-top: 0.5rem;
  border-radius: 1rem;
  background-color: lightgray;
`;

const MeetingInfo = styled.span`
  direction: ltr;
  margin-left: 1rem;
`;

const ScheduleButton = styled.button`
  height: 1.7rem;
  width: 93%;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin-top: 0.2rem;
  cursor: pointer;
`;

const CourseOptionsButton = styled.button`
  background-color: lightgray;
  height: 1.8rem;
  width: 12rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin: 0.2rem;
  cursor: pointer;
`;

const LongCourseOptionsButton = styled.button`
  height: 1.8rem;
  width: 20rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin: 0.4rem;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 28rem;
  width: 100%;
`;

const StudentOptionsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 10rem;
`;

const AccountSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 1rem;
  padding: 0.8rem;
  margin: 0 1rem 0 1rem;
  font-weight: 500;
`;

const ChangeInfoButton = styled.button`
  background-color: lightgray;
  height: 1.5rem;
  width: 10rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  margin-left: 3rem;
  border-radius: 1rem;
  cursor: pointer;
`;

const UpdateButton = styled.button`
  background-color: lightgray;
  height: 1.5rem;
  width: 5rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  margin-left: 3rem;
  border-radius: 1rem;
  cursor: pointer;
`;

const CourseSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CheckBox = styled.input`
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 5rem;
  accent-color: black;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 11rem;
  height: 0.9rem;
  margin-top: 0.3rem;
`;

const SliderRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8rem;
`;

const SliderStyles = createGlobalStyle`
  .slider {
    -webkit-appearance: none;
    background: #C5A800;
    border-radius: 3rem;
    outline: none;
    opacity: 0.7;
    width: 11rem;
    height: .4rem;
    accent-color: black;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance : none;
    background : black;
    height : .4rem;
    width : 1.7rem;
    border-radius: 1rem;
  }
`;

const UpdateInfoForm = styled.form `
  display: flex; 
  gap: 5px;
`;

const ButtonsDiv = styled.div `
  display: flex; 
  flex-direction: column; 
  gap: 5px;
`;

const TextFieldsDiv = styled.div `
  display: flex; 
  flex-direction: column; 
  gap: 4px;
`;


const TeacherDashboard = () => {
  const { user, setUser} = useContext(UserContext);
  const [fullName, setFullName] = useState("");
  const [className, setClassName] = useState("Java 1");
  const [bio, setBio] = useState("");

  function formatCreationTime(creationTime) {
    const date = new Date(creationTime);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
  }
  const [lastJoined, setLastJoined] = useState(formatCreationTime(user.metadata.creationTime));
  const fileInputRef = useRef(null); // Reference to file input
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.displayName) setFullName(user.displayName || "");
      else setFullName('Guest' || "");
    }
  }, [user]);

  function removeEmail(array, stringToRemove) {
    return array.filter(item => item !== stringToRemove);
  }

  const deleteAccount = () => {
    const role = getRole(user.email);
    if (role === "member") roles.members = removeEmail(roles.members, user.email);
    if (role === "admin") roles.admins = removeEmail(roles.admins, user.email);
    if (role === "teacher") roles.teachers = removeEmail(roles.teachers, user.email);
    else if (roles.students.includes(user.email)) {
      roles.students = removeEmail(roles.students, user.email);
    }
    handleLogout();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      try {
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: downloadURL });
        setUser({ ...user, photoURL: downloadURL });
      } catch (error) {
        console.error("Error uploading avatar:", error);
        alert("Failed to upload avatar. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName: fullName });
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { bio });
        setUser({ ...user, displayName: fullName });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  //Functions for updating the userID, email, and class of the teacher.
  const updateUserID = async (newUserID) => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        ID: newUserID //Check firestore for that!
      });
      user.uid = newUserID; //Ask nimai what to do for this, idrk what to do.
      document.querySelector('input[name="userID"]').value = ''; 
      console.log('User ID updated successfully');
    } catch (error) {
      console.error('Error updating user id:', error);
      throw new Error('Failed to update user id');
    }
  };

  const updateClass = (newClass) => {
    setClassName(newClass); //Check to see if that is in firebase so that I can update that to.
  };

  const updateEmail = async (newEmail) => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        Email: newEmail //Check firestore for that!
      });
      user.email = newEmail; //Ask nimai what to do for this, idrk what to do.
      document.querySelector('input[name="email"]').value = '';
      console.log('Email updated successfully');
    } catch (error) {
      console.error('Error updating email:', error);
      throw new Error('Failed to update email');
    }
  };

  const handleReportProblem = async () => {
    window.open('https://tally.so/r/3NLgrN', '_blank');
  }

  if (!user) return <div>Loading...</div>;


  return (
    <DashboardContainer>
      <SliderStyles />
      <ProfileTitle>Teacher Dashboard</ProfileTitle>
      <ProfilePicture src={userIcon} alt="Profile" />
      <ProfileName>{fullName}</ProfileName>

      <ProfileInfoContainer>
        <ProfileItem>
          <SectionHeader>Account Information</SectionHeader>
          <AccountInfo>User ID: {user.uid} </AccountInfo>
          <AccountInfo style={{ marginTop: '1.3rem' }}>Class: {className}</AccountInfo>
          <AccountInfo>Last Joined: {lastJoined}</AccountInfo>
          <AccountInfo style={{ marginTop: '1.3rem' }}>Email: {user.email}</AccountInfo>
          <DoubleButtonContainer>
            <CourseOptionsButton style={{ width: '8rem' }}>
              Coming Soon
            </CourseOptionsButton>
            <CourseOptionsButton style={{ width: '8rem', backgroundColor: 'red', color: 'white' }}>
              Delete Account
            </CourseOptionsButton>
          </DoubleButtonContainer>
        </ProfileItem>

        <ProfileItem style={{gridRow: 'span 3'}}>
          <SectionHeader>Class Schedule</SectionHeader>
          <WhiteBackground>
            <ScrollContainer style={{ height: '22rem', margin: '1rem 1rem ' }}>
              <Meeting>
                <MeetingInfo>Meeting 1: 7/3/24</MeetingInfo>
                <MeetingInfo>Time Frame: 1:00 PM - 2:30 PM</MeetingInfo>
                <MeetingInfo>Student: Student A</MeetingInfo>
                <MeetingInfo>Reason: Tutoring</MeetingInfo>
              </Meeting>
            </ScrollContainer>
            <ScheduleButton style={{ backgroundColor: '#16a10a' }}>
              Schedule a New Meeting
            </ScheduleButton>
            <ScheduleButton style={{ backgroundColor: '#ffd900' }}>
              Reschedule a Meeting
            </ScheduleButton>
            <ScheduleButton style={{ backgroundColor: 'red', color: 'white' }}>
              Cancel a Meeting
            </ScheduleButton>
          </WhiteBackground>
        </ProfileItem>

        <ProfileItem style={{gridRow: 'span 3'}}>
          <SectionHeader>Course Options</SectionHeader>
          <SectionContent>
            <CourseSelectionContainer>
              <AccountSectionContainer style={{ marginLeft: ".7rem" }}>
                Class: {className}
              </AccountSectionContainer>
            </CourseSelectionContainer>
            <ButtonsContainer>
              <CourseOptionsButton style={{
                  backgroundColor: "red",
                  color: "white",
                }}>Request to Leave
              </CourseOptionsButton>
              <CourseOptionsButton>Request a Change</CourseOptionsButton>
              <AccountSectionContainer style={{ marginLeft: "4rem", width: "100%" }}>
                Student Options:
              </AccountSectionContainer>
              <StudentOptionsContainer>
                <CourseOptionsButton style={{ width: "20rem" }}>
                  View Student Grade Book
                </CourseOptionsButton>
                <CourseOptionsButton style={{ backgroundColor: "black", color: "white", width: "20rem" }}>
                  View Student Post History
                </CourseOptionsButton>
                <CourseOptionsButton style={{ backgroundColor: "red", color: "white", width: "20rem", }}>
                  View Status on Reported Students
                </CourseOptionsButton>
              </StudentOptionsContainer>
              <LongCourseOptionsButton style={{ backgroundColor: "#FFFFB0" }}>
                Contact Administrator
              </LongCourseOptionsButton>
              <LongCourseOptionsButton style={{ backgroundColor: "lightgray" }}>
                View Course Materials
              </LongCourseOptionsButton>
              <LongCourseOptionsButton style={{ backgroundColor: "lightgray" }}>
                View Rules and Agreements
              </LongCourseOptionsButton>
              <LongCourseOptionsButton style={{ backgroundColor: "black", color: "white" }}>
                View Post History
              </LongCourseOptionsButton>
            </ButtonsContainer>
          </SectionContent>
        </ProfileItem>

        <ProfileItem style={{gridRow: 'span 3'}}>
          <SectionHeader>Preferences</SectionHeader>
          <SectionContent>
            <AccountSectionContainer>
              <div>Language: </div>
              <ChangeInfoButton>Change Language</ChangeInfoButton>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Allow Notifications: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Dark Mode: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Allow 2FA: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Allow Contact Via SMS: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Brightness: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Text Size: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Mic Volume: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Speaker Volume: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>
          </SectionContent>
          <RedButton
            style={{ width: "10rem", height: "2.5rem" }}
            onClick={() => {
              setFullName('');
              setBio('');
              // Reset other preferences if needed
            }}
          >
            Restore Defaults
          </RedButton>
        </ProfileItem>

        <ProfileItem>
          <SectionHeader>Messages</SectionHeader>
          <ScrollContainer>
            <Message>
              <NumMessagesContainer>
                <NumMessages>11</NumMessages>
                <NewMessages>New Messages</NewMessages>
              </NumMessagesContainer>
              <MessageInfoContainer>
                <MessageInfo>Class: Java</MessageInfo>
                <MessageInfo>Student: Student A</MessageInfo>
                <ViewButton>View Messages</ViewButton>
              </MessageInfoContainer>
            </Message>
          </ScrollContainer>
        </ProfileItem>

        <ProfileItem style={{   backgroundColor: '#ffffef' }}>
          <CourseOptionsButton style={{ width: '100%', backgroundColor: 'red', color: 'white' }} onClick={handleReportProblem}>
            Report a Problem
          </CourseOptionsButton>
          <CourseOptionsButton style={{ width: '100%' }}>
            Coming Soon
          </CourseOptionsButton>
        </ProfileItem>
      </ProfileInfoContainer>
    </DashboardContainer>
  );
};

export default TeacherDashboard;
