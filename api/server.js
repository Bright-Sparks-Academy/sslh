// /Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/api/server.js
// Author: Tom Wang

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { collection, addDoc, doc, getDoc,  getDocs, updateDoc, setDoc, where, deleteDoc} from 'firebase/firestore';
import { db } from '../src/firebaseConfig.js';
import { StudentPackage, NonStudentPackage } from '../src/packages.js';
import { getCalendlyUser, listEventTypes, getSchedulingLink, setCalendlyAvailability} from './calendlyConfig.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use 5000 or a different port number

// Middleware to parse JSON bodies and enable CORS
app.use(bodyParser.json());
// Configure CORS
app.use(cors({
  origin: '*', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent with requests
}));

const preferences = {
  language: "English",
  allowNotifications: true,
  darkMode: true,
  allow2FA: true,
  allowContactViaSMS: true,
  brightness: 75,
  textSize: 14,
  micVolume: 80,
  speakerVolume: 65
};


// Correctly using the Firestore collection function with the modular SDK
(async () => {
  try {
    const testCollection = collection(db, 'test');  // Correct way to reference a collection
    const testDocRef = doc(testCollection, 'doc1');
    
    // Set a document in the collection
    await setDoc(testDocRef, { field: 'value' });
    console.log('Document successfully written!');
    
    // Get all documents in the collection
    const querySnapshot = await getDocs(testCollection);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error('Error:', error);
  }
})();
//admin endpoints 
// Endpoint to fetch admin info
app.get('/api/admin-info', async (req, res) => {
  try {
    const adminInfo = {
      name: 'Nikhil Munagala',
      role: 'Admin',
      email: 'nikhilsaimunagala@gmail.com'
    };
    res.json(adminInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin info' });
  }
});

//admin moderation page
console.log(db); // Should not be undefined
// Get all users from Firestore
const getAllUsersFromDatabase = async () => {
  try {
    const usersCollectionRef = collection(db, 'users'); // Access the 'users' collection
    const usersSnapshot = await getDocs(usersCollectionRef); // Get all documents in the collection
    
    if (usersSnapshot.empty) {
      console.log('No users found.');
      return [];
    }

    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    console.log('Users fetched:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
};

// Get details for a specific user
const getUserDetails = async (userId) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw new Error('Failed to fetch user details');
  }
};

// Update user details
const updateUserDetails = async (userId, updatedData) => {
  try {
    await updateDoc(doc(db, 'users', userId), updatedData);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw new Error('Failed to update user details');
  }
};

// Delete or deactivate a user
const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, 'users', userId));
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};

// Report a user
const reportUser = async (userId, issue) => {
  try {
    await addDoc(collection(db, 'reports'), { userId, issue, reportedAt: new Date() });
    console.log('User reported successfully');
  } catch (error) {
    console.error('Error reporting user:', error);
    throw new Error('Failed to report user');
  }
};

// Get recordings for a specific user
const getUserRecordings = async (userId) => {
  try {
    const recordingsSnapshot = await getDocs(collection(db, 'users', userId, 'recordings'));
    return recordingsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching user recordings:', error);
    throw new Error('Failed to fetch user recordings');
  }
};

// Get messages for a specific user
const getUserMessages = async (userId) => {
  try {
    const messagesSnapshot = await getDocs(collection(db, 'users', userId, 'messages'));
    return messagesSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching user messages:', error);
    throw new Error('Failed to fetch user messages');
  }
};

// Report specific content
const reportContent = async (contentId, issue) => {
  try {
    await addDoc(collection(db, 'contentReports'), { contentId, issue, reportedAt: new Date() });
    console.log('Content reported successfully');
  } catch (error) {
    console.error('Error reporting content:', error);
    throw new Error('Failed to report content');
  }
};

// Fetch all users
app.get('/api/moderation/users', async (req, res) => {
  try {
    const users = await getAllUsersFromDatabase(); // Changed from accounts to users
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Fetch specific user details
app.get('/api/moderation/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await getUserDetails(userId); // Changed from account to user
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user details' });
  }
});

// Update specific user details
app.put('/api/moderation/user/:id', async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    await updateUserDetails(userId, updatedData); // Changed from account to user
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user details' });
  }
});

