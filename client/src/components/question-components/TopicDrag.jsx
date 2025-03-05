import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable, Droppable } from "../../hooks/useDragAndDrop.jsx";
import QuestionActionButtons from "../sub-components/QuestionActionButtons";
import Sound from "../sub-components/Sound";
import { shuffleArray } from "../../hooks/helpers.js";
import "../../styles/sub-styles/drag.css";
import "../../styles/questions-styles/topic.css";

// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(subQuestionId, value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
function TopicDrag({
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  const [stack, setStack] = useState([]);
  const submitted = answers[questionData.data.length];

  // Initialize the stack by shuffling the initial items
  useEffect(() => {
    const initialStack = questionData?.data.map((item) => item.correct);
    setStack(shuffleArray(initialStack));
  }, [questionData]);

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

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeIdArray = active.id.split("_");
    // Get the index from the droppable ID (removing 'drop_' prefix)
    const dropIndex = parseInt(over.id.replace("drop_", ""));

    if (String(dropIndex) === activeIdArray[1]) return;

    const newAnswers = { ...answers };

    if (activeIdArray[0] === "answer") {
      // if dragging from an answer spot, clear that spot first
      newAnswers[parseInt(activeIdArray[1])] = "";
    }

    // if word is picked from stack, remove it from the stack
    if (activeIdArray[0] === "stack") {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        newStack.splice(parseInt(parseInt(activeIdArray[1])), 1);
        return newStack;
      });
    }

    // if droped over an available answer, we should put available answer back in the stack
    if (answers[dropIndex] !== "") {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        newStack.push(answers[dropIndex]);
        return newStack;
      });
    }

    newAnswers[dropIndex] = activeIdArray[activeIdArray.length - 1];
    // Update the new position
    handleAnswerChange(newAnswers);
  }

  function getScore() {
    let score = 0;
    for (let i = 0; i < questionData.data.length; i++) {
      if (answers[i] === questionData.data[i].correct) {
        score++;
      }
    }
    return score;
  }

  return (
    <div className="topic-question-container">
      <DndContext onDragEnd={handleDragEnd}>
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
                click on the picture to see the picture bigger :)
              </div>
            )}
            {/* ______________ draggable stack ______________ */}
            <div className="draggable-stack">
              {stack.map((text, stackIndex) =>
                submitted === "" ? (
                  <Draggable
                    key={"stack_" + String(stackIndex) + "_" + text}
                    id={"stack_" + String(stackIndex) + "_" + text}
                  >
                    <div className="drag-item draggable">
                      <p className="drag-text">{text}</p>
                    </div>
                  </Draggable>
                ) : (
                  <div className="drag-item fixed">
                    <p className="drag-text">{text}</p>
                  </div>
                )
              )}
            </div>
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
              {/* How to display before submitting */}
              {submitted === "" && (
                <Droppable id={`drop_${index}`}>
                  {answers[index] === "" ? (
                    <div className="empty-space"></div>
                  ) : (
                    <Draggable
                      key={"answer_" + String(index) + "_" + answers[index]}
                      id={"answer_" + String(index) + "_" + answers[index]}
                    >
                      <div className={"drag-item draggable"}>
                        <p className="drag-text">{answers[index]}</p>
                      </div>
                    </Draggable>
                  )}
                </Droppable>
              )}
              {/* How to display after submitting */}
              {submitted === "submitted" && (
                <div
                  className={`drag-item fixed ${
                    answers[index] === questionData.data[index].correct
                      ? "correct"
                      : "incorrect"
                  }`}
                >
                  <p className="drag-text">{answers[index] || "-----------"}</p>
                </div>
              )}
              {/* How to display after show-answers */}
              {submitted === "show-answers" && (
                <>
                  {answers[index] === "" && (
                    <div className="empty-space drag-item fixed incorrect">
                      -----------
                    </div>
                  )}
                  {answers[index] && (
                    <div
                      className={`drag-item fixed ${
                        answers[index] === questionData.data[index].correct
                          ? "correct"
                          : "incorrect"
                      }`}
                    >
                      <p className="drag-text">{answers[index]}</p>
                    </div>
                  )}
                  {answers[index] !== questionData.data[index].correct && (
                    <div className="drag-item fixed correct">
                      <p className="drag-text">
                        {questionData.data[index].correct}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* ______   show the picture full screen ___________  */}
        {isModalOpen && (
          <div id="modal" className="modal-overlay" onClick={closePicture}>
            <img src={modalImageSrc} alt="Enlarged" className="modal-image" />
          </div>
        )}
      </DndContext>
      <QuestionActionButtons
        submitted={submitted}
        handleSubmitOneQuestion={handleSubmitOneQuestion}
        questionLength={questionData.data.length}
        getScore={getScore}
      />
    </div>
  );
}

export default React.memo(TopicDrag);
