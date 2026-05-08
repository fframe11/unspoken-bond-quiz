import { Sparkles, Compass, HeartHandshake, Share2 } from "lucide-react";
import SoundToggle from "@/components/SoundToggle";
import { useMusicPlayer } from "@/contexts/MusicContext";
import { withAssetVersion } from "@/lib/assets";

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
          src={withAssetVersion("/images/logo.png")}
          alt="Unspoken Bond Quiz"
          className="landing-logo"
          loading="eager"
          decoding="async"
        />

        <div className="hero-copy">
          <h1>แมวตัวนี้คือวิธีที่คุณรักคนอื่นโดยไม่รู้ตัว</h1>
          <p>
            ตอบ 10 ฉากสั้น ๆ แล้วดูว่าตอนคำพูดไม่พอ
            คุณดูแลคนสำคัญแบบไหน และทำไมคนบางคนถึงรู้สึกปลอดภัยเวลาอยู่ใกล้คุณ
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
          <span>เพื่อนเห็นแล้วต้องอยากรู้ของตัวเอง</span>
          ผลลัพธ์ไม่ได้บอกแค่ว่าเป็นแมวอะไร แต่แปลวิธีรักของคุณให้คนอื่นอ่านแล้วเข้าใจในไม่กี่วินาที
        </div>

        <button className="btn-dark btn-pulse" onClick={handleStart}>
          ดูว่าแมวในใจฉันเป็นตัวไหน
        </button>
      </div>
    </div>
  );
}
