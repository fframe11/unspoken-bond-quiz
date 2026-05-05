import SoundToggle from "@/components/SoundToggle";

interface CutsceneDisplayProps {
  image: string;
  message: string;
  onNext: () => void;
  isLastQuestion: boolean;
  onViewResult: () => void;
  currentQuestion?: number;
  totalQuestions?: number;
}

export default function CutsceneDisplay({
  image,
  message,
  onNext,
  isLastQuestion,
  onViewResult,
  currentQuestion = 0,
  totalQuestions = 10,
}: CutsceneDisplayProps) {
  const progressPercent = Math.round(
    ((currentQuestion + 1) / totalQuestions) * 100
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#fdfbf7" }}
    >
      {/* Phone Frame Card */}
      <div className="phone-screen relative animate-fadeIn">
        {/* Sound Toggle */}
        <SoundToggle />

        {/* Cat Paws */}
        <div style={{ textAlign: "center", margin: "10px -20px" }}>
          <img
            src={image}
            alt="Cat paws"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        {/* Transition Story Box */}
        <div className="scene-box" style={{ backgroundColor: "#e6f9ff" }}>
          {message}
        </div>

        {/* Progress Bar — game loading style */}
        <div className="progress-container" style={{ position: "relative" }}>
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "13px",
              fontWeight: 700,
              color: "#1a1a1a",
              textShadow: "0 0 3px rgba(255,255,255,0.8)",
              pointerEvents: "none",
            }}
          >
            {progressPercent}%
          </span>
        </div>

        {/* CTA Button */}
        {isLastQuestion ? (
          <button className="btn-dark" onClick={onViewResult}>
            ดูผลลัพธ์
          </button>
        ) : (
          <button className="btn-handdrawn" onClick={onNext}>
            ไปต่อ
          </button>
        )}
      </div>
    </div>
  );
}
