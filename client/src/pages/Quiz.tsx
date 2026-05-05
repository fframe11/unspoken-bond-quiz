import { useState } from "react";
import { questions, calculateMBTI, type Question } from "@/lib/quizDataNew";
import LandingPage from "@/components/LandingPage";
import IntroScene from "@/components/IntroScene";
import EntryScene from "@/components/EntryScene";
import QuestionCard from "@/components/QuestionCard";
import ResultCard from "@/components/ResultCard";
import CutsceneDisplay from "@/components/CutsceneDisplay";

type QuizState =
  | "landing"
  | "intro"
  | "entry"
  | "questions"
  | "cutscene"
  | "checkpoint"
  | "result";

// Progress cutscene images — hand-drawn art from image/progress1/
const cutsceneImages = [
  "/images/progress1.png",
  "/images/progress2.png",
  "/images/progress3.png",
  "/images/progress4.png",
  "/images/progress5.png",
  "/images/progress6.png",
  "/images/progress7.png",
  "/images/progress8.png",
  "/images/progress9.png",
  "/images/progress10.png",
];

export default function Quiz() {
  const [state, setState] = useState<QuizState>("landing");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [mbti, setMbti] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);

  const handleLandingNext = () => {
    setState("intro");
  };

  const handleStartQuiz = () => {
    setState("entry");
  };

  const handleEnterHome = () => {
    setState("questions");
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    setIsAnswered(true);

    // Show cutscene after a short delay
    setTimeout(() => {
      setState("cutscene");
    }, 500);
  };

  const handleCutsceneNext = () => {
    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswered(false);
      setState("questions");
    } else {
      // All questions answered, show checkpoint before result
      setState("checkpoint");
    }
  };

  const calculateScores = () => {
    const scores = { E: 0, S: 0, T: 0, J: 0 };
    answers.forEach((answerIndex, questionIndex) => {
      const option = questions[questionIndex].options[answerIndex];
      Object.keys(option.scores).forEach((key: string) => {
        scores[key as keyof typeof scores] +=
          option.scores[key as keyof typeof option.scores];
      });
    });
    return scores;
  };

  const handleViewResult = () => {
    const scores = calculateScores();
    const calculatedMBTI = calculateMBTI(scores);
    setMbti(calculatedMBTI);
    setState("result");
  };

  const handleRetake = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setMbti("");
    setIsAnswered(false);
    setState("landing");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#fdfbf7" }}
    >
      {state === "landing" && <LandingPage onNext={handleLandingNext} />}

      {state === "intro" && <IntroScene onNext={handleStartQuiz} />}

      {state === "entry" && <EntryScene onNext={handleEnterHome} />}

      {state === "questions" && (
        <div className="w-full">
          <QuestionCard
            question={questions[currentQuestion]}
            onSelectAnswer={handleAnswerSelect}
            isAnswered={isAnswered}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
          />
        </div>
      )}

      {state === "cutscene" && (
        <CutsceneDisplay
          image={cutsceneImages[currentQuestion]}
          message={questions[currentQuestion].checkpoint || ""}
          onNext={handleCutsceneNext}
          isLastQuestion={currentQuestion === questions.length - 1}
          onViewResult={handleViewResult}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
        />
      )}

      {state === "checkpoint" && (
        <div
          className="min-h-screen flex items-center justify-center px-4 py-8"
          style={{ backgroundColor: "#fdfbf7" }}
        >
          <div className="phone-screen">
            <div
              className="cat-doodle"
              style={{ animation: "float 2s infinite", fontSize: "34px" }}
            >
              ผลลัพธ์
            </div>
            <h2 style={{ fontSize: "20px", fontWeight: 700, margin: "10px 0" }}>
              วิญญาณของคุณชัดเจนขึ้นแล้ว
            </h2>
            <div className="scene-box">
              เดินไปที่กระจกเงาเพื่อดูร่างที่แท้จริงของคุณ
            </div>
            <button className="btn-dark" onClick={handleViewResult}>
              ดูผลลัพธ์
            </button>
          </div>
        </div>
      )}

      {state === "result" && (
        <ResultCard scores={calculateScores()} onRetake={handleRetake} />
      )}
    </div>
  );
}
