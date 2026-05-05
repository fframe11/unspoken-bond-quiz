import { getResultCat, calculateMBTI } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";
import { useMemo } from "react";

interface ResultCardProps {
  scores: Record<string, number>;
  onRetake: () => void;
}

// ========== ระบบออร่า 3 สาย ==========
// แบ่งแมว 16 ตัว → สายหลัก + ค่าน้ำหนักออร่า 3 ด้าน
// dominant = สุ่มค่า 700-999, secondary = 300-600, minor = 50-250
type CatAuraProfile = {
  dominant: "ดุ" | "อ้อน" | "กวน";
  weights: {
    ดุ: [number, number];
    อ้อน: [number, number];
    กวน: [number, number];
  };
};

const catAuraProfiles: Record<string, CatAuraProfile> = {
  // === สายดุ (Fierce) ===
  ESTJ: {
    dominant: "ดุ",
    weights: { ดุ: [850, 999], อ้อน: [50, 180], กวน: [100, 300] },
  },
  ENTJ: {
    dominant: "ดุ",
    weights: { ดุ: [800, 999], อ้อน: [80, 200], กวน: [200, 450] },
  },
  INTJ: {
    dominant: "ดุ",
    weights: { ดุ: [750, 950], อ้อน: [50, 150], กวน: [100, 350] },
  },
  ISTJ: {
    dominant: "ดุ",
    weights: { ดุ: [700, 900], อ้อน: [100, 250], กวน: [50, 200] },
  },

  // === สายอ้อน (Sweet/Clingy) ===
  ESFP: {
    dominant: "อ้อน",
    weights: { ดุ: [50, 150], อ้อน: [850, 999], กวน: [200, 450] },
  },
  INFP: {
    dominant: "อ้อน",
    weights: { ดุ: [50, 120], อ้อน: [800, 999], กวน: [100, 300] },
  },
  ISFP: {
    dominant: "อ้อน",
    weights: { ดุ: [50, 100], อ้อน: [750, 950], กวน: [80, 250] },
  },
  INFJ: {
    dominant: "อ้อน",
    weights: { ดุ: [50, 130], อ้อน: [800, 999], กวน: [50, 200] },
  },
  ISFJ: {
    dominant: "อ้อน",
    weights: { ดุ: [50, 100], อ้อน: [780, 960], กวน: [50, 180] },
  },
  ENFJ: {
    dominant: "อ้อน",
    weights: { ดุ: [80, 200], อ้อน: [850, 999], กวน: [150, 400] },
  },
  ESFJ: {
    dominant: "อ้อน",
    weights: { ดุ: [50, 150], อ้อน: [880, 999], กวน: [200, 450] },
  },

  // === สายกวน (Mischievous) ===
  ESTP: {
    dominant: "กวน",
    weights: { ดุ: [200, 450], อ้อน: [150, 400], กวน: [850, 999] },
  },
  ENTP: {
    dominant: "กวน",
    weights: { ดุ: [300, 550], อ้อน: [80, 250], กวน: [800, 999] },
  },
  ENFP: {
    dominant: "กวน",
    weights: { ดุ: [50, 200], อ้อน: [350, 600], กวน: [750, 999] },
  },
  INTP: {
    dominant: "กวน",
    weights: { ดุ: [150, 350], อ้อน: [100, 300], กวน: [700, 950] },
  },
  ISTP: {
    dominant: "กวน",
    weights: { ดุ: [200, 400], อ้อน: [80, 250], กวน: [720, 950] },
  },
};

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAuraStats(mbti: string) {
  const profile = catAuraProfiles[mbti] || catAuraProfiles["ESTP"];
  return {
    ดุ: randomInRange(...profile.weights["ดุ"]),
    อ้อน: randomInRange(...profile.weights["อ้อน"]),
    กวน: randomInRange(...profile.weights["กวน"]),
    dominant: profile.dominant,
  };
}

