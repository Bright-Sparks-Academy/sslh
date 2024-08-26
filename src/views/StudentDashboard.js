import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import lightbulbIcon from "../assets/lightbulb.png";
import { UserContext } from "../context/UserContext.js";
import { RecordingsContext } from "../context/RecordingsContext.js";
import "./StudentDashboard.css";

// const DashboardContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: #fffaed;
//   width: 99.4vw;
//   height: 150vh;
// `;

// const SectionHeader = styled.div`
//   font-weight: bold;
//   font-size: 1.5rem;
//   color: black;
//   margin: 0.8rem;
// `;

// const DashboardItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   border-radius: 2rem;
//   background-color: #ffd900;
// `;

// const WhiteBackground = styled.div`
//   display: flex;
//   align-items: center;
//   border-radius: 1rem;
//   background-color: white;
//   margin-left: 0.5rem;
//   padding-bottom: 20px;
// `;

// const DashboardItemsContainer = styled.div`
//   display: grid;
//   height: 760px;
//   width: 95%;
//   grid-template: 1.2fr 1fr 1.05fr / 1.2fr 1fr 1fr;
//   gap: 10px;
// `;

// const DashboardTitle = styled.header`
//   color: black;
//   height: 50px;
//   width: 380px;
//   font-size: 2.5rem;
//   font-weight: bold;
//   padding-top: 95px;
// `;

// // PROFILE
// const ProfileHeaderTitle = styled.header`
//   width: 92%;
//   height: 40px;
//   font-weight: bold;
//   font-size: 1.5rem;
//   margin-top: 35px;
//   color: black;
// `;

// const ProfileContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// const ProfileContentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
// `;

// const ProfileContent = styled.div`
//   font-weight: bold;
//   font-size: 1.1rem;
//   color: black;
//   padding-top: 1rem;
// `;

// const ProfileViewButton = styled.button`
//   color: white;
//   font-size: 1.25rem;
//   border-radius: 1rem;
//   height: 2.3rem;
//   width: 7.5rem;
//   background-color: black;
//   margin-top: 7.2rem;
//   margin-left: 23rem;
//   cursor: pointer;
// `;

// // UPCOMING CLASSES
// const ClassContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
//   font-weight: bold;
//   font-size: 1.1rem;
//   color: black;
//   background-color: lightgray;
//   border-radius: 1.5rem;
//   width: 13rem;
//   height: 11.5rem;
//   padding-left: 20px;
//   padding-top: 5px;
//   margin-top: 1.3rem;
// `;

// const ClassInfoContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 3rem;
//   width: 6em;
//   height: 10rem;
//   margin-top: 1.3rem;
//   margin-left: 1rem;
// `;
// const ClassInfo = styled.span`
//   font-weight: bold;
//   font-size: 1.25rem;
// `;

// const ClassContentInfo = styled.span`
//   font-weight: bold;
//   font-size: 1.1rem;
// `;

// const JoinClassButton = styled.button`
//   color: black;
//   font-weight: bold;
//   border-radius: 1rem;
//   font-size: 1.25rem;
//   cursor: pointer;
//   height: 2rem;
//   width: 8rem;
//   border-width: 0;
//   margin-top: 1rem;
//   background-color: #ffd900;
// `;

// // SCHEDULE
// const ScheduleContentContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.7rem;
//   width: 100%;
//   height: 60%;
//   margin: 1rem;
// `;

// const ScheduleContent = styled.span`
//   font-weight: bold;
//   font-size: 1.1rem;
// `;
// const ScheduleInfoContainer = styled.div`
//   display: flex;
// `;

// const ScheduleInfo = styled.div`
//   display: flex;
//   align-items: center;
//   border-radius: 1rem;
//   background-color: lightgray;
//   font-weight: bold;
//   font-size: 1.1rem;
//   margin-left: 0.35rem;
//   padding-left: 1rem;
// `;

// // TODO LIST
// const TodoListBody = styled.div`
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   width: 30rem;
//   height: 23rem;
//   border-radius: 1rem;
//   background-color: white;
//   padding-bottom: 20px;
// `;

// const TodoListHeader = styled.div`
//   font-weight: bold;
//   font-size: 1.75rem;
//   color: black;
//   margin: 0.7rem;
// `;

// const CurrentDateContainer = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   font-weight: bold;
//   font-size: 1.3rem;
//   color: black;
//   width: 20rem;
//   height: 5rem;
// `;

// const NavButton = styled.button`
//   background-color: black;
//   color: white;
//   border-radius: 0.5rem;
//   width: 3.5rem;
//   height: 1.5rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   margin: 0 0.5rem;
// `;

// const TodoScrollContainer = styled.div`
//   display: flex;
//   gap: 15px;
//   flex-direction: column;
//   align-items: center;
//   overflow-y: scroll;
//   direction: rtl;
//   width: 30rem;
//   height: 25rem;
// `;

