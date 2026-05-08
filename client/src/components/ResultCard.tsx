import { calculateMBTI, getResultCat } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

interface ResultCardProps {
  scores: Record<string, number>;
  onRetake: () => void;
}

const auraLabels: Record<string, string> = {
  E: "พลังเข้าหาโลก",
  S: "พลังจับรายละเอียด",
  T: "พลังเหตุผล",
  J: "พลังจัดทิศทาง",
};

const auraColors: Record<string, string> = {
  E: "#e60012",
  S: "#00a7e1",
  T: "#43b02a",
  J: "#ffd84d",
};

const colorNames: Record<string, string> = {
  "#FF6B9D": "ชมพูคอรัล",
  "#FFB6C1": "ชมพูอ่อน",
  "#8B4513": "น้ำตาลทอง",
  "#FF8C00": "ส้มเข้ม",
  "#DDA0DD": "ม่วงพลัม",
  "#98D8C8": "เขียวมิ้นต์",
  "#FFE4E1": "ชมพูพีช",
  "#FFD700": "ทองคำ",
  "#2F4F4F": "เทาเข้ม",
  "#696969": "เทาควันไฟ",
  "#8B0000": "แดงเข้ม",
  "#4B0082": "ม่วงครามอินดิโก",
  "#A9A9A9": "เทาเงิน",
  "#FF69B4": "ชมพูสดใส",
  "#FF1493": "ชมพูเข้ม",
};