const auraConfig = {
  ดุ: { color: "#E74C3C", label: "ความดุ", bgColor: "#FDEDEC" },
  อ้อน: { color: "#FF69B4", label: "ความอ้อน", bgColor: "#FFF0F5" },
  กวน: { color: "#FF8C00", label: "ความกวน", bgColor: "#FFF5E6" },
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

// ========== Component ==========
export default function ResultCard({ scores, onRetake }: ResultCardProps) {
  const mbtiType = calculateMBTI(scores as any);
  const pet = getResultCat(mbtiType);

  // useMemo so aura stats don't re-randomize on re-render
  const auraStats = useMemo(() => getAuraStats(mbtiType), [mbtiType]);

  if (!pet) {
    return <div className="text-center p-8">ไม่พบผลลัพธ์</div>;
  }

  const petData = {
    nameThai: pet.nameThai || pet.name,
    name: pet.name,
    description: pet.description,
    mbti: pet.mbti,
    loveLanguage: pet.loveLanguage,
    auraColor: pet.auraColor,
    secretItem: pet.secretItem,
    image: pet.image,
    analysis: pet.analysis,
    quote: pet.quote,
    shareCaption: pet.shareCaption,
    message: pet.message,
  };

  const handleShare = () => {
    const text = `ฉันเป็น ${petData.name} (${petData.mbti}) ใน Unspoken Bond Quiz!\n\nออร่า: ดุ +${auraStats["ดุ"]} | อ้อน +${auraStats["อ้อน"]} | กวน +${auraStats["กวน"]}\n\n${petData.description}\n\nคุณล่ะ? มาทดสอบกันเถอะ!`;

    if (navigator.share) {
      navigator
        .share({
          title: "Unspoken Bond - สายใยไร้เสียง",
          text: text,
        })
        .catch(() => {
          alert("ไม่สามารถแชร์ได้ในเบราว์เซอร์นี้");
        });
    } else {
      alert(text);
    }
  };

  return (
    <div
      style={{ backgroundColor: "#fdfbf7" }}
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
    >
      {/* Phone Frame Card */}
      <div className="phone-screen result-screen relative animate-fadeIn">
        {/* Sound Toggle */}
        <SoundToggle />

        {/* Result Title */}
        <h2 className="result-title" style={{ marginBottom: "6px" }}>
          ร่างที่แท้จริงของคุณ!
        </h2>

        {petData.image && (
          <div
            className="result-hero-image overflow-hidden"
            style={{
              margin: "-12px -26px 8px",
            }}
          >
            <img
              src={petData.image}
              alt={`${petData.name} result`}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
          </div>
        )}

        {/* Pet Name */}
        <h3 style={{ margin: "6px 0 2px", fontSize: "22px", lineHeight: 1.25 }}>
          {petData.name} ({petData.mbti})
        </h3>
        <p
          style={{
            fontSize: "13px",
            color: "#555",
            margin: "0 0 10px",
            lineHeight: 1.45,
          }}
        >
          "{petData.description}"
        </p>

        {/* ========== Aura Stats Box ========== */}
        <div
          style={{
            border: "2px solid #1a1a1a",
            borderRadius: "10px",
            padding: "10px",
            marginBottom: "10px",
            backgroundColor: "#fff9e6",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: "13px",
              textAlign: "center",
              marginBottom: "8px",
            }}
          >
            Aura Stats
          </p>

          {(["ดุ", "อ้อน", "กวน"] as const).map(key => {
            const config = auraConfig[key];
            const value = auraStats[key];
            const barPercent = (value / 999) * 100;
            const isDominant = auraStats.dominant === key;

            return (
              <div key={key} style={{ marginBottom: "7px" }}>
                {/* Label row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontSize: "12px", fontWeight: 600 }}>
                    {config.label}
                  </span>
                  <span
                    style={{
                      fontSize: isDominant ? "14px" : "13px",
                      fontWeight: 700,
                      color: config.color,
                    }}
                  >
                    +{value}
                  </span>
                </div>
                {/* Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    backgroundColor: "white",
                    border: "2px solid #1a1a1a",
                    borderRadius: "255px 15px 225px 15px/15px 225px 15px 255px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${barPercent}%`,
                      backgroundColor: config.color,
                      borderRight:
                        barPercent > 5 ? "2px solid #1a1a1a" : "none",
                      transition: "width 0.8s ease-out",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Box */}
        <div className="info-box result-compact-box">
          <p>
            <strong>Love Language:</strong> {petData.loveLanguage}
          </p>
          <p>
            <strong>สีออร่า:</strong>{" "}
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                backgroundColor: petData.auraColor,
                border: "2px solid #1a1a1a",
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />
            {colorNames[petData.auraColor] || petData.auraColor}
          </p>
          <p>
            <strong>ไอเทมลับ:</strong> {petData.secretItem}
          </p>
        </div>

        {/* Analysis Box */}
        <div
          className="scene-box result-compact-box"
          style={{
            backgroundColor: "#e6f9ff",
            textAlign: "left",
            fontSize: "13px",
          }}
        >
          <p style={{ fontWeight: 700, marginBottom: "8px" }}>
            ทำไมคุณถึงเป็นแมวตัวนี้?
          </p>
          <p>
            {petData.analysis ||
              petData.message ||
              "การตัดสินใจของคุณสะท้อนให้เห็นบุคลิกภาพที่เป็นเอกลักษณ์"}
          </p>
        </div>

        {/* Quote */}
        <div
          className="quote-box"
          style={{ fontSize: "13px", lineHeight: 1.5, marginBottom: "14px" }}
        >
          "
          {petData.quote ||
            petData.shareCaption ||
            "ไม่มีสัตว์เลี้ยงตัวไหนเหมือนกัน แต่ทุกตัวล้วนพิเศษ"}
          "
        </div>

        {/* Action Buttons */}
        <button className="btn-dark" onClick={handleShare}>
          แชร์ผลลัพธ์ลง Story
        </button>
        <button
          className="btn-handdrawn"
          onClick={onRetake}
          style={{ marginTop: "8px" }}
        >
          เล่นอีกครั้ง
        </button>
      </div>
    </div>
  );
}
