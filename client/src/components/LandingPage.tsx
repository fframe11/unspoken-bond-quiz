import SoundToggle from "@/components/SoundToggle";
import { useMusicPlayer } from "@/contexts/MusicContext";

interface LandingPageProps {
  onNext: () => void;
}

export default function LandingPage({ onNext }: LandingPageProps) {
  const { isSoundOn, toggleSound } = useMusicPlayer();

  const handleStart = () => {
    // Auto-start music when entering the game
    if (!isSoundOn) {
      toggleSound();
    }
    onNext();
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#fdfbf7" }}
    >
      {/* Phone Frame Card */}
      <div className="phone-screen relative">
        {/* Sound Toggle */}
        <SoundToggle />

        {/* Logo */}
        <div style={{ margin: "10px 0 15px" }}>
          <img
            src="/images/logo.png"
            alt="Unspoken Bond Quiz Logo"
            className="w-full h-auto"
            style={{ maxWidth: "280px", margin: "0 auto", display: "block" }}
          />
        </div>

        {/* Description Box */}
        <div className="scene-box" style={{ textAlign: "left" }}>
          <p
            style={{
              textAlign: "center",
              fontSize: "17px",
              marginBottom: "10px",
              fontWeight: 700,
            }}
          >
            นี่คือควิซทดสอบอะไร?
          </p>
          <p style={{ fontSize: "14px", lineHeight: 1.8 }}>
            ค้นหาว่า<strong>คุณเป็นแมวสายพันธุ์ไหน</strong>ผ่านสถานการณ์จำลอง 10
            ฉาก โดยอิงจากทฤษฎีบุคลิกภาพ <strong>MBTI</strong> ทั้ง 16 แบบ
          </p>
        </div>

        {/* What it measures */}
        <div
          className="info-box"
          style={{ backgroundColor: "#e6f9ff", textAlign: "left" }}
        >
          <p style={{ fontWeight: 700, marginBottom: "8px", fontSize: "15px" }}>
            วัดอะไรบ้าง?
          </p>
          <p style={{ fontSize: "13px", lineHeight: 1.7 }}>
            • <strong>E/I</strong> — วิธีเติมพลัง (สังคม vs ส่วนตัว)
            <br />• <strong>S/N</strong> — วิธีรับรู้โลก (เป็นจริง vs จินตนาการ)
            <br />• <strong>T/F</strong> — วิธีตัดสินใจ (เหตุผล vs ความรู้สึก)
            <br />• <strong>J/P</strong> — วิธีใช้ชีวิต (มีแบบแผน vs ยืดหยุ่น)
          </p>
        </div>

        {/* Fun fact */}
        <p
          style={{
            fontSize: "13px",
            color: "#555",
            fontStyle: "italic",
            margin: "10px 0 15px",
            textAlign: "center",
          }}
        >
          ผลลัพธ์จะบอกว่าคุณเป็นแมวแบบไหน
          <br />
          พร้อมออร่า ไอเทมลับ และ Love Language
        </p>

        {/* CTA Button */}
        <button className="btn-dark" onClick={handleStart}>
          เริ่มเกมเลย!
        </button>
      </div>
    </div>
  );
}
