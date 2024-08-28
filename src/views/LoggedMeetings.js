import React, { useState, useEffect, useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import userIcon from "../assets/user.png";
import axios from "axios";
import { auth, storage, db } from "../firebaseConfig.js";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { DeleteMeetingWindow } from "../components/Modals.js";

const MeetingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffef;
  width: 99.4vw;
  height: 125vh;
`;

const Title = styled.header`
  color: black;
  width: 19rem;
  height: 4rem;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 8rem;
`;

const ScrollbarStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 1rem;
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 10px;
  }
`;

const SectionContainer = styled.div`
  display: grid;
  width: 90%;
  height: 80%;
  grid-template: 1fr / 1fr 1.8fr;
  gap: 25px;
  margin-bottom: 1rem;
`;

const Teacher = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
`;

const TeacherHeader = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
`;

const TeacherBody = styled.div`
  padding: 0;
`;

const TeacherList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TeacherItem = styled.li`
  border-bottom: 1px solid #ccc;
  padding: 10px;
`;

const ScrollTeacher = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  direction: rtl;
  border-radius: 1rem;
  width: 25rem;
  height: 24rem;
  background-color: white;
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

const LoggedMeetings = () => {
  const [teacherList, setTeacherList] = useState(null);
  const [Error, setError] = useState("");

  //Function that retrieves the student's name based on their id.
  const getStudentName = async (studentId) => {
    const studentDoc = await getDocs(collection(db, "users", studentId));
    return studentDoc.docs[0].data().name;
  };

  //Function that fetches the list of teachers to display each of their meetings.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherListResponse = await axios.get(
          "http://localhost:3000/api/managed-entities"
        );
        setTeacherList(teacherListResponse.data["teachers"]);
        console.log(teacherList);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  //Method to get a list of meetings for a teacher.
  const getTeacherMeetings = async (teacherId) => {
    const meetingTeacherSnapshot = await getDocs(
      collection(db, "users", teacherId)
    );
    return meetingTeacherSnapshot.docs;
  };

  //Function that gets the studentEmail based on the studentId.
  const getStudentEmail = async (studentId) => {
    const meetingTeacherSnapshot = await getDocs(
      collection(db, "users", studentId)
    );
    return meetingTeacherSnapshot.docs[0].data().email;
  };

  return (
    <>
      <MeetingsContainer>
        <ScrollbarStyles />
        <Title>Logged Meetings</Title>
        <SectionContainer>
          {/* Create a card per teacher, JSX code provided below*/}
          {/* teacherList.map([teacher, index] => {
                    if ("name" in teacher){
                        (
                            <Teacher>
                                  <TeacherHeader>Teacher {index + 1}: {teacher.name}</TeacherHeader>
                                    <TeacherBody>
                                        <ScrollTeacher>
                                            <TeacherList>
                                            {getTeacherMeetings(teacher.id).map(meeting => {
                                            <Meeting key={meeting.id}>
                                                <MeetingInfo>Time Frame: {meeting.startTime} - {meeting.endTime} </MeetingInfo>
                                                <MeetingInfo>Student: {getStudentName(meeting.studentId)}</MeetingInfo>
                                                <MeetingInfo>Reason: {meeting.reason}</MeetingInfo>
                                            </Meeting>
                                            })}
                                            <TeacherItem className="teacher-item">Email: {getStudentEmail(meeting.studentId)}</TeacherItem>
                                            </TeacherList>
                                        </ScrollTeacher>
                                  </TeacherBody>
                                  <DeleteMeetingWindow>

                                  </DeleteMeetingWindow>
                            </Teacher>)}}*/}
        </SectionContainer>
      </MeetingsContainer>
    </>
  );
};

export default LoggedMeetings;
