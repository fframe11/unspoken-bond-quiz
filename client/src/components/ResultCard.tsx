import { calculateMBTI, getResultCat } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";
import { useRef, useState } from "react";

interface ResultCardProps {
  scores: Record<string, number>;
  onRetake: () => void;
}

type ResultProfile = {
  headline: string;
  insight: string;
  blindSpot: string;
  careTip: string;
};

const resultProfiles: Record<string, ResultProfile> = {
  ESTJ: {
    headline: "รักแบบจัดระบบให้ทุกอย่างปลอดภัย",
    insight: "คุณแสดงความรักด้วยการลงมือจัดการ ทำให้คนรอบตัวรู้สึกว่ามีคนคอยประคองสถานการณ์",
    blindSpot: "บางครั้งความหวังดีอาจดูเหมือนคำสั่ง ลองถามก่อนว่าเขาอยากให้ช่วยแบบไหน",
    careTip: "คำว่า 'เดี๋ยวฉันจัดให้' คือภาษารักของคุณ",
  },
  ENTJ: {
    headline: "รักแบบพาไปข้างหน้า",
    insight: "คุณมองเห็นศักยภาพของคนสำคัญ และมักดันให้เขาไปถึงจุดที่ดีกว่าเดิม",
    blindSpot: "อย่าลืมว่าบางวันเขาไม่ได้ต้องการแผน เขาแค่อยากมีคนอยู่ข้าง ๆ",
    careTip: "ลดโหมดหัวหน้าลงนิดหนึ่ง แล้วความอบอุ่นจะชัดขึ้นมาก",
  },
  INTJ: {
    headline: "รักแบบเงียบ แต่คิดเผื่อไกลมาก",
    insight: "คุณดูเหมือนไม่แสดงออก แต่จริง ๆ กำลังวางแผนให้คนสำคัญเจ็บน้อยที่สุด",
    blindSpot: "ความเงียบของคุณอาจถูกอ่านว่าไม่แคร์ ลองพูดสิ่งที่คิดออกมาบ้าง",
    careTip: "แค่บอกว่า 'ฉันคิดเรื่องนี้ไว้ให้แล้ว' ก็ทำให้อีกฝ่ายอุ่นใจ",
  },
  ISTJ: {
    headline: "รักแบบสม่ำเสมอจนกลายเป็นที่พักใจ",
    insight: "คุณทำให้ความสัมพันธ์มั่นคงผ่านรายละเอียดเล็ก ๆ ที่ไม่เคยลืม",
    blindSpot: "อย่ายึดว่าทุกอย่างต้องถูกวิธี บางครั้งความรักต้องการความยืดหยุ่น",
    careTip: "ความตรงเวลาของคุณอาจเป็นความโรแมนติกแบบหนึ่ง",
  },
  ESFP: {
    headline: "รักแบบทำให้ห้องสว่างขึ้นทันที",
    insight: "คุณดึงคนออกจากความหนักด้วยเสียงหัวเราะ การเล่น และพลังที่จริงใจ",
    blindSpot: "อย่ารีบทำให้ทุกอย่างสนุกจนข้ามความเศร้าของอีกฝ่าย",
    careTip: "อยู่กับเขาในความเงียบได้บ้าง แล้วพลังของคุณจะยิ่งนุ่มขึ้น",
  },
  ENFP: {
    headline: "รักแบบปลุกชีวิตให้กลับมามีสี",
    insight: "คุณชวนคนสำคัญมองความเป็นไปได้ใหม่ ๆ แม้ในวันที่เขาเห็นแค่ทางตัน",
    blindSpot: "ไอเดียเยอะเป็นเสน่ห์ แต่อีกฝ่ายอาจต้องการคำตอบง่าย ๆ ก่อน",
    careTip: "เลือกหนึ่งอย่างที่ทำได้จริง แล้วเดินไปพร้อมเขา",
  },
  ISFP: {
    headline: "รักแบบนุ่ม เงียบ และจริงมาก",
    insight: "คุณดูแลคนด้วยสัมผัสเล็ก ๆ บรรยากาศดี ๆ และการอยู่ข้าง ๆ แบบไม่กดดัน",
    blindSpot: "ถ้าเก็บความรู้สึกไว้หมด อีกฝ่ายอาจไม่รู้ว่าคุณต้องการอะไร",
    careTip: "พูดความรู้สึกสั้น ๆ แต่ตรง จะทำให้ความรักของคุณชัดขึ้น",
  },
  INFP: {
    headline: "รักแบบเข้าใจหัวใจส่วนลึก",
    insight: "คุณมองเห็นความรู้สึกที่คนอื่นมองข้าม และทำให้เขารู้สึกว่าถูกเข้าใจจริง ๆ",
    blindSpot: "อย่าแบกอารมณ์ของทุกคนไว้คนเดียว คุณก็ต้องมีพื้นที่หายใจ",
    careTip: "ขอบเขตที่ดีไม่ได้ทำให้รักน้อยลง แต่มันทำให้รักได้นานขึ้น",
  },
  INFJ: {
    headline: "รักแบบอ่านใจได้ก่อนเขาพูด",
    insight: "คุณจับสัญญาณเล็ก ๆ ได้ไว และมักรู้ว่าใครกำลังไม่ไหวแม้เขาจะยิ้มอยู่",
    blindSpot: "อย่าคาดหวังว่าทุกคนจะอ่านใจคุณได้เท่าที่คุณอ่านใจเขา",
    careTip: "บอกความต้องการของตัวเองให้ชัด คือการดูแลความสัมพันธ์เหมือนกัน",
  },
  ENFJ: {
    headline: "รักแบบโอบทั้งห้องไว้ด้วยกัน",
    insight: "คุณทำให้คนรู้สึกมีค่า และรู้ว่าตัวเองไม่ได้ถูกทิ้งไว้ข้างหลัง",
    blindSpot: "ระวังดูแลทุกคนจนลืมถามตัวเองว่าไหวไหม",
    careTip: "คนที่รักคุณก็อยากดูแลคุณกลับเหมือนกัน",
  },
  ESFJ: {
    headline: "รักแบบจำได้ทุกเรื่องที่สำคัญ",
    insight: "คุณแสดงความรักด้วยการดูแลรายละเอียด ทำให้คนใกล้ตัวรู้สึกถูกรักอย่างเป็นรูปธรรม",
    blindSpot: "ถ้าอีกฝ่ายไม่ตอบแทนแบบเดียวกัน ไม่ได้แปลว่าเขาไม่รัก",
    careTip: "บอกสิ่งที่คุณอยากได้รับตรง ๆ จะช่วยลดการน้อยใจเงียบ",
  },
  ISFJ: {
    headline: "รักแบบอยู่ตรงนั้นเสมอ",
    insight: "คุณเป็นพื้นที่ปลอดภัยของคนอื่นผ่านความใส่ใจที่สม่ำเสมอและไม่เรียกร้อง",
    blindSpot: "อย่าทำดีจนตัวเองเหนื่อยแล้วบอกว่าไม่เป็นไร",
    careTip: "การขอให้คนอื่นช่วยบ้าง ไม่ได้ทำให้คุณเป็นภาระ",
  },
  ENTP: {
    headline: "รักแบบทำให้ทุกวันไม่น่าเบื่อ",
    insight: "คุณพาความสัมพันธ์ออกจากกรอบเดิม ๆ ด้วยมุก ไอเดีย และการชวนคิด",
    blindSpot: "บางเรื่องไม่ต้องชนะด้วยเหตุผล แค่ฟังให้จบก็พอ",
    careTip: "เก็บพลังโต้กลับไว้ แล้วใช้ความฉลาดของคุณปลอบคนตรงหน้า",
  },
  INTP: {
    headline: "รักแบบเงียบ ๆ แต่สังเกตตลอด",
    insight: "คุณอาจไม่พูดหวาน แต่คุณจำ pattern ของคนสำคัญและพยายามเข้าใจเขาจริง ๆ",
    blindSpot: "อย่าวิเคราะห์ความรู้สึกจนลืมรู้สึกไปกับเขา",
    careTip: "ประโยคง่าย ๆ อย่าง 'ฉันอยู่ตรงนี้นะ' มีพลังมากกว่าที่คิด",
  },
  ESTP: {
    headline: "รักแบบลงมือทันที ไม่ปล่อยให้จม",
    insight: "คุณพาคนออกจากความเครียดด้วยการขยับ ทำ เล่น แก้ และอยู่กับสถานการณ์จริง",
    blindSpot: "ไม่ใช่ทุกปัญหาต้องรีบแก้ บางปัญหาต้องถูกฟังก่อน",
    careTip: "ถามว่า 'อยากให้ช่วย หรืออยากให้ฟัง' แล้วคุณจะน่ารักขึ้นมาก",
  },
  ISTP: {
    headline: "รักแบบซ่อมสิ่งที่พังโดยไม่พูดเยอะ",
    insight: "คุณแสดงความรักด้วยการแก้ปัญหาเล็ก ๆ ให้ชีวิตอีกฝ่ายเบาขึ้น",
    blindSpot: "ความนิ่งของคุณอาจดูเหมือนไม่รู้สึก ทั้งที่จริง ๆ รู้สึกมาก",
    careTip: "พูดความห่วงใยให้ได้ยินบ้าง แม้จะสั้นก็พอ",
  },
};

