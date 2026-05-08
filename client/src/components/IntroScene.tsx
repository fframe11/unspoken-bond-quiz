import SoundToggle from "@/components/SoundToggle";
import { withAssetVersion } from "@/lib/assets";

interface IntroSceneProps {
  onNext: () => void;
}

export default function IntroScene({ onNext }: IntroSceneProps) {
  return (
    <div className="quiz-page">
      <div className="phone-screen story-screen relative">
        <SoundToggle />

        <div className="scene-image-frame story-image">
          <img
            src={withAssetVersion("/images/intro.png")}
            alt="รินกำลังเปิดประตูบ้าน"
            className="w-full h-auto"
            loading="eager"
            decoding="async"
          />
        </div>

        <div className="story-copy">
          <h2>คืนหนึ่งที่ใจคุณเริ่มส่งเสียง</h2>
        </div>

        <div className="scene-box">
          คุณตื่นขึ้นมาในร่างวิญญาณโปร่งแสงของแมวตัวหนึ่ง
          และเห็นคนสำคัญกลับมาพร้อมความเหนื่อยล้าที่ซ่อนไว้ไม่มิด
          คุณจะเข้าใกล้หัวใจของเธอด้วยวิธีไหน?
        </div>

        <button className="btn-dark" onClick={onNext}>
          ก้าวเข้าสู่ร่างแมว
        </button>
      </div>
    </div>
  );
}
