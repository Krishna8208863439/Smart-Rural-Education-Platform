"use client";

import { create } from "zustand";

export interface QuizRecord {
  courseId: string;
  chapterId: string;
  chapterTitle: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  quiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export interface TeacherStudent {
  id: string;
  name: string;
  rollNo: string;
  attendance: string;
  avgScore: number;
  offlineDownloads: number;
  lastActive: string;
}

export interface GeneratedPaperRecord {
  id: string;
  title: string;
  grade: string;
  subject: string;
  totalMarks: number;
  timeLimit: string;
  createdAt: string;
  sections: {
    name: string;
    marks: string;
    questions: string[];
  }[];
}

interface DataState {
  downloadedCourseIds: string[];
  completedChapterIds: string[];
  quizRecords: QuizRecord[];
  tutorMessages: ChatMessage[];
  teacherStudents: TeacherStudent[];
  generatedPapers: GeneratedPaperRecord[];
  isHydrated: boolean;

  // Actions
  initializeData: () => void;
  toggleCourseDownload: (courseId: string) => void;
  markChapterCompleted: (chapterId: string) => void;
  saveQuizRecord: (record: QuizRecord) => void;
  saveTutorMessage: (message: ChatMessage) => void;
  clearTutorHistory: () => void;
  updateStudentScore: (studentId: string, newScore: number) => void;
  addTeacherStudent: (student: TeacherStudent) => void;
  saveGeneratedPaper: (paper: GeneratedPaperRecord) => void;
}

const DEFAULT_STUDENTS: TeacherStudent[] = [
  { id: "st-1", name: "Aarav Kumar (आरव)", rollNo: "1001", attendance: "96%", avgScore: 88, offlineDownloads: 14, lastActive: "Today, 10:15 AM" },
  { id: "st-2", name: "Priya Sharma (प्रिया)", rollNo: "1002", attendance: "94%", avgScore: 92, offlineDownloads: 18, lastActive: "Today, 09:30 AM" },
  { id: "st-3", name: "Ramesh Patel (रमेश)", rollNo: "1003", attendance: "85%", avgScore: 74, offlineDownloads: 9, lastActive: "Yesterday" },
  { id: "st-4", name: "Sunita Yadav (सुनीता)", rollNo: "1004", attendance: "98%", avgScore: 90, offlineDownloads: 22, lastActive: "Today, 11:00 AM" },
  { id: "st-5", name: "Vikram Singh (विक्रम)", rollNo: "1005", attendance: "80%", avgScore: 68, offlineDownloads: 6, lastActive: "2 days ago" }
];

export const useDataStore = create<DataState>((set, get) => ({
  downloadedCourseIds: ["sc-10-01"],
  completedChapterIds: [],
  quizRecords: [],
  tutorMessages: [],
  teacherStudents: DEFAULT_STUDENTS,
  generatedPapers: [],
  isHydrated: false,

  initializeData: () => {
    if (typeof window === "undefined") return;

    try {
      const storedDownloads = localStorage.getItem("shiksha_downloaded_courses");
      const storedCompleted = localStorage.getItem("shiksha_completed_chapters");
      const storedQuizzes = localStorage.getItem("shiksha_quiz_records");
      const storedTutor = localStorage.getItem("shiksha_tutor_messages");
      const storedStudents = localStorage.getItem("shiksha_teacher_students");
      const storedPapers = localStorage.getItem("shiksha_generated_papers");

      set({
        downloadedCourseIds: storedDownloads ? JSON.parse(storedDownloads) : ["sc-10-01"],
        completedChapterIds: storedCompleted ? JSON.parse(storedCompleted) : [],
        quizRecords: storedQuizzes ? JSON.parse(storedQuizzes) : [],
        tutorMessages: storedTutor ? JSON.parse(storedTutor) : [],
        teacherStudents: storedStudents ? JSON.parse(storedStudents) : DEFAULT_STUDENTS,
        generatedPapers: storedPapers ? JSON.parse(storedPapers) : [],
        isHydrated: true
      });
    } catch (e) {
      console.error("Error loading persisted ShikshaSetu data from localStorage:", e);
      set({ isHydrated: true });
    }
  },

  toggleCourseDownload: (courseId: string) => {
    const current = get().downloadedCourseIds;
    const exists = current.includes(courseId);
    const updated = exists ? current.filter((id) => id !== courseId) : [...current, courseId];
    
    if (typeof window !== "undefined") {
      localStorage.setItem("shiksha_downloaded_courses", JSON.stringify(updated));
    }
    set({ downloadedCourseIds: updated });
  },

  markChapterCompleted: (chapterId: string) => {
    const current = get().completedChapterIds;
    if (!current.includes(chapterId)) {
      const updated = [...current, chapterId];
      if (typeof window !== "undefined") {
        localStorage.setItem("shiksha_completed_chapters", JSON.stringify(updated));
      }
      set({ completedChapterIds: updated });
    }
  },

  saveQuizRecord: (record: QuizRecord) => {
    const current = get().quizRecords;
    const updated = [record, ...current.filter(r => r.chapterId !== record.chapterId)];
    
    if (typeof window !== "undefined") {
      localStorage.setItem("shiksha_quiz_records", JSON.stringify(updated));
    }
    set({ quizRecords: updated });

    // Also mark chapter completed
    get().markChapterCompleted(record.chapterId);
  },

  saveTutorMessage: (message: ChatMessage) => {
    const current = get().tutorMessages;
    const updated = [...current, message];
    
    if (typeof window !== "undefined") {
      localStorage.setItem("shiksha_tutor_messages", JSON.stringify(updated));
    }
    set({ tutorMessages: updated });
  },

  clearTutorHistory: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("shiksha_tutor_messages");
    }
    set({ tutorMessages: [] });
  },

  updateStudentScore: (studentId: string, newScore: number) => {
    const updated = get().teacherStudents.map(st => 
      st.id === studentId ? { ...st, avgScore: newScore } : st
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("shiksha_teacher_students", JSON.stringify(updated));
    }
    set({ teacherStudents: updated });
  },

  addTeacherStudent: (student: TeacherStudent) => {
    const updated = [...get().teacherStudents, student];
    if (typeof window !== "undefined") {
      localStorage.setItem("shiksha_teacher_students", JSON.stringify(updated));
    }
    set({ teacherStudents: updated });
  },

  saveGeneratedPaper: (paper: GeneratedPaperRecord) => {
    const updated = [paper, ...get().generatedPapers];
    if (typeof window !== "undefined") {
      localStorage.setItem("shiksha_generated_papers", JSON.stringify(updated));
    }
    set({ generatedPapers: updated });
  }
}));
