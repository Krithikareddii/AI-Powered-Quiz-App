import { useState, useEffect } from "react";

function App() {
  const questions = [
    {
      question: "Which language is used in React?",
      options: ["Python", "JavaScript", "Java"],
      answer: "JavaScript",
    },
    {
      question: "Which database language is used for queries?",
      options: ["SQL", "HTML", "CSS"],
      answer: "SQL",
    },
    {
      question: "Which library is used for frontend development?",
      options: ["React.js", "MySQL", "Flask"],
      answer: "React.js",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer > 0 && !showScore) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      nextQuestion();
    }
  }, [timer]);

  const checkAnswer = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    nextQuestion();
  };

  const nextQuestion = () => {
    const next = currentQuestion + 1;

    if (next < questions.length) {
      setCurrentQuestion(next);
      setTimer(10);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>AI Powered Quiz App</h1>

      {showScore ? (
        <div>
          <h2>Your Final Score: {score}</h2>
          <p>Quiz Completed Successfully 🎉</p>
          <button
  onClick={() => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }}
>
  Restart Quiz
</button>
        </div>
      ) : (
        <div
          style={{
            width: "400px",
            margin: "auto",
            padding: "20px",
            border: "1px solid gray",
            borderRadius: "10px",
          }}
        >
          <h2>Time Left: {timer} sec</h2>

          <h3>
            Question {currentQuestion + 1}/{questions.length}
          </h3>

          <h3>{questions[currentQuestion].question}</h3>

          {questions[currentQuestion].options.map((option) => (
            <div key={option}>
              <button
                style={{
                  margin: "10px",
                  padding: "10px",
                  width: "200px",
                }}
                onClick={() => checkAnswer(option)}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;