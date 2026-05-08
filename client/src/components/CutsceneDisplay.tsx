import SoundToggle from "@/components/SoundToggle";
import { withAssetVersion } from "@/lib/assets";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

interface CutsceneDisplayProps {
  image: string;
  message: string;
  onNext: () => void;
  isLastQuestion: boolean;
  currentQuestion?: number;
  totalQuestions?: number;
}

export default function CutsceneDisplay({
  image,
  message,
  onNext,
  isLastQuestion,
  currentQuestion = 0,
  totalQuestions = 10,
}: CutsceneDisplayProps) {
  const progressPercent = Math.round(
    ((currentQuestion + 1) / totalQuestions) * 100
  );
  const [imageRetry, setImageRetry] = useState(0);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageRetry(0);
    setImageFailed(false);
  }, [image]);

  const handleImageError = () => {
    if (imageRetry < 2) {
      setImageRetry((current) => current + 1);
      return;
    }
    setImageFailed(true);
  };

  return (
    <div className="quiz-page">
      <div className="phone-screen cutscene-screen relative animate-fadeIn">
        <SoundToggle />

        {!imageFailed ? (
          <div className="cutscene-art">
            <img
              src={withAssetVersion(image, imageRetry)}
              alt="ช่วงเปลี่ยนฉาก"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onError={handleImageError}
            />
          </div>
        ) : (
          <div className="cutscene-art scene-image-fallback">
            <span>กำลังโหลดฉากใหม่</span>
            <button
              type="button"
              className="btn-handdrawn"
              onClick={() => {
                setImageFailed(false);
                setImageRetry((current) => current + 1);
              }}
            >
              โหลดรูปอีกครั้ง
            </button>
          </div>
        )}

        <div className="scene-box cutscene-message">{message}</div>

        <div
          className="progress-container progress-with-cat"
          style={{ "--progress": `${progressPercent}%` } as CSSProperties}
        >
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          <img
            src={withAssetVersion("/images/loadprogress.png")}
            alt=""
            className="progress-cat"
            aria-hidden="true"
          />
          <span>{progressPercent}%</span>
        </div>

        {isLastQuestion ? (
          <button className="btn-dark btn-pulse" onClick={onNext}>
            ไปที่ประตูเกิดใหม่
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
