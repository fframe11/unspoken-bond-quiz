import { calculateMBTI, getResultCat } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";

interface ResultCardProps {
  scores: Record<string, number>;
  onRetake: () => void;
}

const auraCopy: Record<
  string,
  { title: string; summary: string; color: string }
> = {
  E: {
    title: "กล้าเข้าหา",
    summary: "คุณมักเป็นฝ่ายขยับก่อน ทำให้คนรอบตัวรู้สึกว่าไม่ได้อยู่คนเดียว",
    color: "#e60012",
  },
  S: {
    title: "อ่านสถานการณ์เก่ง",
    summary: "คุณจับรายละเอียดเล็ก ๆ ได้ไว เลยดูแลคนสำคัญได้ตรงจุด",
    color: "#00a7e1",
  },
  T: {
    title: "คิดเป็นระบบ",
    summary: "คุณช่วยแก้ปัญหาด้วยเหตุผล ทำให้เรื่องวุ่น ๆ กลับมาชัดขึ้น",
    color: "#43b02a",
  },
  J: {
    title: "วางจังหวะเป็น",
    summary: "คุณชอบจัดลำดับและคุมจังหวะ ทำให้ความสัมพันธ์รู้สึกมั่นคง",
    color: "#ffd84d",
  },
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

function getReadableLoveLanguage(value: string) {
  const match = value.match(/\((.*?)\)/);
  return match?.[1] || value;
}

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
  const statRows = (["E", "S", "T", "J"] as const).map((key) => ({
    key,
    value: scores[key] ?? 0,
    width: `${Math.max(12, Math.round(((scores[key] ?? 0) / maxScore) * 100))}%`,
    ...auraCopy[key],
  }));
  const topTrait = [...statRows].sort((a, b) => b.value - a.value)[0];

  const handleShare = async () => {
    if (!shareRef.current) return;
    setSharing(true);

    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: "#f7f7f2",
        scale: 3,
        useCORS: true,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setSharing(false);
          return;
        }

        const file = new File([blob], "unspoken-bond-result.png", {
          type: "image/png",
        });

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({
              title: "Unspoken Bond Quiz",
              text: `ฉันคือ ${pet.name} (${pet.mbti})`,
              files: [file],
            });
            setSharing(false);
            return;
          } catch {
            /* fallback below */
          }
        }

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

        <div ref={shareRef} className="share-card">
          {pet.image && (
            <div className="share-hero">
              <img src={pet.image} alt={`${pet.name} result`} />
            </div>
          )}

          <div className="share-body">
            <div className="share-badge">{pet.mbti}</div>
            <h3>{pet.name}</h3>
            <p className="share-tagline">{pet.description}</p>

            <div className="share-insight">
              <span>จุดเด่นที่ชัดสุด</span>
              <strong>{topTrait.title}</strong>
              <p>{topTrait.summary}</p>
            </div>

            <div className="share-stats" aria-label="สรุปออร่าของคุณ">
              {statRows.map((row) => (
                <div className="share-stat" key={row.key}>
                  <div className="share-stat-label">
                    <span>{row.title}</span>
                    <strong>{row.value}</strong>
                  </div>
                  <div className="share-stat-meter">
                    <div
                      style={{
                        width: row.width,
                        background: row.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="share-meta-grid">
              <div>
                <span>ภาษารัก</span>
                <strong>{getReadableLoveLanguage(pet.loveLanguage)}</strong>
              </div>
              <div>
                <span>สีออร่า</span>
                <strong>{auraColorName}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="scene-box result-compact-box result-analysis">
          <strong>ทำไมถึงเป็นร่างนี้?</strong>
          <p>
            {pet.analysis ||
              pet.message ||
              "คำตอบของคุณสะท้อนวิธีเข้าหาคนสำคัญ วิธีอ่านสถานการณ์ และจังหวะที่คุณใช้ดูแลความสัมพันธ์"}
          </p>
        </div>

        <button
          className="btn-dark"
          onClick={handleShare}
          disabled={sharing}
          style={{ marginTop: "8px" }}
        >
          {sharing ? "กำลังสร้างรูป..." : "แชร์ผลลัพธ์เป็นรูป"}
        </button>
        <button className="btn-handdrawn" onClick={onRetake}>
          เล่นอีกครั้ง
        </button>
      </div>
    </div>
  );
}
