import SoundToggle from "@/components/SoundToggle";
import type { CSSProperties } from "react";

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
    <div className="quiz-page">
      <div className="phone-screen cutscene-screen relative animate-fadeIn">
        <SoundToggle />

        <div className="cutscene-art">
          <img src={image} alt="ช่วงเปลี่ยนฉาก" />
        </div>

        <div className="scene-box cutscene-message">{message}</div>

        <div
          className="progress-container progress-with-cat"
          style={{ "--progress": `${progressPercent}%` } as CSSProperties}
        >
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          <img
            src="/images/loadprogress.png"
            alt=""
            className="progress-cat"
            aria-hidden="true"
          />
          <span>{progressPercent}%</span>
        </div>

        {isLastQuestion ? (
          <button className="btn-dark btn-pulse" onClick={onViewResult}>
            เปิดผลลัพธ์
          </button>
        ) : (
          <button className="btn-handdrawn" onClick={onNext}>
            ไปตอนต่อไป
          </button>
        )}
      </div>
    </div>
  );
}
