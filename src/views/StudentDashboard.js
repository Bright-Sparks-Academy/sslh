import React from "react";
// import axios from "axios";
// import { UserContext } from "../context/UserContext.js";
// import { RecordingsContext } from "../context/RecordingsContext.js";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  // const { user } = useContext(UserContext);
  // const { recordings } = useContext(RecordingsContext); // Access recordings from context
  // const [toDoList, setToDoList] = useState([]);
  // const [progressData, setProgressData] = useState([]);
  // const [selectedInstructor, setSelectedInstructor] = useState("Instructor A"); // State for instructor filter
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [toDoListResponse, progressResponse] = await Promise.all([
  //         axios.get("/api/todo-list"),
  //         axios.get("/api/progress-data"),
  //       ]);

  //       setToDoList(toDoListResponse.data);
  //       setProgressData(progressResponse.data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // // Filter recordings based on selected instructor
  // const filteredRecordings = recordings.filter(
  //   (recording) => recording.instructor === selectedInstructor,
  // );

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

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
