import SoundToggle from "@/components/SoundToggle";

interface IntroSceneProps {
  onNext: () => void;
}

export default function IntroScene({ onNext }: IntroSceneProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8" style={{ backgroundColor: "#fdfbf7" }}>
      {/* Phone Frame Card */}
      <div className="phone-screen relative">
        {/* Sound Toggle */}
        <SoundToggle />

        {/* Intro Image — Large, no title/cat emoticon */}
        <div className="rounded-xl overflow-hidden" style={{ border: "3px solid #1a1a1a", margin: "0 -5px 15px" }}>
          <img
            src="/images/intro.png"
            alt="ริน กำลังเปิดประตูบ้าน"
            className="w-full h-auto"
          />
        </div>

        {/* Story Box */}
        <div className="scene-box">
          คุณตื่นขึ้นมาในร่างวิญญาณโปร่งแสง "ริน" เจ้าของของคุณกลับมาบ้านพร้อมหมอกสีเทาแห่งความเศร้า...
          คุณจะเยียวยาเธออย่างไร?
        </div>

        {/* CTA Button */}
        <button className="btn-dark" onClick={onNext}>
          🐱 แปลงร่างเป็นแมว
        </button>
      </div>
    </div>
  );
}
