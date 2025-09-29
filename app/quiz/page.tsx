'use client';

import React, { useState } from 'react';
import { questionsData } from './questionsData';
import '../../styles/quiz.css';

const NUMBER_OF_QUESTIONS = 30;

const Quiz = () => {
  const [isWelcome, setIsWelcome] = useState(true);
  const [quizQuestions, setQuizQuestions] = useState<
    {
      question: string;
      answers: string[];
      correctAnswerIndex: number;
      questionImage?: string;
      type: 'text' | 'image';
    }[]
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Shuffle & load quiz
  const loadQuiz = () => {
    const shuffled = [...questionsData].sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, NUMBER_OF_QUESTIONS);
    setQuizQuestions(chosen);
    setUserAnswers(Array(NUMBER_OF_QUESTIONS).fill(null));
    setCurrentQuestionIndex(0);
    setIsSubmitted(false);
  };

  // Start
  const handleStartQuiz = () => {
    loadQuiz();
    setIsWelcome(false);
  };

  // Retake
  const handleRetakeQuiz = () => {
    loadQuiz();
    setIsWelcome(false);
  };

  // Answer select
  const handleAnswerSelect = (answerIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(updatedAnswers);
  };

  // Next / Back
  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Submit
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // 1) Welcome Screen
  if (isWelcome) {
    return (
      <div className='container'>
        <div className='welcomeCard bg-background'>
          <h1 className='title'>Welcome to the CTA-CTA for Stroke Quiz!</h1>
          <p style={{ marginBottom: '20px' }}>
            Test your knowledge about CTA-CTA for Stroke, challenge yourself,
            and see how much you know!
          </p>
          <button className='button' onClick={handleStartQuiz}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // 2) If no questions loaded
  if (!quizQuestions.length) {
    return <div className='loading'>Loading Questions...</div>;
  }

  // 3) Calculate Results if submitted
  let correctCount = 0;
  const wrongAnswersDetail: {
    question: string;
    correctAnswer: string;
    yourAnswer: string;
    questionImage?: string;
    type: 'text' | 'image';
  }[] = [];

  if (isSubmitted) {
    quizQuestions.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswerIndex) {
        correctCount++;
      } else {
        wrongAnswersDetail.push({
          question: q.question,
          correctAnswer: q.answers[q.correctAnswerIndex],
          yourAnswer:
            userAnswers[i] !== null
              ? q.answers[userAnswers[i]]
              : 'No answer selected',
          questionImage: q.questionImage,
          type: q.type,
        });
      }
    });
    const wrongCount = quizQuestions.length - correctCount;

    return (
      <div className='container'>
        <div className='resultsCard bg-background'>
          <h1 className='title'>Quiz Results</h1>
          <p>
            You answered <strong>{correctCount}</strong> correctly and{' '}
            <strong>{wrongCount}</strong> incorrectly.
          </p>

          {wrongAnswersDetail.length > 0 && (
            <div>
              <h2
                style={{ marginTop: 16, fontSize: '1.125rem', marginBottom: 8 }}
              >
                Review Incorrect Answers
              </h2>
              <ul>
                {wrongAnswersDetail.map((item, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <p>
                      <strong>Q:</strong> {item.question}
                      {item.questionImage && (
                        <img
                          src={`/${item.questionImage}`}
                          alt='Question illustration'
                          className='questionImage'
                          style={{ maxWidth: '100%', margin: '12px 0' }}
                        />
                      )}
                    </p>
                    <p>
                      <strong>Your Answer:</strong>{' '}
                      {item.type === 'image' ? (
                        <img
                          src={`/${item.yourAnswer}`}
                          alt='Your answer'
                          className='answerImage'
                          style={{
                            maxWidth: '100px',
                            maxHeight: '100px',
                            margin: '8px',
                          }}
                        />
                      ) : (
                        item.yourAnswer
                      )}
                    </p>
                    <p>
                      <strong>Correct Answer:</strong>{' '}
                      {item.type === 'image' ? (
                        <img
                          src={`/${item.correctAnswer}`}
                          alt='Correct answer'
                          className='answerImage'
                          style={{
                            maxWidth: '100px',
                            maxHeight: '100px',
                            margin: '8px',
                          }}
                        />
                      ) : (
                        item.correctAnswer
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button onClick={handleRetakeQuiz} className='button'>
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // 4) Quiz in Progress
  const currentQuestion = quizQuestions[currentQuestionIndex];
  console.log('Current Question:', currentQuestion);
  return (
    <div className='container '>
      <div className='card bg-background'>
        <h1 className='title'>CTA</h1>

        <div className='questionSection'>
          <h2 className='questionNumber'>
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </h2>
          <p className='questionText'>{currentQuestion.question}</p>
          {currentQuestion.questionImage && (
            <img
              src={`/${currentQuestion.questionImage}`}
              alt='Question illustration'
              className='questionImage'
              style={{ maxWidth: '100%', margin: '16px 0' }}
            />
          )}
        </div>

        <div className='answersContainer'>
          {currentQuestion.answers.map((answer, index) => {
            const isSelected = userAnswers[currentQuestionIndex] === index;
            return (
              <label
                key={index}
                className={
                  isSelected
                    ? 'answerOption answerSelected bg-background'
                    : 'answerOption bg-background'
                }
              >
                <input
                  type='radio'
                  name={`q-${currentQuestionIndex}`}
                  checked={isSelected}
                  onChange={() => handleAnswerSelect(index)}
                  className='radioButton'
                />
                {currentQuestion.type === 'image' ? (
                  <img
                    src={`/${answer}`}
                    alt={`Answer option ${index + 1}`}
                    className='answerImage'
                    style={{
                      maxWidth: '100px',
                      maxHeight: '100px',
                      margin: '8px',
                    }}
                  />
                ) : (
                  answer
                )}
              </label>
            );
          })}
        </div>

        <div className='navButtons'>
          {currentQuestionIndex > 0 ? (
            <button
              onClick={handleBack}
              disabled={currentQuestionIndex === 0}
              className='button'
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {currentQuestionIndex < quizQuestions.length - 1 ? (
            <button
              onClick={handleNext}
              className='button'
              style={
                userAnswers[currentQuestionIndex] === null
                  ? { opacity: 0.5 }
                  : {}
              }
              disabled={userAnswers[currentQuestionIndex] === null}
            >
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className='button'>
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
