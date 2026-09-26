import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocFromServer,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Firestore (using custom database ID from config if present)
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Test connection on boot per Firebase skill guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline or initial connection is initializing:', error.message);
    }
  }
}
testConnection();

// Sign In with Google
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Sync or create user profile in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        displayName: user.displayName || 'Candidate',
        email: user.email || '',
        photoURL: user.photoURL || '',
        college: 'IIT Delhi (B.Tech CSE)',
        batch: '2026',
        targetTrack: 'Tier-1 SDE-1 (Google/Amazon)',
        readinessScore: 84.6,
        streakCount: 19,
        lastActiveDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    return user;
  } catch (error: any) {
    console.error('Google Sign-in error:', error);
    throw error;
  }
}

// Sign Out
export async function logoutUser() {
  await signOut(auth);
}

// User Profile in Firestore
export interface StoredUserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  college: string;
  batch: string;
  targetTrack: string;
  readinessScore: number;
  streakCount: number;
  lastActiveDate: string;
}

export async function getUserProfile(uid: string): Promise<StoredUserProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
      return docSnap.data() as StoredUserProfile;
    }
    return null;
  } catch (err) {
    console.error('Error fetching user profile:', err);
    return null;
  }
}

export async function saveInterviewSession(
  uid: string,
  sessionData: {
    track: string;
    company: string;
    overallScore: number;
    technicalScore: number;
    communicationScore: number;
    problemSolved: string;
    transcriptSummary: string;
    barRaiserVerdict: string;
    durationMinutes: number;
  }
) {
  try {
    const sessionId = `session_${Date.now()}`;
    const sessionRef = doc(db, 'users', uid, 'sessions', sessionId);
    await setDoc(sessionRef, {
      id: sessionId,
      userId: uid,
      ...sessionData,
      createdAt: new Date().toISOString(),
    });
    return sessionId;
  } catch (err) {
    console.error('Error saving interview session:', err);
    return null;
  }
}

export async function saveCodeSubmission(
  uid: string,
  submissionData: {
    problemTitle: string;
    language: string;
    code: string;
    status: string;
    runtimeMs: number;
    memoryMb: number;
    timeComplexity: string;
    spaceComplexity: string;
  }
) {
  try {
    const submissionId = `sub_${Date.now()}`;
    const subRef = doc(db, 'users', uid, 'submissions', submissionId);
    await setDoc(subRef, {
      id: submissionId,
      userId: uid,
      ...submissionData,
      createdAt: new Date().toISOString(),
    });
    return submissionId;
  } catch (err) {
    console.error('Error saving code submission:', err);
    return null;
  }
}

export { onAuthStateChanged };
export type { FirebaseUser };
