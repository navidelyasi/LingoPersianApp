import React, { useState, useRef } from "react";
import VirtualKeyboard from "../sub-components/VirtualKeyboard";
import Sound from "../sub-components/Sound";
import "../../styles/questions-styles/topic.css";

// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(value)
function Topic({ questionData, answers, handleAnswerChange }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(true);
  const activeInputRef = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");

  // Function to open the modal picture with the clicked image
  function openPicture(imageSrc) {
    setModalImageSrc(imageSrc);
    setModalOpen(true);
  }

  // Function to close the modal picture when clicking outside the image
  function closePicture() {
    setModalOpen(false);
    setModalImageSrc("");
  }

  const handlePhysicalKeyPress = (index, value) => {
    const newAnswers = { ...answers };
    newAnswers[index] = value;
    handleAnswerChange(newAnswers);
  };

  const handleKeyPress = (letter) => {
    if (activeInputRef.current) {
      const fieldName = activeInputRef.current.name;
      const newAnswers = { ...answers };
      const currentAnswer = answers?.[fieldName] || "";
      if (letter === "<-") {
        if (newAnswers[fieldName].length > 0) {
          newAnswers[fieldName] = newAnswers[fieldName].substring(
            fieldName,
            newAnswers[fieldName].substring(0, newAnswers[fieldName].length - 1)
          );
        }
      } else {
        newAnswers[fieldName] = currentAnswer.concat(letter);
      }
      handleAnswerChange(newAnswers);
    }
  };

  return (
    <div
      className={`topic-question-container ${
        isShowKeyboard ? "is-keyboard-visible" : ""
      }`}
    >
      <div className="title-container">
        {/* _________________ show picture ? ______________ */}
        {questionData.picture && (
          <img
            src={questionData.picture}
            alt={questionData.picture}
            className="question-picture"
            onClick={() => openPicture(questionData.picture)}
          />
        )}
        {/* _____________ Titles  _______________________ */}
        <div className="titles">
          <div className="question-title">{questionData.title1}</div>
          <div className="question-title">{questionData.title2}</div>
          {questionData.sound && <Sound soundSrc={questionData.sound} />}
          {questionData.picture && (
            <div className="question-title">
              click on the picture to see bigger
            </div>
          )}
        </div>
      </div>
      {/* ______________      Sub questions ______________  */}
      <div className="sub-questions">
        {questionData.data.map((subQuestion, index) => (
          <div
            key={index}
            className={`sub-question ${
              questionData.shortAnswers ? "short" : ""
            }`}
          >
            <h3 className="sub-title">{subQuestion.text}</h3>
            <textarea
              name={index}
              className={`answer-box ${
                questionData.shortAnswers ? "short" : ""
              }`}
              placeholder="جواب شما در اینجا"
              value={answers[index] || ""}
              onFocus={(e) => (activeInputRef.current = e.target)}
              onChange={(e) => handlePhysicalKeyPress(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      {/* ____________       show the picture full screen       ___________  */}
      {isModalOpen && (
        <div id="modal" className="modal-overlay" onClick={closePicture}>
          <img src={modalImageSrc} alt="Enlarged" className="modal-image" />
        </div>
      )}

      {/* ______     button to show Virtual Keyboard */}
      <button
        className={`button-v-keyboard ${isShowKeyboard && "active"}`}
        onClick={() => setIsShowKeyboard(!isShowKeyboard)}
      >
        {isShowKeyboard ? "Hide" : "Show Virtual Keyboard"}
      </button>

      {/* _______     showing Virtual Keyboard */}
      {isShowKeyboard && (
        <VirtualKeyboard isShowKeyboard handleKeyPress={handleKeyPress} />
      )}
    </div>
  );
}

export default React.memo(Topic);
