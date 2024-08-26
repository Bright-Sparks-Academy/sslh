import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from './components/NavBar.js';
import Profile from './views/Profile.js';
import Home from './views/Home.js';
import AdminDashboard from './views/AdminDashboard.js';
import TeacherDashboard from './views/TeacherDashboard.js';
import StudentDashboard from './views/StudentDashboard.js';
import MessagingPage from './views/MessagingPage.js';
import StudentLogin from './views/StudentLogin.js';
import TeacherLogin from './views/TeacherLogin.js';
import AdminLogin from './views/AdminLogin.js';
import SchedulingPage from './views/SchedulingPage.js';
import ConnectionsPage from './views/Connections.js';
import EditingTeacher from './views/EditingTeacher.js';
import EditingStudent from './views/EditingStudent.js';
import Moderation from './views/Moderation.js';
import ReportProblemAdmin from './views/forms/reportProblemAdmin.js'
import ReportProblemNonAdmin from './views/forms/reportProblemNonAdmin.js'
import RequestChangeTeacher from './views/forms/requestChangeTeacher.js'
import RequestLeaveTeacher from './views/forms/requestLeaveTeacher.js'
import { auth } from './firebaseConfig.js';
import { getRole } from '././components/roles.js'; // Adjust the path as needed
import GlobalStyle from './GlobalStyles.js';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute.js';
import { UserProvider } from './context/UserContext.js';
import { RecordingsProvider } from './context/RecordingsContext.js';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userRole = await getRole(currentUser.uid);
          setRole(userRole);
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole(null);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalStyle />
      <UserProvider>
        <RecordingsProvider>
          <Router>
            <NavBar user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/student-login" element={user ? <Navigate to="/student-dashboard" /> : <StudentLogin />} />
              <Route path="/teacher-login" element={user ? <Navigate to="/teacher-dashboard" /> : <TeacherLogin />} />
              <Route path="/admin-login" element={user ? <Navigate to="/admin-dashboard" /> : <AdminLogin />} />
              <Route path="/student-dashboard" element={role === 'Student' ? <StudentDashboard /> : <Navigate to="/" />} />
              <Route path="/teacher-dashboard" element={role === 'Teacher' ? <TeacherDashboard /> : <Navigate to="/" />} />
              <Route path="/admin-dashboard" element={role === 'Admin' ? <AdminDashboard /> : <Navigate to="/" />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/messaging" element={<PrivateRoute><MessagingPage /></PrivateRoute>} />
              <Route path="/scheduling" element={<PrivateRoute><SchedulingPage /></PrivateRoute>} />
              <Route path="/connections" element={<PrivateRoute><ConnectionsPage /></PrivateRoute>} />
              <Route path="/admin-editing-teacher" element={<EditingTeacher/> } />
              <Route path="/admin-editing-student" element={<EditingStudent/> } />
              <Route path="/moderation" element={<Moderation/> } />
              <Route path="report-problem-admin" element={<ReportProblemAdmin/>} />
              <Route path="report-problem" element={<ReportProblemNonAdmin/>} />
              <Route path="request-change-teacher" element={<RequestChangeTeacher/>} />
              <Route path="request-change-leave" element={<RequestLeaveTeacher/>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </RecordingsProvider>
      </UserProvider>
    </div>
  );
};

export default App;