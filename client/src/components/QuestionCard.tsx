import { Question } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";
import type { CSSProperties } from "react";

interface QuestionCardProps {
  question: Question;
  onSelectAnswer: (optionIndex: number) => void;
  isAnswered?: boolean;
  questionNumber?: number;
  totalQuestions?: number;
}

const optionLabels = ["A", "B", "C", "D"];

const sceneImages: Record<number, string> = {
  1: "/images/scene/scene1.png",
  2: "/images/scene/scene2.png",
  3: "/images/scene/scene3.png",
  4: "/images/scene/scene4.png",
  5: "/images/scene/scene5.png",
  6: "/images/scene/scene6.png",
  7: "/images/scene/scene7.png",
  8: "/images/scene/scene8.png",
  9: "/images/scene/scene9.png",
  10: "/images/scene/scene10.png",
};

export default function QuestionCard({
  question,
  onSelectAnswer,
  isAnswered = false,
  questionNumber = 1,
  totalQuestions = 10,
}: QuestionCardProps) {
  const sceneImage = sceneImages[questionNumber];
  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="quiz-page question-page">
      <div className="phone-screen question-screen relative animate-fadeIn">
        <SoundToggle />

        <div
          className="progress-track progress-with-cat"
          aria-label={`ความคืบหน้า ${progressPercent}%`}
          style={{ "--progress": `${progressPercent}%` } as CSSProperties}
        >
          <div className="progress-glow" style={{ width: `${progressPercent}%` }} />
          <img
            src="/images/loadprogress.png"
            alt=""
            className="progress-cat"
            aria-hidden="true"
          />
        </div>

        {sceneImage && (
          <div className="scene-image-frame">
            <img
              src={sceneImage}
              alt={`ฉากที่ ${questionNumber}`}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className="scene-box question-box">{question.text}</div>

        <div className="answer-list">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              disabled={isAnswered}
              className="btn-handdrawn answer-option"
            >
              <span className="answer-label">{optionLabels[index]}</span>
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