// Delete or deactivate a user
app.delete('/api/moderation/user/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    await deleteUser(userId); // Changed from account to user
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Report a user
app.post('/api/moderation/user/:id/report', async (req, res) => {
  const userId = req.params.id;
  const issue = req.body.issue;
  try {
    await reportUser(userId, issue); // Changed from account to user
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to report user' });
  }
});

// Fetch all recordings for a user
app.get('/api/moderation/user/:id/recordings', async (req, res) => {
  const userId = req.params.id;
  try {
    const recordings = await getUserRecordings(userId); // Changed from account to user
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recordings' });
  }
});

// Fetch all messages for a user
app.get('/api/moderation/user/:id/messages', async (req, res) => {
  const userId = req.params.id;
  try {
    const messages = await getUserMessages(userId); // Changed from account to user
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Report specific content (recording or message)
app.post('/api/moderation/content/:contentId/report', async (req, res) => {
  const contentId = req.params.contentId;
  const issue = req.body.issue;
  try {
    await reportContent(contentId, issue);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to report content' });
  }
});

// Endpoint to fetch instructors data
app.get('/api/instructors', async (req, res) => {
  try {
    const instructors = [
      {
        name: "Instructor A",
        subject: "Math",
        gradesTaught: "1,2,3"
      },
      {
        name: "Instructor B",
        subject: "English",
        gradesTaught: "4,5,6"
      }
    ];    
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch instructors data' });
  }
});

// Endpoint to fetch course materials
app.get('/api/course-materials', async (req, res) => {
  try {
    const courseMaterials = [
      { id: 1, title: 'Course Material 1', description: 'Description of course material 1' },
      { id: 2, title: 'Course Material 2', description: 'Description of course material 2' },
      { id: 3, title: 'Course Material 3', description: 'Description of course material 3' }
    ];
    res.json(courseMaterials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course materials' });
  }
});

//Teacher edit page's endpoints: 
//fetch teacher info
app.get('/api/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;
  try {
      const teacherDoc = await getDoc(doc(db, 'teachers', teacherId));
      if (teacherDoc.exists()) {
          res.json(teacherDoc.data());
      } else {
          res.status(404).json({ error: 'Teacher not found' });
      }
  } catch (error) {
      console.error('Error fetching teacher information:', error);
      res.status(500).json({ error: 'Failed to fetch teacher information' });
  }
});

// Update teacher information
app.put('/api/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;
  const updatedData = req.body;
  try {
      await updateDoc(doc(db, 'teachers', teacherId), updatedData);
      res.json({ success: true });
  } catch (error) {
      console.error('Error updating teacher information:', error);
      res.status(500).json({ error: 'Failed to update teacher information' });
  }
});

// Fetch teacher's post history
app.get('/api/teachers/:id/post-history', async (req, res) => {
  const teacherId = req.params.id;
  try {
      const postHistorySnapshot = await getDocs(collection(db, 'teachers', teacherId, 'postHistory'));
      const postHistory = postHistorySnapshot.docs.map(doc => doc.data());
      res.json(postHistory);
  } catch (error) {
      console.error('Error fetching post history:', error);
      res.status(500).json({ error: 'Failed to fetch post history' });
  }
});

// Fetch teacher's communication history
app.get('/api/teachers/:id/communication-history', async (req, res) => {
  const teacherId = req.params.id;
  try {
      const communicationSnapshot = await getDocs(collection(db, 'teachers', teacherId, 'communicationHistory'));
      const communicationHistory = communicationSnapshot.docs.map(doc => doc.data());
      res.json(communicationHistory);
  } catch (error) {
      console.error('Error fetching communication history:', error);
      res.status(500).json({ error: 'Failed to fetch communication history' });
  }
});

// Fetch teacher's students
app.get('/api/teachers/:id/students', async (req, res) => {
  const teacherId = req.params.id;
  try {
      const studentsSnapshot = await getDocs(collection(db, 'teachers', teacherId, 'students'));
      const students = studentsSnapshot.docs.map(doc => doc.data());
      res.json(students);
  } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Delete teacher account
app.delete('/api/teachers/:id', async (req, res) => {
  const teacherId = req.params.id;
  try {
      await deleteDoc(doc(db, 'teachers', teacherId));
      res.json({ success: true });
  } catch (error) {
      console.error('Error deleting teacher account:', error);
      res.status(500).json({ error: 'Failed to delete teacher account' });
  }
});

// Report teacher account
app.post('/api/teachers/:id/report', async (req, res) => {
  const teacherId = req.params.id;
  const issue = req.body.issue;
  try {
      await addDoc(collection(db, 'reports'), { teacherId, issue, reportedAt: new Date() });
      res.json({ success: true });
  } catch (error) {
      console.error('Error reporting teacher account:', error);
      res.status(500).json({ error: 'Failed to report teacher account' });
  }
});

// Student edit page for admin 

// Fetch student information
app.get('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
      const studentDoc = await getDoc(doc(db, 'students', studentId));
      if (studentDoc.exists()) {
          res.json(studentDoc.data());
      } else {
          res.status(404).json({ error: 'Student not found' });
      }
  } catch (error) {
      console.error('Error fetching student information:', error);
      res.status(500).json({ error: 'Failed to fetch student information' });
  }
});

// Update student information
app.put('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;
  try {
      await updateDoc(doc(db, 'students', studentId), updatedData);
      res.json({ success: true });
  } catch (error) {
      console.error('Error updating student information:', error);
      res.status(500).json({ error: 'Failed to update student information' });
  }
});

// Fetch student's assignment history
app.get('/api/students/:id/assignments', async (req, res) => {
  const studentId = req.params.id;
  try {
      const assignmentsSnapshot = await getDocs(collection(db, 'students', studentId, 'assignments'));
      const assignments = assignmentsSnapshot.docs.map(doc => doc.data());
      res.json(assignments);
  } catch (error) {
      console.error('Error fetching assignment history:', error);
      res.status(500).json({ error: 'Failed to fetch assignment history' });
  }
});

// Fetch student's communication history
app.get('/api/students/:id/communications', async (req, res) => {
  const studentId = req.params.id;
  try {
      const communicationsSnapshot = await getDocs(collection(db, 'students', studentId, 'communications'));
      const communications = communicationsSnapshot.docs.map(doc => doc.data());
      res.json(communications);
  } catch (error) {
      console.error('Error fetching communication history:', error);
      res.status(500).json({ error: 'Failed to fetch communication history' });
  }
});

// Fetch student's courses
app.get('/api/students/:id/courses', async (req, res) => {
  const studentId = req.params.id;
  try {
      const coursesSnapshot = await getDocs(collection(db, 'students', studentId, 'courses'));
      const courses = coursesSnapshot.docs.map(doc => doc.data());
      res.json(courses);
  } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Fetch instructor for a specific student
app.get('/api/students/:id/instructor', async (req, res) => {
  const studentId = req.params.id;
  try {
      const instructorDoc = await getDoc(doc(db, 'students', studentId, 'instructor'));
      if (instructorDoc.exists()) {
          res.json(instructorDoc.data());
      } else {
          res.status(404).json({ error: 'Instructor not found' });
      }
  } catch (error) {
      console.error('Error fetching instructor:', error);
      res.status(500).json({ error: 'Failed to fetch instructor' });
  }
});

// Delete student account
app.delete('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
      await deleteDoc(doc(db, 'students', studentId));
      res.json({ success: true });
  } catch (error) {
      console.error('Error deleting student account:', error);
      res.status(500).json({ error: 'Failed to delete student account' });
  }
});

// Report student account
app.post('/api/students/:id/report', async (req, res) => {
  const studentId = req.params.id;
  const issue = req.body.issue;
  try {
      await addDoc(collection(db, 'reports'), { studentId, issue, reportedAt: new Date() });
      res.json({ success: true });
  } catch (error) {
      console.error('Error reporting student account:', error);
      res.status(500).json({ error: 'Failed to report student account' });
  }
});

//Report instructor
app.post('/api/students/:id/report-instructor', async (req, res) => {
  const studentId = req.params.id;
  const issue = req.body.issue;
  try {
      await addDoc(collection(db, 'instructorReports'), { studentId, issue, reportedAt: new Date() });
      res.json({ success: true });
  } catch (error) {
      console.error('Error reporting instructor:', error);
      res.status(500).json({ error: 'Failed to report instructor' });
  }
});

// Endpoint to fetch chatroom monitor data
app.get('/api/chatroom-monitor', async (req, res) => {
  try {
    const chatroomMonitor = {
      monitorA: 'Chatroom Monitor A Info',
      monitorB: 'Chatroom Monitor B Info',
      monitorC: 'Chatroom Monitor C Info',
      monitorD: 'Chatroom Monitor D Info'
    };
    res.json(chatroomMonitor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chatroom monitor data' });
  }
});

// Fetch all students' data
app.get('/api/students', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const students = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students data' });
  }
});

// Fetch specific student's data
app.get('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const studentDoc = await getDoc(doc(db, 'students', studentId));
    if (studentDoc.exists()) {
      res.json(studentDoc.data());
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student data' });
  }
});