export default function ResultCard({ scores, onRetake }: ResultCardProps) {
  const mbtiType = calculateMBTI(scores as any);
  const pet = getResultCat(mbtiType);
  const shareRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);

  if (!pet) {
    return (
      <div className="quiz-page">
        <div className="phone-screen">
          <div className="scene-box">ยังไม่พบผลลัพธ์ ลองเล่นใหม่อีกครั้งนะ</div>
          <button className="btn-dark" onClick={onRetake}>
            เริ่มใหม่
          </button>
        </div>
      </div>
    );
  }

  const maxScore = Math.max(...Object.values(scores), 1);
  const auraColorName = colorNames[pet.auraColor] || pet.auraColor;

  const handleShare = async () => {
    if (!shareRef.current) return;
    setSharing(true);

    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: "#f7f7f2",
        scale: 2,
        useCORS: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) { setSharing(false); return; }

        const file = new File([blob], "unspoken-bond-result.png", { type: "image/png" });

        // Try native share with file (mobile)
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({
              title: "Unspoken Bond Quiz",
              text: `ฉันคือ ${pet.name} (${pet.mbti})`,
              files: [file],
            });
            setSharing(false);
            return;
          } catch { /* fallback below */ }
        }

        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "unspoken-bond-result.png";
        a.click();
        URL.revokeObjectURL(url);
        setSharing(false);
      }, "image/png");
    } catch {
      setSharing(false);
    }
  };

  return (
    <div className="quiz-page">
      <div className="phone-screen result-screen relative animate-fadeIn">
        <SoundToggle />

        {/* === Shareable card region === */}
        <div
          ref={shareRef}
          style={{
            background: "#ffffff",
            border: "3px solid #ffffff",
            borderRadius: "28px",
            padding: "0",
            overflow: "hidden",
            boxShadow: "0 10px 0 #c9edf9",
          }}
        >
          {/* Hero image — full width bleed */}
          {pet.image && (
            <div style={{
              background: "linear-gradient(135deg, #fff3c4, #eef8fc)",
              padding: "16px 0 8px",
              textAlign: "center",
            }}>
              <img
                src={pet.image}
                alt={`${pet.name} result`}
                style={{ width: "100%", maxHeight: "340px", objectFit: "contain", display: "block" }}
              />
            </div>
          )}

          {/* MBTI badge + name — overlapping style */}
          <div style={{ padding: "18px 20px 14px", position: "relative" }}>
            <div style={{
              display: "inline-flex",
              padding: "5px 14px",
              borderRadius: "999px",
              background: "#e60012",
              border: "2px solid #ffffff",
              fontSize: "13px",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "'IBM Plex Sans Thai', sans-serif",
              marginBottom: "8px",
              boxShadow: "0 5px 0 #a3000d",
            }}>
              {pet.mbti}
            </div>
            <h3 style={{
              fontFamily: "'Noto Serif Thai', serif",
              fontSize: "24px",
              fontWeight: 800,
              color: "#243047",
              margin: "4px 0 6px",
              lineHeight: 1.2,
            }}>
              {pet.name}
            </h3>
            <p style={{
              fontFamily: "'IBM Plex Sans Thai', sans-serif",
              color: "#526071",
              fontSize: "13px",
              lineHeight: 1.55,
              margin: 0,
            }}>
              {pet.description}
            </p>
          </div>

          {/* Aura bars — compact */}
          <div style={{ padding: "0 20px 14px" }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#697386",
              textTransform: "uppercase" as const,
              letterSpacing: 0,
              marginBottom: "8px",
              fontFamily: "'IBM Plex Sans Thai', sans-serif",
            }}>
              แผนที่ออร่า
            </div>
            {(["E", "S", "T", "J"] as const).map(key => {
              const value = scores[key] ?? 0;
              const width = `${Math.max(10, Math.round((value / maxScore) * 100))}%`;
              return (
                <div key={key} style={{ marginBottom: "6px" }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#243047",
                    marginBottom: "2px",
                    fontFamily: "'IBM Plex Sans Thai', sans-serif",
                  }}>
                    <span>{auraLabels[key]}</span>
                    <span>{value}</span>
                  </div>
                  <div style={{
                    height: "8px",
                    borderRadius: "999px",
                    background: "#ffffff",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      width,
                      height: "100%",
                      borderRadius: "999px",
                      background: auraColors[key],
                      transition: "width 1s ease",
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Love Language + Aura color — side by side bubbles */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            padding: "0 20px 14px",
          }}>
            <div style={{
              padding: "10px 12px",
              borderRadius: "16px",
              background: "#ffffff",
              border: "2px solid #ffffff",
              fontFamily: "'IBM Plex Sans Thai', sans-serif",
              boxShadow: "0 5px 0 #ffd7dc",
            }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#697386", marginBottom: "3px", textTransform: "uppercase" as const, letterSpacing: 0 }}>Love Language</div>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#243047" }}>{pet.loveLanguage}</div>
            </div>
            <div style={{
              padding: "10px 12px",
              borderRadius: "16px",
              background: "#ffffff",
              border: "2px solid #ffffff",
              fontFamily: "'IBM Plex Sans Thai', sans-serif",
              boxShadow: "0 5px 0 #c9edf9",
            }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: "#697386", marginBottom: "3px", textTransform: "uppercase" as const, letterSpacing: 0 }}>สีออร่า</div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: pet.auraColor,
                  display: "inline-block",
                  border: "2px solid #ffffff",
                  boxShadow: `0 0 8px ${pet.auraColor}`,
                }} />
                <span style={{ fontSize: "12px", fontWeight: 600, color: "#243047" }}>{auraColorName}</span>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div style={{
            padding: "0 20px 16px",
            fontFamily: "'Mali', cursive",
            fontStyle: "italic",
            fontSize: "13px",
            color: "#697386",
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            "{pet.quote || pet.shareCaption || "ตัวตนของคุณไม่จำเป็นต้องดัง แค่จริงก็พอ"}"
          </div>

          {/* Branding watermark */}
          <div style={{
            textAlign: "center",
            padding: "8px 0 14px",
            fontSize: "10px",
            color: "#9aa3af",
            fontFamily: "'IBM Plex Sans Thai', sans-serif",
            letterSpacing: 0,
          }}>
            Unspoken Bond Quiz ✦ สายใยไร้เสียง
          </div>
        </div>
        {/* === End shareable region === */}

        {/* Analysis — outside share card */}
        <div className="scene-box result-compact-box result-analysis" style={{ marginTop: "10px" }}>
          <strong>ทำไมถึงเป็นร่างนี้?</strong>
          <p>
            {pet.analysis ||
              pet.message ||
              "คำตอบของคุณสะท้อนวิธีมองโลก การตัดสินใจ และจังหวะการดูแลความสัมพันธ์ที่เป็นเอกลักษณ์ของคุณ"}
          </p>
        </div>

        {/* Action buttons */}
        <button className="btn-dark" onClick={handleShare} disabled={sharing} style={{ marginTop: "8px" }}>
          {sharing ? "กำลังสร้างรูป..." : "📸 แชร์ผลลัพธ์เป็นรูป (ลง IG Story)"}
        </button>
        <button className="btn-handdrawn" onClick={onRetake}>
          เล่นอีกครั้ง
        </button>
      </div>
    </div>
  );
}
