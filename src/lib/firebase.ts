import {
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  addDoc,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { QuizSet, Paper, Note, Video } from '@/data/mockData';

// Firestore collection names — each maps 1:1 to what used to be an
// AsyncStorage key.
const COLLECTIONS = {
  QUIZZES: 'quizzes',
  PAPERS: 'papers',
  NOTES: 'notes',
  VIDEOS: 'videos',
};

// ─── Quizzes ──────────────────────────────────────────────────
export async function loadQuizzes(): Promise<QuizSet[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.QUIZZES));
    return snap.docs.map((d) => d.data() as QuizSet);
  } catch {
    return [];
  }
}

export async function saveQuiz(quiz: QuizSet): Promise<void> {
  await setDoc(doc(db, COLLECTIONS.QUIZZES, quiz.id), quiz);
}

export async function deleteQuiz(id: string): Promise<void> {
  await deleteDoc(doc(db, COLLECTIONS.QUIZZES, id));
}

// ─── Papers ───────────────────────────────────────────────────
export async function loadPapers(): Promise<Paper[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.PAPERS));
    return snap.docs.map((d) => d.data() as Paper);
  } catch {
    return [];
  }
}

export async function savePaper(paper: Paper): Promise<void> {
  if (paper.id) {
    await setDoc(doc(db, COLLECTIONS.PAPERS, paper.id), paper);
  } else {
    const ref = await addDoc(collection(db, COLLECTIONS.PAPERS), paper);
    await setDoc(ref, { ...paper, id: ref.id });
  }
}

// ─── Notes ────────────────────────────────────────────────────
export async function loadNotes(): Promise<Note[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.NOTES));
    return snap.docs.map((d) => d.data() as Note);
  } catch {
    return [];
  }
}

export async function saveNote(note: Note): Promise<void> {
  if (note.id) {
    await setDoc(doc(db, COLLECTIONS.NOTES, note.id), note);
  } else {
    const ref = await addDoc(collection(db, COLLECTIONS.NOTES), note);
    await setDoc(ref, { ...note, id: ref.id });
  }
}

// ─── Videos ───────────────────────────────────────────────────
export async function loadVideos(): Promise<Video[]> {
  try {
    const snap = await getDocs(collection(db, COLLECTIONS.VIDEOS));
    return snap.docs.map((d) => d.data() as Video);
  } catch {
    return [];
  }
}

export async function saveVideo(video: Video): Promise<void> {
  if (video.id) {
    await setDoc(doc(db, COLLECTIONS.VIDEOS, video.id), video);
  } else {
    const ref = await addDoc(collection(db, COLLECTIONS.VIDEOS), video);
    await setDoc(ref, { ...video, id: ref.id });
  }
}