const auraCopy: Record<
  string,
  { title: string; summary: string; color: string }
> = {
  E: {
    title: "เข้าหาก่อน",
    summary: "เริ่มเชื่อมต่อ ทำให้คนอื่นรู้สึกว่าไม่ได้อยู่ลำพัง",
    color: "#e60012",
  },
  S: {
    title: "สังเกตไว",
    summary: "เห็นรายละเอียดเล็ก ๆ และดูแลได้ตรงจุด",
    color: "#00a7e1",
  },
  T: {
    title: "แก้ปัญหา",
    summary: "ช่วยทำให้เรื่องวุ่น ๆ กลับมาชัดและจัดการได้",
    color: "#43b02a",
  },
  J: {
    title: "สร้างความมั่นคง",
    summary: "จัดจังหวะให้ความสัมพันธ์รู้สึกปลอดภัยขึ้น",
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

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (context.measureText(nextLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = nextLine;
    }
  });

  if (line) lines.push(line);
  return lines;
}

async function loadShareImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
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
  const profile = resultProfiles[pet.mbti] || resultProfiles[mbtiType];
  const statRows = (["E", "S", "T", "J"] as const).map((key) => ({
    key,
    value: scores[key] ?? 0,
    width: `${Math.max(
      12,
      Math.round(((scores[key] ?? 0) / maxScore) * 100)
    )}%`,
    ...auraCopy[key],
  }));
  const topTrait = [...statRows].sort((a, b) => b.value - a.value)[0];

  const handleShare = async () => {
    setSharing(true);

    try {
      await document.fonts.ready;

      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1920;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Unable to create share canvas");

      const brandRed = "#e60012";
      const ink = "#243047";
      const muted = "#697386";

      context.fillStyle = "#f7f7f2";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = context.createLinearGradient(0, 0, canvas.width, 860);
      gradient.addColorStop(0, "#fff3c4");
      gradient.addColorStop(0.55, "#ffffff");
      gradient.addColorStop(1, "#eef8fc");
      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, 920);

      context.fillStyle = "#e60012";
      context.beginPath();
      context.roundRect(78, 78, 924, 22, 999);
      context.fill();

      if (pet.image) {
        const catImage = await loadShareImage(pet.image);
        const maxWidth = 760;
        const maxHeight = 610;
        const imageRatio = catImage.width / catImage.height;
        const boxRatio = maxWidth / maxHeight;
        const drawWidth = imageRatio > boxRatio ? maxWidth : maxHeight * imageRatio;
        const drawHeight = imageRatio > boxRatio ? maxWidth / imageRatio : maxHeight;
        const drawX = (canvas.width - drawWidth) / 2;
        const drawY = 165 + (maxHeight - drawHeight) / 2;

        context.save();
        context.shadowColor = "rgba(36,48,71,0.14)";
        context.shadowBlur = 28;
        context.shadowOffsetY = 18;
        context.drawImage(catImage, drawX, drawY, drawWidth, drawHeight);
        context.restore();
      }

      context.fillStyle = brandRed;
      context.beginPath();
      context.roundRect(426, 780, 228, 78, 999);
      context.fill();
      context.fillStyle = "#ffffff";
      context.font = "800 38px 'IBM Plex Sans Thai', sans-serif";
      context.textAlign = "center";
      context.fillText(pet.mbti, 540, 831);

      context.fillStyle = ink;
      context.font = "800 66px 'Mali', 'IBM Plex Sans Thai', sans-serif";
      context.fillText(pet.name, 540, 945);

      context.fillStyle = muted;
      context.font = "700 34px 'IBM Plex Sans Thai', sans-serif";
      wrapCanvasText(context, profile.headline, 820)
        .slice(0, 2)
        .forEach((line, index) => {
          context.fillText(line, 540, 1002 + index * 44);
        });

      context.fillStyle = "#ffffff";
      context.shadowColor = "rgba(36,48,71,0.12)";
      context.shadowBlur = 18;
      context.shadowOffsetY = 10;
      context.beginPath();
      context.roundRect(90, 1110, 900, 248, 34);
      context.fill();
      context.shadowColor = "transparent";

      context.textAlign = "left";
      context.fillStyle = muted;
      context.font = "800 27px 'IBM Plex Sans Thai', sans-serif";
      context.fillText("จุดที่คนรอบตัวสัมผัสได้", 140, 1170);
      context.fillStyle = brandRed;
      context.font = "800 46px 'Mali', 'IBM Plex Sans Thai', sans-serif";
      context.fillText(topTrait.title, 140, 1230);
      context.fillStyle = "#3a4658";
      context.font = "700 31px 'IBM Plex Sans Thai', sans-serif";
      wrapCanvasText(context, profile.insight, 800)
        .slice(0, 3)
        .forEach((line, index) => {
          context.fillText(line, 140, 1285 + index * 40);
        });

      let statY = 1440;
      statRows.forEach((row) => {
        context.fillStyle = ink;
        context.font = "800 30px 'IBM Plex Sans Thai', sans-serif";
        context.fillText(row.title, 110, statY);
        context.textAlign = "right";
        context.fillText(String(row.value), 970, statY);
        context.textAlign = "left";
        context.fillStyle = "#edf2f5";
        context.beginPath();
        context.roundRect(110, statY + 18, 860, 22, 999);
        context.fill();
        context.fillStyle = row.color;
        context.beginPath();
        context.roundRect(
          110,
          statY + 18,
          Math.max(130, (860 * row.value) / maxScore),
          22,
          999
        );
        context.fill();
        statY += 88;
      });

      context.fillStyle = "#ffffff";
      context.beginPath();
      context.roundRect(90, 1750, 900, 104, 28);
      context.fill();
      context.fillStyle = muted;
      context.font = "800 25px 'IBM Plex Sans Thai', sans-serif";
      context.fillText("จำไว้สั้น ๆ", 136, 1792);
      context.fillStyle = ink;
      context.font = "800 30px 'IBM Plex Sans Thai', sans-serif";
      wrapCanvasText(context, profile.careTip, 760)
        .slice(0, 2)
        .forEach((line, index) => {
          context.fillText(line, 136, 1834 + index * 34);
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
              text: `ฉันคือ ${pet.name} (${pet.mbti}) - ${profile.headline}`,
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
            <p className="share-tagline">{profile.headline}</p>

            <div className="share-insight">
              <span>จุดที่คนรอบตัวสัมผัสได้</span>
              <strong>{topTrait.title}</strong>
              <p>{profile.insight}</p>
            </div>

            <div className="share-stats" aria-label="สรุปวิธีรักของคุณ">
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
                <span>จำไว้สั้น ๆ</span>
                <strong>{profile.careTip}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="scene-box result-compact-box result-analysis result-story">
          <strong>อ่านตัวเองต่ออีกนิด</strong>
          <p>{profile.insight}</p>
          <p>
            <b>Blind spot:</b> {profile.blindSpot}
          </p>
          <p>
            <b>สีออร่า:</b> {auraColorName}
          </p>
        </div>

        <button
          className="btn-dark"
          onClick={handleShare}
          disabled={sharing}
          style={{ marginTop: "8px" }}
        >
          {sharing ? "กำลังสร้างรูป..." : "แชร์ลง Story"}
        </button>
        <button className="btn-handdrawn" onClick={onRetake}>
          เล่นอีกครั้ง
        </button>
      </div>
    </div>
  );
}
