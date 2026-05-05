import SoundToggle from "@/components/SoundToggle";

interface EntrySceneProps {
  onNext: () => void;
}

export default function EntryScene({ onNext }: EntrySceneProps) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundColor: "#fdfbf7" }}
    >
      {/* Phone Frame Card */}
      <div className="phone-screen relative">
        {/* Sound Toggle */}
        <SoundToggle />

        {/* Entry Image — New cartoon-style POV */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "3px solid #1a1a1a", margin: "0 -5px 15px" }}
        >
          <img
            src="/images/entry.png"
            alt="มุมมองแมว มองเห็นรินเดินเข้าบ้าน"
            className="w-full h-auto"
          />
        </div>

        {/* Title */}
        <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "10px 0" }}>
          ประตูเปิดออก...
        </h3>

        {/* Story Box */}
        <div className="scene-box">
          คุณมองเห็นเธอจากมุมมองของตัวเอง — ตอนนี้
          เรามาเข้าใจใจของเธอผ่านการตัดสินใจของคุณ
        </div>

        {/* CTA Button */}
        <button className="btn-dark" onClick={onNext}>
          เริ่มการทดสอบ
        </button>

        {/* Hint */}
        <p
          style={{
            fontSize: "12px",
            fontStyle: "italic",
            color: "#555",
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          "ทุกการตัดสินใจของคุณจะเปิดเผยว่าคุณเป็นสัตว์เลี้ยงแบบไหน"
        </p>
      </div>
    </div>
  );
}
