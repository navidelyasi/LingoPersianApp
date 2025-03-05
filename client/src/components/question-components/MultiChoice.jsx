import React from "react";
import QuestionActionButtons from "../sub-components/QuestionActionButtons";
import Sound from "../sub-components/Sound";
import "../../styles/questions-styles/multi-choice.css";

// _____ quizId _____ is like "adults_3"
// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
function MultiChoice({
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  const submitted = answers[questionData.data.length];

  const getAnswerStatus = (index, subIndex) => {
    if (submitted === "submitted") {
      // if submitted is "submitted"
      // if this button is selected answer
      if (subIndex === answers[index]) {
        // if the selected answer is correct
        if (subIndex === questionData.data[index].correct) {
          return "correct";
        } else {
          return "incorrect";
        }
      } else {
        // if this button is not selected answer
        return "";
      }
    } else if (submitted === "show-answers") {
      // if submitted is "show-answers"
      // if this button is selected answer
      if (subIndex === answers[index]) {
        if (subIndex === questionData.data[index].correct) {
          return "correct";
        } else {
          return "incorrect";
        }
        // if it is not selected, but it is correct answer
      } else if (subIndex === questionData.data[index].correct) {
        return "correct";
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const getScore = () => {
    let score = 0;
    for (let i = 0; i < questionData.data.length; i++) {
      if (answers[i] === questionData.data[i].correct) {
        score++;
      }
    }
    return score;
  };

  const handleChoiceClick = (index, subIndex) => {
    const newAnswers = { ...answers };
    newAnswers[index] = subIndex;
    handleAnswerChange(newAnswers);
  };

  return (
    <div className="multi-question">
      <h2>{questionData?.title}</h2>
      {questionData.sound && <Sound soundSrc={questionData.sound} />}
      <div className="sub-questions-container">
        {questionData.data.map((subQuestion, index) => (
          <div key={subQuestion.chid} className="sub-question-item">
            <h3 className="sub-question-multi">{subQuestion.question}</h3>
            {/* __________ sub questions grid __________ */}
            <div className="answers-grid">
              {subQuestion.answers.map((answer, subIndex) => (
                // __________ each answer button can be:
                // __________ selected, correct, incorrect
                <button
                  key={subIndex}
                  className={`answer-button
                    ${
                      answers[index] === subIndex ? "selected" : ""
                    } ${getAnswerStatus(index, subIndex)}`}
                  onClick={() => handleChoiceClick(index, subIndex)}
                  disabled={submitted !== ""}
                >
                  {answer}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <QuestionActionButtons
        submitted={submitted}
        handleSubmitOneQuestion={handleSubmitOneQuestion}
        questionLength={questionData.data.length}
        getScore={getScore}
      />
    </div>
  );
}

export default React.memo(MultiChoice);
