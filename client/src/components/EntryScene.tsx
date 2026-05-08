import SoundToggle from "@/components/SoundToggle";

interface EntrySceneProps {
  onNext: () => void;
}

export default function EntryScene({ onNext }: EntrySceneProps) {
  return (
    <div className="quiz-page">
      <div className="phone-screen story-screen relative">
        <SoundToggle />

        <div className="scene-image-frame story-image">
          <img
            src="/images/entry.png"
            alt="มุมมองของแมวที่กำลังมองริน"
            className="w-full h-auto"
          />
        </div>

        <div className="story-copy">
          <h2>ทุกการเลือกจะทิ้งสีไว้ในตัวคุณ</h2>
        </div>

        <div className="scene-box">
          ตอบให้เหมือนเป็นคุณจริง ๆ ในวินาทีนั้น
          บางคำตอบอาจดูนุ่มนวล บางคำตอบอาจกล้ากว่าใจคิด
          แต่ทั้งหมดคือเบาะแสของตัวตนที่กำลังจะปรากฏ
        </div>

        <button className="btn-dark" onClick={onNext}>
          เริ่มตอบคำถาม
        </button>
      </div>
    </div>
  );
}
