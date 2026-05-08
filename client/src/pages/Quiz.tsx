import { useEffect, useState } from "react";
import { questions, calculateMBTI } from "@/lib/quizDataNew";
import LandingPage from "@/components/LandingPage";
import IntroScene from "@/components/IntroScene";
import EntryScene from "@/components/EntryScene";
import QuestionCard from "@/components/QuestionCard";
import ResultCard from "@/components/ResultCard";
import CutsceneDisplay from "@/components/CutsceneDisplay";
import PageTransition from "@/components/PageTransition";
import { preloadImages } from "@/lib/assets";

type QuizState =
  | "landing"
  | "intro"
  | "entry"
  | "questions"
  | "cutscene"
  | "checkpoint"
  | "result";

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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    preloadImages([
      "/images/logo.png",
      "/images/intro.png",
      "/images/entry.png",
      "/images/loadprogress.png",
      "/images/scene/scene1.png",
      "/images/progress1.png",
    ]);
  }, []);

  useEffect(() => {
    const nextQuestion = currentQuestion + 1;
    const nextScene = nextQuestion + 1;
    const preloadTargets = [
      `/images/progress${currentQuestion + 1}.png`,
      `/images/scene/scene${currentQuestion + 1}.png`,
    ];

    if (nextQuestion < questions.length) {
      preloadTargets.push(`/images/progress${nextQuestion + 1}.png`);
    }

    if (nextScene <= questions.length) {
      preloadTargets.push(`/images/scene/scene${nextScene}.png`);
    }

    preloadImages(preloadTargets);
  }, [currentQuestion]);

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
    if (isAnswered) return;

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    setIsAnswered(true);
    setSelectedAnswer(optionIndex);

    setTimeout(() => {
      setState("cutscene");
    }, 650);
  };

  const handleCutsceneNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsAnswered(false);
      setSelectedAnswer(null);
      setState("questions");
    } else {
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
    setSelectedAnswer(null);
    setState("landing");
  };

  const transitionKey = state === "questions" ? `q-${currentQuestion}` : state === "cutscene" ? `c-${currentQuestion}` : state;

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ position: "relative", zIndex: 1 }}>
      <PageTransition keyName={transitionKey}>
        {state === "landing" && <LandingPage onNext={handleLandingNext} />}

        {state === "intro" && <IntroScene onNext={handleStartQuiz} />}

        {state === "entry" && <EntryScene onNext={handleEnterHome} />}

        {state === "questions" && (
          <div className="w-full">
            <QuestionCard
              question={questions[currentQuestion]}
              onSelectAnswer={handleAnswerSelect}
              isAnswered={isAnswered}
              selectedOption={selectedAnswer}
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
          <div className="quiz-page">
            <div className="phone-screen checkpoint-screen animate-fadeIn">
              <div className="cat-doodle" style={{ animation: "float 2s infinite" }}>
                ✦
              </div>
              <h2>ร่างแมวของคุณกำลังจะปรากฏ</h2>
              <div className="scene-box">
                ทุกคำตอบกำลังรวมตัวเป็นภาพเดียว เดินไปที่กระจกเงา
                แล้วดูว่าความรักแบบเงียบ ๆ ของคุณกลายเป็นแมวตัวไหน
              </div>
              <button className="btn-dark btn-pulse" onClick={handleViewResult}>
                ดูผลลัพธ์
              </button>
            </div>
          </div>
        )}

        {state === "result" && (
          <ResultCard scores={calculateScores()} onRetake={handleRetake} />
        )}
      </PageTransition>
    </div>
  );
}
