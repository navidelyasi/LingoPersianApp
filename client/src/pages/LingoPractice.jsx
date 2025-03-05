import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { practicesAdultsData } from "../data/practicesAdultsData.js";
import Flashcards from "../components/question-components/Flashcards.jsx";
import FillInputDrag from "../components/question-components/FillInputDrag.jsx";
import MultiChoice from "../components/question-components/MultiChoice.jsx";
import Topic from "../components/question-components/Topic.jsx";
import TopicDrag from "../components/question-components/TopicDrag.jsx";
import SentenceMaking from "../components/question-components/SentenceMaking.jsx";
import Timer from "../components/sub-components/Timer.jsx";
import { useLingoPracticeContext } from "../hooks/LingoPracticeContext.jsx";
import {
  playlevelpassed,
  playnotification2,
} from "../hooks/handleSoundEffects.js";
import "../styles/pages-styles/auth-page.css";
import "../styles/pages-styles/index.css";
import "../styles/pages-styles/lingo-practice-page.css";
import { FaPaperPlane, FaStepBackward, FaStepForward } from "react-icons/fa";
import { ImExit } from "react-icons/im";

export default function LingoPractice() {
  // I have to consider using ajax for sending GET and POST requests
  // I have to consider using ajax for sending GET and POST requests
  // import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
  // import { db } from "../hooks/initFirebase.jsx";
  // I have to consider using ajax for sending GET and POST requests
  // I have to consider using ajax for sending GET and POST requests
  // I have to consider using ajax for sending GET and POST requests

  const navigate = useNavigate();
  const { lingoPracticeId } = useParams();
  const { saveQuizAnswers, getQuizAnswers, markQuizCompleted } =
    useLingoPracticeContext();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.email;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [questionId, setQuestionId] = useState(0);
  const rawData = practicesAdultsData[lingoPracticeId];
  const quizOrPractice = lingoPracticeId.split("_")[0];
  // if quiz is not available, show a message
  if (!rawData)
    return (
      <div className="login-container">
        <h1 className="login-title">It is not available yet</h1>
        <h1 className="login-title">Comming soon</h1>
        <button
          className="login-button"
          onClick={() => {
            playnotification2();
            navigate("/menu-lingo-practice");
          }}
        >
          Back to menu
        </button>
      </div>
    );

  // _______________________ timer ______________________________
  // _______________________ timer set-up _______________________
  // initial time is 30 min (for adults) or 60 min (for kids)
  // Get initial total time based on quiz type (kids or adults)
  const initialTotalTime =
    lingoPracticeId.split("_")[1] === "kids" ? 60 * 60 : 30 * 60;
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const timeLeft = Math.max(initialTotalTime - totalTimeSpent, 0);
  const percentage =
    ((initialTotalTime - totalTimeSpent) / initialTotalTime) * 100;

  // Timer effect
  useEffect(() => {
    playnotification2();

    if (quizOrPractice === "quiz") {
      const intervalId = setInterval(() => {
        setTotalTimeSpent((prev) => prev + 1);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, []);

  const addMinutes = (minutes) => {
    setTotalTimeSpent((prev) => prev - minutes * 60);
  };

  // _____________ format time _____________
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // Function to generate initial state
  const generateInitialAnswers = () => {
    const initialAnswers = {};
    rawData.forEach((question) => {
      initialAnswers[question.id] = {};
      if (question.type === "sentence-making") {
        question.data.forEach((subQuestion, subQuestionIndex) => {
          initialAnswers[question.id][subQuestionIndex] = Array(
            subQuestion.correct.length
          ).fill("");
        });
      } else {
        question.data.forEach((_, subQuestionIndex) => {
          initialAnswers[question.id][subQuestionIndex] = "";
        });
      }

      if (question.retry)
        initialAnswers[question.id][question.data.length] = "";
    });
    return initialAnswers;
  };

  const [answers, setAnswers] = useState(() => {
    const savedAnswers = getQuizAnswers(lingoPracticeId, username);
    return savedAnswers || generateInitialAnswers();
  });

  const handleAnswerChange = useCallback(
    (value) => {
      setAnswers((prev) => ({
        ...prev,
        [rawData[questionId].id]: value,
      }));
    },
    [rawData, questionId]
  );

  // saves all answer-data for ALL question
  // submits data to an external server (Firebase)
  const handleSubmitAll = async () => {
    setIsSubmitting(true);

    // new submission object looks like this:
    const newSubmission = {
      answers,
      timeSpent: formatTime(totalTimeSpent),
      date: new Date().toLocaleDateString(),
    };

    // include the username in database data
    // const userDoc = doc(db, "quiz-answers", username);

    // this function comes from the useQuiz hook (Context)
    // after the answer is submitted successfully
    markQuizCompleted(lingoPracticeId);

    setIsSubmitting(false);
    playlevelpassed();
    // navigate("/menu");
  };

  const handleQuit = () => {
    playlevelpassed();
    saveQuizAnswers(lingoPracticeId, username, answers);
    navigate("/menu-lingo-practice");
  };

  const handleSubmitOneQuestion = useCallback(
    (action) => {
      if (action === "submit") {
        setAnswers((prev) => ({
          ...prev,
          [rawData[questionId].id]: {
            ...prev[rawData[questionId].id],
            [rawData[questionId].data.length]: "submitted",
          },
        }));
      } else if (action === "retry") {
        setAnswers((prev) => ({
          ...prev,
          [rawData[questionId].id]: {
            ...prev[rawData[questionId].id],
            [rawData[questionId].data.length]: "",
          },
        }));
      } else if (action === "show-answers") {
        setAnswers((prev) => ({
          ...prev,
          [rawData[questionId].id]: {
            ...prev[rawData[questionId].id],
            [rawData[questionId].data.length]: "show-answers",
          },
        }));
      }
    },
    [rawData, questionId]
  );

  const renderQuestionComponent = useCallback(() => {
    switch (rawData[questionId].type) {
      case "flashcards":
        return <Flashcards questionData={rawData[questionId]} />;
      case "fill_input":
        return (
          <FillInputDrag
            questionData={rawData[questionId]}
            answers={answers[rawData[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "multi_choice":
        return (
          <MultiChoice
            questionData={rawData[questionId]}
            answers={answers[rawData[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "topic":
        return (
          <Topic
            questionData={rawData[questionId]}
            answers={answers[rawData[questionId].id]}
            handleAnswerChange={handleAnswerChange}
          />
        );
      case "topic-drag":
        return (
          <TopicDrag
            questionData={rawData[questionId]}
            answers={answers[rawData[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      case "sentence-making":
        return (
          <SentenceMaking
            questionData={rawData[questionId]}
            answers={answers[rawData[questionId].id]}
            handleAnswerChange={handleAnswerChange}
            handleSubmitOneQuestion={handleSubmitOneQuestion}
          />
        );
      default:
        return <div>Unknown question type: {rawData[questionId].type}</div>;
    }
  }, [rawData, questionId, answers]);

  // scrolls to the top of the page when the question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [questionId]);

  return (
    <div className={`quiz-container ${isSubmitting ? "submitting" : ""}`}>
      {/* _______________________ sidebar _______________________ */}
      <div className="sidebar">
        {/* questions */}
        <div className="sidebar-questions">
          {rawData.map((q, i) => (
            <button
              key={i}
              className={`general-button ${questionId === i ? "active" : ""}`}
              onClick={() => setQuestionId(i)}
            >
              {document.documentElement.clientWidth > 768 ? "Question " : ""}
              {i + 1}
            </button>
          ))}
        </div>
        {/* previous and next question */}
        {document.documentElement.clientWidth <= 768 && (
          <div className="sidebar-questions button-group">
            <button
              className="general-button left-button"
              onClick={() =>
                setQuestionId(questionId > 0 ? questionId - 1 : questionId)
              }
            >
              <div className="button-content">
                <FaStepBackward
                  style={{
                    marginRight: "10px",
                  }}
                />
                previous question
              </div>
            </button>
            <button
              className="general-button right-button"
              onClick={() =>
                setQuestionId(
                  questionId < rawData.length - 1 ? questionId + 1 : questionId
                )
              }
            >
              <div className="button-content">
                next question
                <FaStepForward style={{ marginLeft: "10px" }} />
              </div>
            </button>
          </div>
        )}
        {/* submit and exit */}
        <div className="sidebar-questions">
          {quizOrPractice === "quiz" && (
            <button className="submit-all-button" onClick={handleSubmitAll}>
              {isSubmitting ? (
                "Submitting..."
              ) : (
                <div className="button-content">
                  <FaPaperPlane style={{ marginRight: "5px" }} />
                  Submit All Answers
                </div>
              )}
            </button>
          )}
          <button className="exit-button" onClick={handleQuit}>
            <div className="button-content">
              Exit
              <ImExit style={{ marginLeft: "10px" }} />
            </div>
          </button>
        </div>
      </div>
      {/* _______________________ main content _______________________ */}
      <div className="main-content">{renderQuestionComponent()}</div>

      {/* _______________________ submitting overlay _______________________ */}
      {isSubmitting && (
        <div className="submitting-overlay">
          <div className="submitting-content">
            <div className="spinner"></div>
            <div className="general-text">Submitting your answers...</div>
          </div>
        </div>
      )}

      {/* _______________________ timer _______________________ */}
      {quizOrPractice === "quiz" && (
        <Timer
          percentage={percentage}
          timeLeft={timeLeft}
          totalTimeSpent={totalTimeSpent}
          formatTime={formatTime}
        />
      )}

      {/* _______________________ time is up _______________________ */}
      {timeLeft <= 0 && (
        <div className="submitting-overlay">
          <div className="submitting-content">
            <h1>Time is up</h1>
            <button className="general-button" onClick={handleSubmitAll}>
              <FaPaperPlane style={{ marginRight: "5px" }} />
              Submit All Answers
            </button>
            <h1>Do you need more time?</h1>
            <button className="general-button" onClick={() => addMinutes(10)}>
              Add 10 minutes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
