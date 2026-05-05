import { Question } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";

interface QuestionCardProps {
  question: Question;
  onSelectAnswer: (optionIndex: number) => void;
  isAnswered?: boolean;
  questionNumber?: number;
  totalQuestions?: number;
}

const optionLabels = ["ก.", "ข.", "ค.", "ง."];

// Scene images — add more as user provides them
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: "#fdfbf7" }}>
      {/* Phone Frame Card */}
      <div className="phone-screen relative animate-fadeIn">
        {/* Sound Toggle */}
        <SoundToggle />

        {/* Scene Title */}
        <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 5px" }}>
          Scene {questionNumber}
        </h3>

        {/* Scene Image (if available for this scene) */}
        {sceneImage && (
          <div className="rounded-xl overflow-hidden" style={{ border: "3px solid #1a1a1a", margin: "10px -5px 15px" }}>
            <img
              src={sceneImage}
              alt={`Scene ${questionNumber}`}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Question Box */}
        <div className="scene-box">
          {question.text}
        </div>

        {/* Answer Options */}
        <div>
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              disabled={isAnswered}
              className="btn-handdrawn"
              style={{
                opacity: isAnswered ? 0.5 : 1,
                cursor: isAnswered ? "not-allowed" : "pointer",
              }}
            >
              {optionLabels[index]} {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
