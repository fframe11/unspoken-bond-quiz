import { Sparkles, Compass, HeartHandshake, Share2 } from "lucide-react";
import SoundToggle from "@/components/SoundToggle";
import { useMusicPlayer } from "@/contexts/MusicContext";

interface LandingPageProps {
  onNext: () => void;
}

const insightCards = [
  { icon: Compass, label: "อ่านวิธีรัก", text: "ดูว่าคุณเข้าหาคนสำคัญแบบไหนในวันที่เขาไม่พูด" },
  { icon: HeartHandshake, label: "เห็นจุดอ่อนโยน", text: "เจอสิ่งที่คุณทำเพื่อดูแลคนอื่นโดยไม่รู้ตัว" },
  { icon: Share2, label: "แชร์แล้วเข้าใจทันที", text: "ผลลัพธ์ถูกจัดเป็นการ์ดที่คนดูอ่านแล้วอยากเล่นตาม" },
];

export default function LandingPage({ onNext }: LandingPageProps) {
  const { isSoundOn, toggleSound } = useMusicPlayer();

  const handleStart = () => {
    if (!isSoundOn) {
      toggleSound();
    }
    onNext();
  };

  return (
    <div className="quiz-page">
      <div className="phone-screen landing-screen relative">
        <SoundToggle />

        <div className="hero-mark">
          <Sparkles size={18} aria-hidden="true" />
          แบบทดสอบความสัมพันธ์ผ่านร่างแมวของคุณ
        </div>

        <img
          src="/images/logo.png"
          alt="Unspoken Bond Quiz"
          className="landing-logo"
        />

        <div className="hero-copy">
          <h1>คุณแสดงความรักแบบไหน ตอนที่คำพูดไม่พอ?</h1>
          <p>
            เดินผ่าน 10 ฉากสั้น ๆ ในบ้านของริน แล้วค้นพบร่างแมวที่สะท้อน
            วิธีดูแลคนสำคัญ จุดเด่นในความสัมพันธ์ และ blind spot ที่คุณอาจไม่เคยสังเกต
          </p>
        </div>

        <div className="insight-grid">
          {insightCards.map(({ icon: Icon, label, text }) => (
            <div className="insight-card" key={label}>
              <span className="insight-icon">
                <Icon size={17} aria-hidden="true" />
              </span>
              <strong>{label}</strong>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <div className="scene-box discovery-box">
          <span>เล่นให้เหมือนอ่านใจตัวเอง</span>
          เลือกคำตอบที่ใช่ในจังหวะแรก ผลลัพธ์จะไม่ได้บอกแค่ว่าเป็นแมวอะไร
          แต่บอกด้วยว่าความรักของคุณส่งผลกับคนรอบตัวอย่างไร
        </div>

        <button className="btn-dark btn-pulse" onClick={handleStart}>
          เริ่มค้นหาร่างแมวของฉัน
        </button>
      </div>
    </div>
  );
}
