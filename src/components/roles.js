// src/utils/roles.js
import { doc, getDoc } from 'firebase/firestore';
import { db } from '.././firebaseConfig.js'; // Make sure you import your Firestore config

export const getRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    } else {
      throw new Error('User document does not exist');
    }
  } catch (error) {
    console.error('Error fetching role:', error);
    return null;
  }
};