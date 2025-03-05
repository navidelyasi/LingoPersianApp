import { createContext, useContext, useState } from "react";

const LingoPracticeContext = createContext();

export function useLingoPracticeContext() {
  return useContext(LingoPracticeContext);
}

export function LingoPracticeContextProvider({ children }) {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const saveQuizAnswers = (quizId, username, answers) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [`${quizId}_${username}`]: answers,
    }));
  };

  const getQuizAnswers = (quizId, username) => {
    return quizAnswers[`${quizId}_${username}`] || null;
  };

  const markQuizCompleted = (quizId) => {
    if (!completedQuizzes.includes(quizId)) {
      setCompletedQuizzes((prev) => [...prev, quizId]);
    }
  };

  const value = {
    quizAnswers,
    completedQuizzes,
    saveQuizAnswers,
    getQuizAnswers,
    markQuizCompleted,
  };

  return (
    <LingoPracticeContext.Provider value={value}>
      {children}
    </LingoPracticeContext.Provider>
  );
}