// Update specific student's grade and comment
app.put('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const { grade, comment } = req.body;
  try {
    await updateDoc(doc(db, 'students', studentId), { grade, comment });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student data' });
  }
});

// Endpoint to set teacher availability on Calendly
app.post('/api/set-availability', async (req, res) => {
  const { eventName, startDate, endDate } = req.body;
  try {
    const schedulingUrl = await getSchedulingLink(eventName);
    // Assume we have a function to set availability on Calendly
    await axios.post(schedulingUrl, {
      start: startDate, 
      end: endDate
    });
    res.json({ success: true});
  } catch (error) {
    res.status(500).json({ error: 'Failed to set availability on Calendly' });
  }
});

// Endpoint to handle course requests (leave or change)
app.post('/api/teacher/course-request', async (req, res) => {
  const { teacherId, courseId, requestType } = req.body;  // 'requestType' can be 'leave' or 'change'
  try {
    await addDoc(collection(db, 'course-requests'), { teacherId, courseId, requestType });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit course request' });
  }
});

// Endpoint to fetch the student gradebook for a specific class
app.get('/api/teacher/gradebook', async (req, res) => {
  const { classId } = req.query;
  try {
    const gradebookSnapshot = await getDocs(collection(db, 'gradebooks', classId, 'students'));
    const gradebook = gradebookSnapshot.docs.map(doc => doc.data());
    res.json(gradebook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gradebook' });
  }
});

// Endpoint to fetch student post history
app.get('/api/teacher/post-history', async (req, res) => {
  const { studentId } = req.query;
  try {
    const postHistorySnapshot = await getDocs(collection(db, 'students', studentId, 'posts'));
    const postHistory = postHistorySnapshot.docs.map(doc => doc.data());
    res.json(postHistory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student post history' });
  }
});

// Endpoint to fetch reported students
app.get('/api/teacher/reported-students', async (req, res) => {
  try {
    const reportedStudentsSnapshot = await getDocs(collection(db, 'reported-students'));
    const reportedStudents = reportedStudentsSnapshot.docs.map(doc => doc.data());
    res.json(reportedStudents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reported students' });
  }
});

// Example endpoint to send a message to the administrator
app.post('/api/contact-admin', async (req, res) => {
  const { teacherId, message } = req.body;
  try {
    await addDoc(collection(db, 'admin-messages'), { teacherId, message });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message to admin' });
  }
});

// Endpoint to fetch course materials
app.get('/api/course-materials', async (req, res) => {
  try {
    const courseMaterials = [
      { id: 1, title: 'Course Material 1', description: 'Description of course material 1' },
      { id: 2, title: 'Course Material 2', description: 'Description of course material 2' },
      { id: 3, title: 'Course Material 3', description: 'Description of course material 3' }
    ];
    res.json(courseMaterials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course materials' });
  }
});

// Example endpoint to fetch rules and agreements
app.get('/api/rules-agreements', async (req, res) => {
  try {
    const rulesAgreements = await getDocs(collection(db, 'rules-agreements'));
    res.json(rulesAgreements.docs.map(doc => doc.data()));
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rules and agreements' });
  }
});

// Fetch teacher preferences
app.get('/api/teacher/preferences', async (req, res) => {
  const { teacherId } = req.query;
  try {
    const preferencesDoc = await getDoc(doc(db, 'teachers', teacherId, 'preferences'));
    if (preferencesDoc.exists()) {
      res.json(preferencesDoc.data());
    } else {
      res.status(404).json({ error: 'Preferences not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch preferences' });
  }
});

// Update teacher preferences
app.put('/api/teacher/preferences', async (req, res) => {
  const { teacherId, preferences } = req.body;
  try {
    await setDoc(doc(db, 'teachers', teacherId, 'preferences'), preferences);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update preferences' });
  }
});

app.post('/api/meetings/schedule', async (req, res) => {
  const { teacherId, studentId, date, startTime, endTime, reason } = req.body;
  try {
    const newMeeting = {
      teacherId,
      studentId,
      date,
      startTime,
      endTime,
      reason,
      status: 'scheduled'
    };
    const docRef = await addDoc(collection(db, 'meetings'), newMeeting);
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule meeting' });
  }
});

app.put('/api/meetings/reschedule/:id', async (req, res) => {
  const meetingId = req.params.id;
  const { date, startTime, endTime, reason } = req.body;
  try {
    await updateDoc(doc(db, 'meetings', meetingId), {
      date,
      startTime,
      endTime,
      reason,
      status: 'rescheduled'
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reschedule meeting' });
  }
});

app.delete('/api/meetings/cancel/:id', async (req, res) => {
  const meetingId = req.params.id;
  try {
    await updateDoc(doc(db, 'meetings', meetingId), { status: 'canceled' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel meeting' });
  }
});


app.get('/api/test-cal', async (req, res) => {
  try {
    const userData = await getCalendlyUser();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Calendly user' });
  }
});

app.get('/api/meetings', async (req, res) => {
  const { teacherId } = req.query;
  try {
    const meetingsSnapshot = await getDocs(collection(db, 'meetings'), where('teacherId', '==', teacherId));
    const meetings = meetingsSnapshot.docs.map(doc => doc.data());
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
});


app.get('/api/list-event-types', async (req, res) => {
  try {
    const user = await getCalendlyUser();
    const eventTypes = await listEventTypes(user.uri);
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list event types' });
  }
});

// Get scheduling link for a specific event type
app.post('/api/schedule-consultation', async (req, res) => {
  const { eventName } = req.body;
  try {
    const schedulingUrl = await getSchedulingLink(eventName);
    res.json({ schedulingUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get scheduling link' });
  }
});

const toDoListData = [
  { id: 1, task: 'Decimal Practices #1-3', dueDate: '2023-06-18' },
  { id: 2, task: 'Fraction Multiplication', dueDate: '2023-06-22' },
  { id: 2, task: 'Textbook chapter 1 -3', dueDate: '2023-06-30' },
];

const recordingsData = [
  { id: 1, title: 'Recording 1: TITLE', date: '2023-06-22', url: 'https://example.com/recording1' },
  { id: 2, title: 'Recording 2: TITLE', date: '2023-06-25', url: 'https://example.com/recording2' },
];

// Mock data for progress and account
const progressData = {
  assignmentsDone: 10,
  assignmentsInProgress: 2,
  averageProgress: 84,
  grades: 'A',
  comments: 'Great work! Keep it up!'
};


// Endpoint to fetch progress data
app.get('/api/progress-data', (req, res) => {
  res.json(progressData);
});

// Endpoint to fetch account data
app.get('/api/account-data', (req, res) => {
  res.json(accountData);
});

// Endpoint to fetch to-do list data
app.get('/api/todo-list', (req, res) => {
  res.json(toDoListData);
});

// Endpoint to fetch recordings data
app.get('/api/recordings', (req, res) => {
  res.json(recordingsData);
});

app.get('/api/progress-data', (req, res) => {
  res.json(progressData);
});

// Endpoint to assign homework with answer key
app.post('/api/homework', async (req, res) => {
  const { title, dueDate, points, questions } = req.body; // 'questions' includes the answer key
  try {
    const docRef = await addDoc(collection(db, 'homework'), { title, dueDate, points, questions });
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign homework' });
  }
});

// Endpoint to submit homework answers
app.post('/api/homework/:id/submit', async (req, res) => {
  const homeworkId = req.params.id;
  const { studentId, answers } = req.body;
  try {
    // Fetch the homework with answer key
    const homeworkDoc = await getDoc(doc(db, 'homework', homeworkId));
    if (!homeworkDoc.exists()) {
      return res.status(404).json({ error: 'Homework not found' });
    }
    const homework = homeworkDoc.data();

    // Compare student answers with the answer key
    const feedback = answers.map((answer, index) => {
      const correctAnswer = homework.questions[index].answer;
      return {
        question: homework.questions[index].question,
        studentAnswer: answer,
        correctAnswer,
        correct: answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase(),
      };
    });

    // Store the student's submission and feedback
    await setDoc(doc(db, 'homework_submissions', `${homeworkId}_${studentId}`), { homeworkId, studentId, answers, feedback });

    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit homework' });
  }
});

// Update specific student's grade and comment
app.put('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const { grade, comment } = req.body;
  try {
    await updateDoc(doc(db, 'students', studentId), { grade, comment });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student data' });
  }
});

// Endpoint to fetch all homework
app.get('/api/homework', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'homework'));
    const homework = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(homework);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch homework data' });
  }
});

// Endpoint to fetch specific student's homework
app.get('/api/homework/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const homeworkDoc = await getDoc(doc(db, 'homework', studentId));
    if (homeworkDoc.exists()) {
      res.json(homeworkDoc.data());
    } else {
      res.status(404).json({ error: 'Homework not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch homework data' });
  }
});

// Endpoint to update specific student's homework
app.put('/api/homework/:id', async (req, res) => {
  const studentId = req.params.id;
  const { assignments } = req.body;
  try {
    await updateDoc(doc(db, 'homework', studentId), { assignments });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update homework data' });
  }
});

// Endpoint to fetch progress data
app.get('/api/progress/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const progressDoc = await getDoc(doc(db, 'progress', studentId));
    if (progressDoc.exists()) {
      res.json(progressDoc.data());
    } else {
      res.status(404).json({ error: 'Progress data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress data' });
  }
});

// Endpoint to update progress data
app.put('/api/progress/:id', async (req, res) => {
  const studentId = req.params.id;
  const { assignmentsDone, assignmentsInProgress, averageProgress } = req.body;
  try {
    await updateDoc(doc(db, 'progress', studentId), { assignmentsDone, assignmentsInProgress, averageProgress });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress data' });
  }
});

// Endpoint to fetch grades data
app.get('/api/grades/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const gradesDoc = await getDoc(doc(db, 'grades', studentId));
    if (gradesDoc.exists()) {
      res.json(gradesDoc.data());
    } else {
      res.status(404).json({ error: 'Grades data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grades data' });
  }
});

// Endpoint to update grades data
app.put('/api/grades/:id', async (req, res) => {
  const studentId = req.params.id;
  const { grade } = req.body;
  try {
    await updateDoc(doc(db, 'grades', studentId), { grade });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grades data' });
  }
});

// Endpoint to post new recordings
app.post('/api/recordings', async (req, res) => {
  const { title, date, url } = req.body;
  try {
    const docRef = await addDoc(collection(db, 'recordings'), { title, date, url });
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add recording' });
  }
});

// Endpoint to fetch recordings data
app.get('/api/recordings', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'recordings'));
    const recordings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recordings data' });
  }
});