// const TodoItem = styled.div`
//   display: flex;
//   flex: none;
//   font-size: 1.1rem;
//   color: black;
//   font-weight: bold;
//   width: 95%;
//   height: 3.1rem;
//   direction: ltr;
//   align-items: center;
//   justify-content: space-around;
//   border-radius: 1.5rem;
//   background-color: lightgray;
//   padding-left: 5px;
// `;

// const TaskButton = styled.button`
//   width: 65px;
//   height: 30px;
//   background-color: black;
//   color: #f59e0b;
//   font-size: 1rem;
//   font-weight: bold;
//   padding: 0.25rem 0.5rem;
//   cursor: pointer;
//   border-radius: 0.375rem;
// `;

// // PROGRESS
// const ProgressContainer = styled.div`
//   display: grid;
//   grid-template: 1fr 0.2fr / 1fr 1fr;
//   width: 100%;
//   height: 23rem;
// `;

// const ProgressItem = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   font-weight: bold;
//   font-size: 1.1rem;
//   color: black;
//   background-color: lightgray;
//   border-radius: 1.5rem;
//   margin: 0.5rem;
//   padding-top: 1rem;
// `;

// const ProgressContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const ProgressBar = styled.progress`
//   accent-color: lightgreen;
// `;

// const ProgressViewButton = styled.button`
//   color: white;
//   font-size: 1.25rem;
//   border-radius: 1rem;
//   height: 2.3rem;
//   width: 7rem;
//   margin-top: 0.5rem;
//   margin-left: 18rem;
//   background-color: black;
//   cursor: pointer;
// `;

// // COMMUNICATION
// const CommunicationScrollContainer = styled.div`
//   display: flex;
//   gap: 15px;
//   align-items: center;
//   overflow-x: scroll;
//   overflow-y: hidden;
//   scrollbar-width: thin;
//   width: 23rem;
//   height: 7.5rem;
//   margin-left: 1.3rem;
//   padding-bottom: 0.5rem;
// `;

// const Contact = styled.div`
//   display: flex;
//   flex: none;
//   flex-direction: column;
//   align-items: center;
//   width: 7rem;
//   height: 100%;
//   margin-bottom: 1rem;
// `;

// const ContactName = styled.span`
//   font-weight: bold;
//   font-size: 1rem;
// `;

// const ContactViewButton = styled.button`
//   color: white;
//   font-size: 1.25rem;
//   border-radius: 1rem;
//   height: 2.3rem;
//   width: 7rem;
//   margin-left: 18rem;
//   margin-top: 0.25rem;
//   background-color: black;
//   cursor: pointer;
// `;

// // RECORDINGS
// const RecordingsScrollContainer = styled.div`
//   width: 14rem;
//   height: 8rem;
//   overflow-y: scroll;
//   border-radius: 1rem;
//   direction: rtl;
//   margin-top: 0.3rem;
//   margin-left: 1rem;
// `;
// const InstructorDropdown = styled.select`
//   width: 9rem;
//   height: 2.5rem;
//   border-radius: 0.3rem;
//   margin-left: 0.5rem;
//   margin-top: 1rem;
// `;

// const RecordingsViewButton = styled.button`
//   color: white;
//   font-size: 1.25rem;
//   border-radius: 1rem;
//   height: 2.3rem;
//   width: 7rem;
//   margin-left: 18rem;
//   margin-top: 0.2rem;
//   background-color: black;
//   cursor: pointer;
// `;

// const Recording = styled.div`
//   display: flex;
//   align-items: center;
//   border-radius: 1rem;
//   direction: ltr;
//   background-color: lightgray;
//   font-weight: bold;
//   font-size: 1.1rem;
//   width: 12rem;
//   margin-right: 0.5rem;
//   padding-left: 0.5rem;
//   margin-top: 0.5rem;
// `;

