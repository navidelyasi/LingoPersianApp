import React from "react";
import { DndContext } from "@dnd-kit/core";
import { Draggable, Droppable } from "../../hooks/useDragAndDrop";
import QuestionActionButtons from "../sub-components/QuestionActionButtons";
import Sound from "../sub-components/Sound";
import "../../styles/questions-styles/sentence-making.css";
import "../../styles/sub-styles/drag.css";

// _____ questionData _____ is the question object
// _____ answers _____ is the answers object answers.[index]
// _____ handleAnswerChange _____ is a function that updates the answers in the parent component
// _____ handleAnswerChange(value)
// _____ handleSubmitOneQuestion _____ is a function that updates the answers in the parent component
// _____ it adds "submitted" value to the answers onject
function SentenceMaking({
  questionData,
  answers,
  handleAnswerChange,
  handleSubmitOneQuestion,
}) {
  const submitted = answers[questionData.data.length];
  const stack = questionData?.data.map((sentence, sentenceIndex) =>
    sentence.text.filter(
      (word) => !Object.values(answers[sentenceIndex]).includes(word)
    )
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    // where the item is picked up from
    const activeIdArray = active.id.split("_");

    // where the item is dropped
    const dropIndexArray = over.id.split("_");

    // if user is dragging a word from one sentence to a different sentence, do nothing
    if (activeIdArray[1] !== dropIndexArray[1]) return;

    // Create a new copy of answers to maintain immutability
    const newAnswers = { ...answers };

    // remove the word from the old position (if it is not from the stack)
    if (activeIdArray[0] !== "stack") {
      newAnswers[parseInt(activeIdArray[1])][parseInt(activeIdArray[2])] = "";
    }

    // add the word to the new answers
    // last element in activeIdArray is the word
    newAnswers[dropIndexArray[1]][dropIndexArray[2]] =
      activeIdArray[activeIdArray.length - 1];

    // Update the new answers in the parent component
    handleAnswerChange(newAnswers);
  }

  function getScore() {
    let score = 0;
    for (let i = 0; i < questionData.data.length; i++) {
      let correct = true;
      for (let j = 0; j < questionData.data[i].correct.length; j++) {
        if (answers[i][j] !== questionData.data[i].correct[j]) {
          correct = false;
        }
      }
      if (correct) {
        score++;
      }
    }
    return score;
  }

  return (
    <div className="sentence-making-container">
      <div className="sentence-making-title">{questionData.title1}</div>
      <div className="sentence-making-title">{questionData.title2}</div>
      {questionData.sound && <Sound soundSrc={questionData.sound} />}
      <DndContext onDragEnd={handleDragEnd}>
        {questionData.data.map((sentence, sentenceIndex) => (
          <div className="sentence-container" key={sentenceIndex}>
            <div className="stack-sentence-making" key={sentenceIndex}>
              {stack[sentenceIndex].map((stackText) =>
                submitted === "" ? (
                  <Draggable
                    key={"stack_" + String(sentenceIndex) + "_" + stackText}
                    id={"stack_" + String(sentenceIndex) + "_" + stackText}
                  >
                    <div className="drag-item draggable">
                      <p className="drag-text">{stackText}</p>
                    </div>
                  </Draggable>
                ) : (
                  <div className="drag-item fixed">
                    <p className="drag-text">{stackText}</p>
                  </div>
                )
              )}
            </div>
            <div className="sentence-line">
              {sentence.correct.map((correctWord, wordIndex) => (
                <div key={String(sentenceIndex) + String(wordIndex)}>
                  {/* _________________________________ */}
                  {/*  How to display before submitting */}
                  {/* _________________________________ */}
                  {submitted === "" && (
                    <Droppable
                      id={`drop_${
                        String(sentenceIndex) + "_" + String(wordIndex)
                      }`}
                    >
                      {answers[sentenceIndex][wordIndex] === "" ? (
                        <div className="empty-space"></div>
                      ) : (
                        <Draggable
                          key={
                            "sentence_" +
                            String(sentenceIndex) +
                            "_" +
                            String(wordIndex) +
                            "_" +
                            answers[sentenceIndex][wordIndex]
                          }
                          id={
                            "sentence_" +
                            String(sentenceIndex) +
                            "_" +
                            String(wordIndex) +
                            "_" +
                            answers[sentenceIndex][wordIndex]
                          }
                        >
                          <div className={"drag-item draggable"}>
                            <p className="drag-text">
                              {answers[sentenceIndex][wordIndex]}
                            </p>
                          </div>
                        </Draggable>
                      )}
                    </Droppable>
                  )}
                  {/* _________________________________ */}
                  {/*   How to display after submitting */}
                  {/* _________________________________ */}
                  {submitted === "submitted" && (
                    <div
                      className={`drag-item fixed ${
                        answers[sentenceIndex][wordIndex] === correctWord
                          ? "correct"
                          : "incorrect"
                      }`}
                    >
                      <p className="drag-text">
                        {answers[sentenceIndex][wordIndex] || ""}
                      </p>
                    </div>
                  )}
                  {/* _________________________________ */}
                  {/* How to display after show-answers */}
                  {/* _________________________________ */}
                  {submitted === "show-answers" && (
                    <>
                      {answers[sentenceIndex][wordIndex] && (
                        <div
                          className={`drag-item fixed ${
                            answers[sentenceIndex][wordIndex] === correctWord
                              ? "correct"
                              : "incorrect"
                          }`}
                        >
                          <p className="drag-text">
                            {answers[sentenceIndex][wordIndex]}
                          </p>
                        </div>
                      )}
                      {answers[sentenceIndex][wordIndex] !== correctWord && (
                        <div className="drag-item fixed correct">
                          <p className="drag-text">{correctWord}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
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

export default React.memo(SentenceMaking);