/**
 * Function to handle retries for Axios requests with exponential backoff.
 * @param {Object} axiosConfig - The Axios request configuration.
 * @param {number} retries - Number of retries before failing.
 * @param {number} initialBackoff - Initial backoff time in milliseconds.
 * @returns {Promise<Object>} - The Axios response.
 */
const retryAxios = async (axiosConfig, retries = 5, initialBackoff = 3000) => {
  let backoff = initialBackoff;

  for (let i = 0; i < retries; i++) {
    try {
      return await axios(axiosConfig);
    } catch (error) {
      // Handle 429 Too Many Requests error with backoff
      if (error.response && error.response.status === 429) {
        console.log(`Retry attempt ${i + 1} after ${backoff}ms due to 429 Too Many Requests error.`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2; // Exponential backoff
      } else {
        console.error('Axios request failed:', error.message);
        throw error;
      }
    }
  }
  throw new Error('Exceeded maximum retries due to 429 Too Many Requests error.');
};

// Sample diagnostic questions
const questions = [
  { id: 1, question: 'What is 2 + 2?', correctAnswer: '4' },
  { id: 2, question: 'What is the capital of France?', correctAnswer: 'Paris' },
  { id: 3, question: 'Solve for x in the equation 3x + 2 = 11.', correctAnswer: '3' },
  { id: 4, question: 'What is the square root of 64?', correctAnswer: '8' },
];

// Mock data for progress and account


const accountData = {
  totalCredits: 20,
  creditsEarned: 20,
  creditsLeft: 0,
  creditsLog: [
    { date: '2023-01-15', creditsEarned: 3, course: 'Math 101', description: 'Completed Math 101' },
    { date: '2023-02-20', creditsEarned: 3, course: 'History 201', description: 'Completed History 201' },
    { date: '2023-03-10', creditsEarned: 3, course: 'Science 301', description: 'Completed Science 301' },
    { date: '2023-04-15', creditsEarned: 3, course: 'Literature 401', description: 'Completed Literature 401' },
    { date: '2023-05-20', creditsEarned: 4, course: 'Art 101', description: 'Completed Art 101' },
    { date: '2023-06-25', creditsEarned: 4, course: 'Computer Science 101', description: 'Completed Computer Science 101' },
  ],
  grades: [
    { course: 'Math 101', grade: 'A' },
    { course: 'History 201', grade: 'B+' },
    { course: 'Science 301', grade: 'A-' },
    { course: 'Literature 401', grade: 'B' },
    { course: 'Art 101', grade: 'A' },
    { course: 'Computer Science 101', grade: 'A-' },
  ],
  notesHistory: ['2023-07-01: Note 1', '2023-07-02: Note 2'],
  calendlyLink: 'https://calendly.com/your-link',
};

/**
 * Function to get package details based on user type
 * @param {string} userType - The type of user ('student' or 'non-student')
 * @returns {Object} - An instance of the corresponding package class
 */
const getPackageDetails = (userType) => {
  if (userType === 'student') {
    return new StudentPackage();
  } else if (userType === 'non-student') {
    return new NonStudentPackage();
  } else {
    throw new Error('Invalid user type');
  }
};

// Endpoint to fetch diagnostic questions
app.get('/api/diagnostic-questions', (req, res) => {
  res.json({ questions });
});

// Endpoint to fetch package details and schedule a consultation if applicable
app.get('/api/package/:userType', async (req, res) => {
  try {
    const userType = req.params.userType;
    const userPackage = getPackageDetails(userType);

    // If the package includes a consultation, provide the scheduling link
    if (userPackage.consultationCall === 'Included') {
      const schedulingUrl = await getSchedulingLink('Consultation');
      res.json({ ...userPackage, schedulingUrl });
    } else {
      res.json(userPackage);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


/**
 * Endpoint to submit diagnostic answers and generate analysis using OpenAI API.
 */
app.post('/api/submit-diagnostic', async (req, res) => {
  const { answers } = req.body;

  let correctCount = 0;
  answers.forEach((answer, index) => {
    if (answer.answer.trim().toLowerCase() === questions[index].correctAnswer.trim().toLowerCase()) {
      correctCount++;
    }
  });

  const prompt = `Analyze the following answers and provide feedback:\n\n${answers.map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n')}`;

  try {
    const response = await retryAxios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const analysis = response.data.choices[0].message.content.trim();
    res.json({ analysis, correctCount, totalQuestions: questions.length });
  } catch (error) {
    console.error('Error generating analysis:', error);
    res.status(500).json({ error: 'Failed to generate analysis' });
  }
});


//admin connection page endpoints

// Endpoint to fetch current connections
app.get('/api/connections', async (req, res) => {
  try {
      const connectionsSnapshot = await getDocs(collection(db, 'connections'));
      const connections = connectionsSnapshot.docs.map(doc => doc.data());
      res.json(connections);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch connections' });
  }
});

// Endpoint to fetch managed students and teachers
app.get('/api/managed-entities', async (req, res) => {
  try {
      const managedStudentsSnapshot = await getDocs(collection(db, 'students'));
      const managedTeachersSnapshot = await getDocs(collection(db, 'teachers'));
      
      const managedStudents = managedStudentsSnapshot.docs.map(doc => doc.data());
      const managedTeachers = managedTeachersSnapshot.docs.map(doc => doc.data());
      
      res.json({ students: managedStudents, teachers: managedTeachers });
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch managed entities' });
  }
});

// Endpoint to establish a new connection
app.post('/api/connections', async (req, res) => {
  const { instructorId, studentId } = req.body;
  try {
      const newConnection = {
          instructorId,
          studentId,
          status: 'Pending', // Initially set to pending
          createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'connections'), newConnection);
      res.json({ success: true, id: docRef.id });
  } catch (error) {
      res.status(500).json({ error: 'Failed to establish connection' });
  }
});

// Endpoint to update an existing connection
app.put('/api/connections/:id', async (req, res) => {
  const connectionId = req.params.id;
  const { status } = req.body;
  try {
      await updateDoc(doc(db, 'connections', connectionId), { status });
      res.json({ success: true });
  } catch (error) {
      res.status(500).json({ error: 'Failed to update connection' });
  }
});

// Endpoint to terminate an active connection
app.put('/api/connections/:id/terminate', async (req, res) => {
  const connectionId = req.params.id;
  try {
      await updateDoc(doc(db, 'connections', connectionId), { status: 'Terminated' });
      res.json({ success: true });
  } catch (error) {
      res.status(500).json({ error: 'Failed to terminate connection' });
  }
});

// Endpoint to remove a terminated connection
app.delete('/api/connections/:id', async (req, res) => {
  const connectionId = req.params.id;
  try {
      await deleteDoc(doc(db, 'connections', connectionId));
      res.json({ success: true });
  } catch (error) {
      res.status(500).json({ error: 'Failed to remove connection' });
  }
});

// Endpoint to report a problem with a connection
app.post('/api/connections/:id/report', async (req, res) => {
  const connectionId = req.params.id;
  const { issue } = req.body;
  try {
      const report = {
          connectionId,
          issue,
          reportedAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'connection-reports'), report);
      res.json({ success: true });
  } catch (error) {
      res.status(500).json({ error: 'Failed to report connection issue' });
  }
});

/**
 * Endpoint to generate personalized learning plan based on diagnostic results using OpenAI API.
 */
app.post('/api/personalized-learning-plan', async (req, res) => {
  const { answers, correctCount, totalQuestions } = req.body;

  const prompt = `Based on the following answers, generate a personalized learning plan. The student answered ${correctCount} out of ${totalQuestions} questions correctly.\n\n${answers.map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n')}\n\nProvide detailed topics, resources, and example problems to help the student improve. Format the response as a JSON object with "subject", "topics", "resources", and "exampleProblems".`;

  try {
    const response = await retryAxios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    let learningPlan = response.data.choices[0].message.content.trim();

    // Attempt to parse the JSON response
    try {
      learningPlan = JSON.parse(learningPlan);
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      return res.status(500).json({ error: 'Failed to parse learning plan' });
    }

    res.json({ learningPlan });
  } catch (error) {
    console.error('Error generating learning plan:', error);
    res.status(500).json({ error: 'Failed to generate learning plan' });
  }
});

// Endpoint to fetch progress data
app.get('/api/progress-data', (req, res) => {
  res.json(progressData);
});

// Endpoint to fetch account data
app.get('/api/account-data', (req, res) => {
  res.json(accountData);
});

/**
 * Endpoint to generate personalized study plan based on problem type using OpenAI API.
 */
app.post('/api/study-plan', async (req, res) => {
  const { problemType } = req.body;

  // Extract number of problems and problem type from user input
  const parseUserInput = (input) => {
    const regex = /(\d+)\s+sample problems\s+for\s+(.+)/i;
    const match = input.match(regex);

    if (match) {
      return {
        numProblems: parseInt(match[1], 10),
        problemType: match[2].trim(),
      };
    }

    return {
      numProblems: 1, // Default to 1 problem if not specified
      problemType: input.trim(), // Use the whole input as the problem type
    };
  };

  const { numProblems, problemType: parsedProblemType } = parseUserInput(problemType);

  const prompt = `Generate ${numProblems} sample problems for ${parsedProblemType}. Provide detailed and specific problems suitable for the specified grade.`;

  try {
    const response = await retryAxios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const studyPlan = response.data.choices[0].message.content.trim();
    res.json({ studyPlan });
  } catch (error) {
    console.error('Error generating study plan:', error);
    res.status(500).json({ error: 'Failed to generate study plan' });
  }
});

/**
 * Endpoint to save the generated study plan to Firestore.
 */
app.post('/api/save-study-plan', async (req, res) => {
  const { studyPlan } = req.body;

  try {
    const docRef = await addDoc(collection(db, 'studyPlans'), { studyPlan });
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving study plan:', error);
    res.status(500).json({ error: 'Failed to save study plan' });
  }
});

// Test endpoint to ensure server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;