const StudentDashboard = () => {
  const { user } = useContext(UserContext);
  const { recordings } = useContext(RecordingsContext); // Access recordings from context
  const [toDoList, setToDoList] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState("Instructor A"); // State for instructor filter
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toDoListResponse, progressResponse] = await Promise.all([
          axios.get("/api/todo-list"),
          axios.get("/api/progress-data"),
        ]);

        setToDoList(toDoListResponse.data);
        setProgressData(progressResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter recordings based on selected instructor
  const filteredRecordings = recordings.filter(
    (recording) => recording.instructor === selectedInstructor,
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main id={"dashboard__wrapper"}>
      <header className={"dashboard__header"}>
        <h1>Student Dashboard</h1>
        <div className={"dashboard-header__profile"}>
          <h3>Student Name</h3>
        </div>
      </header>
      <section className={"dashboard__body"}>
        <div className={"dashboard-account__wrapper"}>
          <div className={"dashboard-account__information"}>
            <h2>Account Information</h2>
            <div className={"dashboard-account-information__list"}>
              <p>UserID: UserID</p>
              <p>Class: Java, Math</p>
              <p>Last Joined: 5/24/24</p>
              <p>Email: example@site.com</p>
            </div>
            <div className={"dashboard-account-information__buttons"}>
              <button>Edit Info</button>
              <button>Delete Account</button>
            </div>
          </div>
          <div className={"dashboard-account__messages"}>
            <h2>Messages</h2>
            <div className={"dashboard-account-messages__scroll"}>
              <div className={"dashboard-message__component"}>
                <p>Class</p>
                <p>Contacts</p>
                <p>Instructor</p>
                <button>View Messages</button>
              </div>

              <div className={"dashboard-message__component"}>
                <p>Class</p>
                <p>Contacts</p>
                <p>Instructor</p>
                <button>View Messages</button>
              </div>
            </div>
          </div>
          <div className={"dashboard-account__buttons"}>
            <button>Report A Problem</button>
            <button>Options</button>
          </div>
        </div>
        <div className={"dashboard__schedule"}>
          <h2>Class Schedule</h2>
          <div className={"dashboard-schedule__content"}>
            <div className={"dashboard-schedules__body"}>
              <div className={"dashboard-schedule__component"}>
                <p>Meeting 1</p>
                <p>Meeting 1</p>
                <p>Meeting 1</p>
                <p>Meeting 1</p>
              </div>
            </div>
            <div className={"dashboard-schedules__buttons"}>
              <button>Schedule a new meeting</button>
              <button>Reschedule a new meeting</button>
              <button>Cancel a meeting</button>
            </div>
          </div>
        </div>
        <div className={"dashboard-course__options"}>
          <div className={"dashboard-course-options__header"}>
            <aside className={"dashboard-course-options-header__container"}>
              <h2>Course Options</h2>
              <h4>Choose Course</h4>
            </aside>
            <aside className={"select__container"}>
              <select name="cars" id="cars">
                <option value="volvo">Select Class</option>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
              </select>
            </aside>
          </div>
          <div className={"dashboard-course__controls"}>
            <button>Request a change/Addition</button>
            <button>Request to remove</button>
          </div>
          <div className={"dashboard-instructor__controls"}>
            <p>Instructor: Instructor A</p>
            <div className={"dashboard-instructor-controls__button"}>
              <button>Change Instructor</button>
              <button>Report a problem</button>
            </div>
          </div>
          <div className={"dashboard-course__info"}>
            <button>Contact Administrator</button>
            <button>View Current Course Transcript</button>
            <button>View Rules and Agreements</button>
            <button>View Post History</button>
          </div>
        </div>
        <div className={"dashboard-account__preferences"}>
          <h2>Preferences</h2>
          <div className={"dashboard-account-preferences__options"}>
            <div className={"change__language"}>
              <h3>Language:</h3>
              <div>
                <h3>English</h3>
                <button>Restore Defaults</button>
              </div>
            </div>
            <div className={"checkbox-info"}>
              <h3>Allow Notification:</h3>
              <div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
              </div>
            </div>
            <div className={"checkbox-info"}>
              <h3>Dark Mode:</h3>
              <div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
              </div>
            </div>
            <div className={"checkbox-info"}>
              <h3>Allow 2FA:</h3>
              <div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
              </div>
            </div>
            <div className={"checkbox-info"}>
              <h3>Allow Contact via SMS:</h3>
              <div>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Bike"
                />
              </div>
            </div>
            <div className={"range"}>
              <h3>Brightness</h3>
              <div className={"range__parent"}>
                <input
                  type="range"
                  id="points"
                  name="points"
                  min="0"
                  max="10"
                />
                <div>
                  <p>0</p>
                  <p>100</p>
                </div>
              </div>
            </div>
            <div className={"range"}>
              <h3>Text Size</h3>
              <div className={"range__parent"}>
                <input
                  type="range"
                  id="points"
                  name="points"
                  min="0"
                  max="10"
                />
                <div>
                  <p>0</p>
                  <p>100</p>
                </div>
              </div>
            </div>
            <div className={"range"}>
              <h3>Mic Volume</h3>
              <div className={"range__parent"}>
                <input
                  type="range"
                  id="points"
                  name="points"
                  min="0"
                  max="10"
                />
                <div>
                  <p>0</p>
                  <p>100</p>
                </div>
              </div>
            </div>
            <div className={"range"}>
              <h3>Speaker Volume</h3>
              <div className={"range__parent"}>
                <input
                  type="range"
                  id="points"
                  name="points"
                  min="0"
                  max="10"
                />
                <div>
                  <p>0</p>
                  <p>100</p>
                </div>
              </div>
            </div>
          </div>
          <div className={"dashboard-account-preferences__buttons"}>
            <button>Restore Defaults</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default StudentDashboard;
