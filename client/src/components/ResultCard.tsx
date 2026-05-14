import { calculateMBTI, getResultCat } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";
import { withAssetVersion } from "@/lib/assets";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
// No html2canvas import needed

interface ResultCardProps {
  scores: Record<string, number>;
  onRetake: () => void;
}

type ResultProfile = {
  headline: string;
  hook: string;
  insight: string;
  peopleFeel: string;
  blindSpot: string;
  careTip: string;
};

const resultProfiles: Record<string, ResultProfile> = {
  ESTJ: {
    headline: "รักแบบจัดระบบให้ทุกอย่างปลอดภัย",
    hook: "คุณไม่ได้ชอบควบคุม คุณแค่ไม่อยากให้คนสำคัญต้องรับมือทุกอย่างคนเดียว",
    insight: "คุณแสดงความรักด้วยการลงมือจัดการ ทำให้คนรอบตัวรู้สึกว่ามีคนคอยประคองสถานการณ์",
    peopleFeel: "อยู่ใกล้คุณแล้วเหมือนมีคนช่วยถือแผนที่ในวันที่ใจวุ่น",
    blindSpot: "บางครั้งความหวังดีอาจดูเหมือนคำสั่ง ลองถามก่อนว่าเขาอยากให้ช่วยแบบไหน",
    careTip: "คำว่า 'เดี๋ยวฉันจัดให้' คือภาษารักของคุณ",
  },
  ENTJ: {
    headline: "รักแบบพาไปข้างหน้า",
    hook: "คุณรักด้วยการเห็นศักยภาพ แม้วันที่อีกฝ่ายยังไม่เห็นมันในตัวเอง",
    insight: "คุณมองเห็นศักยภาพของคนสำคัญ และมักดันให้เขาไปถึงจุดที่ดีกว่าเดิม",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่าอนาคตยังมีทางไปต่อ",
    blindSpot: "อย่าลืมว่าบางวันเขาไม่ได้ต้องการแผน เขาแค่อยากมีคนอยู่ข้าง ๆ",
    careTip: "ลดโหมดหัวหน้าลงนิดหนึ่ง แล้วความอบอุ่นจะชัดขึ้นมาก",
  },
  INTJ: {
    headline: "รักแบบเงียบ แต่คิดเผื่อไกลมาก",
    hook: "คุณอาจไม่พูดบ่อย แต่ในหัวคุณมีแผนสำรองให้คนที่รักเสมอ",
    insight: "คุณดูเหมือนไม่แสดงออก แต่จริง ๆ กำลังวางแผนให้คนสำคัญเจ็บน้อยที่สุด",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่ามีใครสักคนคิดเผื่ออย่างลึกมาก",
    blindSpot: "ความเงียบของคุณอาจถูกอ่านว่าไม่แคร์ ลองพูดสิ่งที่คิดออกมาบ้าง",
    careTip: "แค่บอกว่า 'ฉันคิดเรื่องนี้ไว้ให้แล้ว' ก็ทำให้อีกฝ่ายอุ่นใจ",
  },
  ISTJ: {
    headline: "รักแบบสม่ำเสมอจนกลายเป็นที่พักใจ",
    hook: "ความรักของคุณไม่ค่อยหวือหวา แต่มันกลับมาอยู่ตรงเดิมให้พึ่งได้เสมอ",
    insight: "คุณทำให้ความสัมพันธ์มั่นคงผ่านรายละเอียดเล็ก ๆ ที่ไม่เคยลืม",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่าบางอย่างในชีวิตยังวางใจได้",
    blindSpot: "อย่ายึดว่าทุกอย่างต้องถูกวิธี บางครั้งความรักต้องการความยืดหยุ่น",
    careTip: "ความตรงเวลาของคุณอาจเป็นความโรแมนติกแบบหนึ่ง",
  },
  ESFP: {
    headline: "รักแบบทำให้ห้องสว่างขึ้นทันที",
    hook: "คุณไม่ได้แค่ทำให้คนหัวเราะ คุณทำให้ความหนักในใจเบาลง",
    insight: "คุณดึงคนออกจากความหนักด้วยเสียงหัวเราะ การเล่น และพลังที่จริงใจ",
    peopleFeel: "อยู่ใกล้คุณแล้วความเศร้าดูไม่ใหญ่เท่าเดิม",
    blindSpot: "อย่ารีบทำให้ทุกอย่างสนุกจนข้ามความเศร้าของอีกฝ่าย",
    careTip: "อยู่กับเขาในความเงียบได้บ้าง แล้วพลังของคุณจะยิ่งนุ่มขึ้น",
  },
  ENFP: {
    headline: "รักแบบปลุกชีวิตให้กลับมามีสี",
    hook: "คุณคือคนที่ชวนหัวใจคนอื่นกลับมาเชื่อว่าโลกยังมีมุมใหม่",
    insight: "คุณชวนคนสำคัญมองความเป็นไปได้ใหม่ ๆ แม้ในวันที่เขาเห็นแค่ทางตัน",
    peopleFeel: "อยู่ใกล้คุณแล้วเหมือนได้หน้าต่างบานใหม่ในวันที่อึดอัด",
    blindSpot: "ไอเดียเยอะเป็นเสน่ห์ แต่อีกฝ่ายอาจต้องการคำตอบง่าย ๆ ก่อน",
    careTip: "เลือกหนึ่งอย่างที่ทำได้จริง แล้วเดินไปพร้อมเขา",
  },
  ISFP: {
    headline: "รักแบบนุ่ม เงียบ และจริงมาก",
    hook: "คุณไม่ต้องดังเพื่อให้ใครรู้สึกถูกรัก แค่การอยู่ของคุณก็มีน้ำหนัก",
    insight: "คุณดูแลคนด้วยสัมผัสเล็ก ๆ บรรยากาศดี ๆ และการอยู่ข้าง ๆ แบบไม่กดดัน",
    peopleFeel: "อยู่ใกล้คุณแล้วเหมือนได้พักจากโลกที่เร่งเกินไป",
    blindSpot: "ถ้าเก็บความรู้สึกไว้หมด อีกฝ่ายอาจไม่รู้ว่าคุณต้องการอะไร",
    careTip: "พูดความรู้สึกสั้น ๆ แต่ตรง จะทำให้ความรักของคุณชัดขึ้น",
  },
  INFP: {
    headline: "รักแบบเข้าใจหัวใจส่วนลึก",
    hook: "คุณมองเห็นความรู้สึกที่ยังไม่มีคำอธิบาย และนั่นทำให้คนรู้สึกไม่โดดเดี่ยว",
    insight: "คุณมองเห็นความรู้สึกที่คนอื่นมองข้าม และทำให้เขารู้สึกว่าถูกเข้าใจจริง ๆ",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่าความเปราะบางของตัวเองไม่ผิด",
    blindSpot: "อย่าแบกอารมณ์ของทุกคนไว้คนเดียว คุณก็ต้องมีพื้นที่หายใจ",
    careTip: "ขอบเขตที่ดีไม่ได้ทำให้รักน้อยลง แต่มันทำให้รักได้นานขึ้น",
  },
  INFJ: {
    headline: "รักแบบอ่านใจได้ก่อนเขาพูด",
    hook: "คุณได้ยินเสียงเงียบ ๆ ของคนอื่นเร็วมาก จนบางทีเขายังตกใจ",
    insight: "คุณจับสัญญาณเล็ก ๆ ได้ไว และมักรู้ว่าใครกำลังไม่ไหวแม้เขาจะยิ้มอยู่",
    peopleFeel: "อยู่ใกล้คุณแล้วเหมือนมีคนเห็นตัวตนหลังรอยยิ้ม",
    blindSpot: "อย่าคาดหวังว่าทุกคนจะอ่านใจคุณได้เท่าที่คุณอ่านใจเขา",
    careTip: "บอกความต้องการของตัวเองให้ชัด คือการดูแลความสัมพันธ์เหมือนกัน",
  },
  ENFJ: {
    headline: "รักแบบโอบทั้งห้องไว้ด้วยกัน",
    hook: "คุณทำให้คนรู้สึกว่าตัวเองยังมีที่ยืน แม้ในวันที่เขาไม่มั่นใจ",
    insight: "คุณทำให้คนรู้สึกมีค่า และรู้ว่าตัวเองไม่ได้ถูกทิ้งไว้ข้างหลัง",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่ามีใครคอยดึงกลับมาอย่างอ่อนโยน",
    blindSpot: "ระวังดูแลทุกคนจนลืมถามตัวเองว่าไหวไหม",
    careTip: "คนที่รักคุณก็อยากดูแลคุณกลับเหมือนกัน",
  },
  ESFJ: {
    headline: "รักแบบจำได้ทุกเรื่องที่สำคัญ",
    hook: "คุณทำให้ความรักจับต้องได้ผ่านรายละเอียดเล็ก ๆ ที่คนอื่นอาจลืม",
    insight: "คุณแสดงความรักด้วยการดูแลรายละเอียด ทำให้คนใกล้ตัวรู้สึกถูกรักอย่างเป็นรูปธรรม",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่าเรื่องเล็ก ๆ ของเขามีความหมาย",
    blindSpot: "ถ้าอีกฝ่ายไม่ตอบแทนแบบเดียวกัน ไม่ได้แปลว่าเขาไม่รัก",
    careTip: "บอกสิ่งที่คุณอยากได้รับตรง ๆ จะช่วยลดการน้อยใจเงียบ",
  },
  ISFJ: {
    headline: "รักแบบอยู่ตรงนั้นเสมอ",
    hook: "คุณรักแบบไม่เรียกร้องเสียงปรบมือ แต่คนที่ได้รับจะจำความอุ่นนั้นได้นาน",
    insight: "คุณเป็นพื้นที่ปลอดภัยของคนอื่นผ่านความใส่ใจที่สม่ำเสมอและไม่เรียกร้อง",
    peopleFeel: "อยู่ใกล้คุณแล้วเหมือนมีที่พักใจที่ไม่ต้องอธิบายเยอะ",
    blindSpot: "อย่าทำดีจนตัวเองเหนื่อยแล้วบอกว่าไม่เป็นไร",
    careTip: "การขอให้คนอื่นช่วยบ้าง ไม่ได้ทำให้คุณเป็นภาระ",
  },
  ENTP: {
    headline: "รักแบบทำให้ทุกวันไม่น่าเบื่อ",
    hook: "คุณรักด้วยการเปิดประตูใหม่ ๆ ให้คนหลุดจากกรอบเดิมของตัวเอง",
    insight: "คุณพาความสัมพันธ์ออกจากกรอบเดิม ๆ ด้วยมุก ไอเดีย และการชวนคิด",
    peopleFeel: "อยู่ใกล้คุณแล้วเรื่องหนัก ๆ อาจกลายเป็นบทสนทนาที่หายใจได้",
    blindSpot: "บางเรื่องไม่ต้องชนะด้วยเหตุผล แค่ฟังให้จบก็พอ",
    careTip: "เก็บพลังโต้กลับไว้ แล้วใช้ความฉลาดของคุณปลอบคนตรงหน้า",
  },
  INTP: {
    headline: "รักแบบเงียบ ๆ แต่สังเกตตลอด",
    hook: "คุณอาจไม่หวาน แต่คุณจำ pattern ของคนสำคัญแม่นกว่าที่เขาคิด",
    insight: "คุณอาจไม่พูดหวาน แต่คุณจำ pattern ของคนสำคัญและพยายามเข้าใจเขาจริง ๆ",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่ามีใครกำลังพยายามเข้าใจอย่างจริงจัง",
    blindSpot: "อย่าวิเคราะห์ความรู้สึกจนลืมรู้สึกไปกับเขา",
    careTip: "ประโยคง่าย ๆ อย่าง 'ฉันอยู่ตรงนี้นะ' มีพลังมากกว่าที่คิด",
  },
  ESTP: {
    headline: "รักแบบลงมือทันที ไม่ปล่อยให้จม",
    hook: "คุณไม่ปล่อยให้คนสำคัญจมอยู่กับความหนัก ถ้าช่วยได้คุณจะขยับก่อน",
    insight: "คุณพาคนออกจากความเครียดด้วยการขยับ ทำ เล่น แก้ และอยู่กับสถานการณ์จริง",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่าปัญหามีทางออกที่จับต้องได้",
    blindSpot: "ไม่ใช่ทุกปัญหาต้องรีบแก้ บางปัญหาต้องถูกฟังก่อน",
    careTip: "ถามว่า 'อยากให้ช่วย หรืออยากให้ฟัง' แล้วคุณจะน่ารักขึ้นมาก",
  },
  ISTP: {
    headline: "รักแบบซ่อมสิ่งที่พังโดยไม่พูดเยอะ",
    hook: "คุณรักผ่านการทำให้ชีวิตอีกฝ่ายเบาขึ้น แม้ไม่ได้ประกาศว่าทำเพื่อเขา",
    insight: "คุณแสดงความรักด้วยการแก้ปัญหาเล็ก ๆ ให้ชีวิตอีกฝ่ายเบาขึ้น",
    peopleFeel: "อยู่ใกล้คุณแล้วรู้สึกว่าความยุ่งยากค่อย ๆ ถูกคลี่ออก",
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

const traitShareCopy: Record<string, string> = {
  E: "คุณเป็นฝ่ายเดินเข้าไปหา ทำให้คนรอบตัวรู้สึกว่าเขาไม่ได้อยู่ลำพัง",
  S: "คุณรักผ่านรายละเอียดเล็ก ๆ ที่คนอื่นอาจมองข้าม",
  T: "คุณช่วยทำให้เรื่องที่ยุ่งกลับมาชัดและจัดการได้",
  J: "คุณสร้างจังหวะที่ทำให้ความสัมพันธ์รู้สึกมั่นคงขึ้น",
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

function getRelationshipMap(
  topTrait: { key: string; title: string },
  secondTrait: { key: string; title: string },
  petName: string
) {
  return `${petName} เด่นที่ "${topTrait.title}" และมี "${secondTrait.title}" คอยเสริม แปลว่าคุณไม่ได้แค่รักแบบเดียว แต่ปรับวิธีดูแลคนตามสถานการณ์ได้ดี`;
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  const words = text.includes(" ")
    ? text.split(/(\s+)/).filter((part) => part.trim())
    : Array.from(text);
  const lines: string[] = [];
  let line = "";

  words.forEach((word) => {
    const hasSpace = text.includes(" ");
    const nextLine = line ? `${line}${hasSpace ? " " : ""}${word}` : word;
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

function drawRoundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height
  );
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    if (canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Unable to create image blob"));
        }
      }, "image/png");
      return;
    }

    const dataUrl = canvas.toDataURL("image/png");
    const binary = atob(dataUrl.split(",")[1] || "");
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    resolve(new Blob([bytes], { type: "image/png" }));
  });
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
  const [saving, setSaving] = useState(false);
  const [shareHint, setShareHint] = useState(false);

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
  const secondTrait = [...statRows].sort((a, b) => b.value - a.value)[1] || topTrait;
  const relationshipMap = getRelationshipMap(topTrait, secondTrait, pet.name);
  const mbtiTierMap: Record<
    string,
    { label: string; sub: string; tone: string }
  > = {
    ESTP: { label: "ELITE", sub: "แมวสายลุย", tone: "elite" },
    INFP: { label: "MASTER", sub: "แมวนักฝัน", tone: "master" },
    ISFP: { label: "GRANDMASTER", sub: "แมวสายติสท์", tone: "grandmaster" },
    ISTP: { label: "GRANDMASTER", sub: "แมวอินดี้", tone: "grandmaster" },
    ESFP: { label: "EPIC", sub: "แมวสายจอย", tone: "epic" },
    INTP: { label: "EPIC", sub: "แมวนักวิเคราะห์", tone: "epic" },
    ESFJ: { label: "LEGEND", sub: "แมวนักเทคแคร์", tone: "legend" },
    ISTJ: { label: "LEGEND", sub: "แมวสายเป๊ะ", tone: "legend" },
    ENTP: { label: "MYTHIC", sub: "แมวสายปั่น", tone: "mythic" },
    ISFJ: { label: "MYTHIC", sub: "แมวหน่วยซัพพอร์ต", tone: "mythic" },
    ENFP: { label: "MYTHICAL HONOR", sub: "แมวจอมร่าเริง", tone: "mythical-honor" },
    ESTJ: { label: "MYTHICAL HONOR", sub: "แมวสายคุมกฏ", tone: "mythical-honor" },
    ENFJ: { label: "MYTHICAL GLORY", sub: "แมวยอดนักฮีล", tone: "mythical-glory" },
    INTJ: { label: "MYTHICAL GLORY", sub: "แมวนักวางแผน", tone: "mythical-glory" },
    ENTJ: { label: "MYTHICAL IMMORTAL", sub: "แมวจอมบงการ", tone: "mythical-immortal" },
    INFJ: { label: "MYTHICAL IMMORTAL", sub: "แมวสายหยั่งรู้", tone: "mythical-immortal" },
  };
  const tier = mbtiTierMap[pet.mbti] || mbtiTierMap[mbtiType] || mbtiTierMap.ESTP;
  const keywords = [
    topTrait.title,
    secondTrait.title,
    getReadableLoveLanguage(pet.loveLanguage),
  ];
  const compactInsightCopy: Record<
    string,
    { feel: string; gift: string; tip: string }
  > = {
    E: {
      feel: "ไม่ปล่อยให้ใครเหงา",
      gift: "กล้าเข้าหาก่อน",
      tip: "ฟังให้จบก่อนช่วย",
    },
    S: {
      feel: "เรื่องเล็ก ๆ ถูกเห็น",
      gift: "จำรายละเอียดเก่ง",
      tip: "บอกใจตัวเองบ้าง",
    },
    T: {
      feel: "ปัญหาดูชัดขึ้น",
      gift: "ช่วยจัดความคิด",
      tip: "นุ่มก่อนแก้ปัญหา",
    },
    J: {
      feel: "อยู่ด้วยแล้วมั่นคง",
      gift: "ทำให้ใจปลอดภัย",
      tip: "ยืดหยุ่นอีกนิด",
    },
  };
  const compactInsights = compactInsightCopy[topTrait.key] || compactInsightCopy.E;
  const allTypes = [
    "ESTJ",
    "ENTJ",
    "INTJ",
    "ISTJ",
    "ESFP",
    "ENFP",
    "ISFP",
    "INFP",
    "ENTP",
    "INTP",
    "ESTP",
    "ISTP",
    "ESFJ",
    "ENFJ",
    "INFJ",
    "ISFJ",
  ];
  const gangCats = allTypes
    .filter((type) => type !== pet.mbti)
    .sort((left, right) => {
      const leftMatch = Array.from(left).filter(
        (letter, index) => letter === pet.mbti[index]
      ).length;
      const rightMatch = Array.from(right).filter(
        (letter, index) => letter === pet.mbti[index]
      ).length;
      return rightMatch - leftMatch;
    })
    .slice(0, 4)
    .map((type) => getResultCat(type))
    .filter(Boolean);

  const createResultImageBlob = async () => {
    await document.fonts?.ready;

    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1920;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to create share canvas");

    const brandRed = "#e60012";
    const ink = "#243047";
    const muted = "#697386";

    // 1. Background Gradient
    const gradient = context.createLinearGradient(0, 0, canvas.width, 1920);
    gradient.addColorStop(0, "#eef8fc");
    gradient.addColorStop(0.5, "#ffffff");
    gradient.addColorStop(1, "#fff3c4");
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Top Pill
    context.fillStyle = "#ffffff";
    drawRoundedRect(context, 200, 80, 680, 60, 30);
    context.fill();
    context.fillStyle = brandRed;
    drawRoundedRect(context, 206, 86, 320, 48, 24);
    context.fill();
    
    context.fillStyle = "#ffffff";
    context.font = "700 22px 'IBM Plex Sans Thai', sans-serif";
    context.textAlign = "center";
    context.fillText("✦ การ์ดผลลัพธ์ของคุณ", 366, 118);
    context.fillStyle = brandRed;
    context.fillText("Unspoken Bond", 710, 118);

    // 3. Title
    context.fillStyle = brandRed;
    context.font = "800 64px 'Mali', sans-serif";
    context.fillText("ฉันเป็นแมว ?", 540, 240);

    // 4. Cat Image
    if (pet.image) {
      const catImage = await loadShareImage(withAssetVersion(pet.image));
      const drawWidth = 560;
      const drawHeight = (catImage.height * drawWidth) / catImage.width;
      const drawX = (1080 - drawWidth) / 2;
      const drawY = 280;
      context.drawImage(catImage, drawX, drawY, drawWidth, drawHeight);
    }

    // 5. Rank Badge
    const badgeY = 780;
    const badgeGrad = context.createLinearGradient(240, badgeY, 840, badgeY);
    badgeGrad.addColorStop(0, "#b164e8");
    badgeGrad.addColorStop(1, "#5cd1ff");
    context.fillStyle = badgeGrad;
    drawRoundedRect(context, 240, badgeY, 600, 100, 50);
    context.fill();
    context.fillStyle = "#ffffff";
    context.font = "900 36px 'IBM Plex Sans Thai', sans-serif";
    context.fillText(tier.label.toUpperCase(), 540, badgeY + 44);
    context.font = "700 24px 'IBM Plex Sans Thai', sans-serif";
    context.fillText(tier.sub, 540, badgeY + 76);

    // 6. Name Lockup
    context.fillStyle = brandRed;
    drawRoundedRect(context, 440, 920, 200, 60, 30);
    context.fill();
    context.fillStyle = "#ffffff";
    context.font = "800 32px 'IBM Plex Sans Thai', sans-serif";
    context.fillText(pet.mbti, 540, 962);

    context.fillStyle = ink;
    context.font = "800 64px 'Mali', sans-serif";
    context.fillText(pet.name, 540, 1080);

    context.fillStyle = muted;
    context.font = "700 28px 'IBM Plex Sans Thai', sans-serif";
    context.fillText(profile.headline, 540, 1130);

    // 7. Insight Box
    context.fillStyle = "rgba(255, 255, 255, 0.8)";
    drawRoundedRect(context, 60, 1170, 960, 280, 40);
    context.fill();
    context.strokeStyle = "rgba(255, 255, 255, 1)";
    context.lineWidth = 4;
    context.stroke();

    context.fillStyle = ink;
    context.font = "800 30px 'IBM Plex Sans Thai', sans-serif";
    wrapCanvasText(context, profile.hook, 860).forEach((line, i) => {
        context.fillText(line, 540, 1230 + i * 40);
    });

    const boxW = 280;
    const boxY = 1300;
    const boxGap = 30;
    const boxX1 = 540 - boxW - boxGap;
    const boxX2 = 540;
    const boxX3 = 540 + boxW + boxGap;

    const drawSmallBox = (x: number, title: string, text: string, bg: string) => {
        context.fillStyle = bg;
        drawRoundedRect(context, x - boxW/2, boxY, boxW, 120, 24);
        context.fill();
        context.fillStyle = brandRed;
        context.font = "800 22px 'IBM Plex Sans Thai', sans-serif";
        context.textAlign = "left";
        context.fillText(title, x - boxW/2 + 24, boxY + 36);
        context.fillStyle = ink;
        context.font = "700 22px 'IBM Plex Sans Thai', sans-serif";
        wrapCanvasText(context, text, 240).forEach((line, i) => {
            context.fillText(line, x - boxW/2 + 24, boxY + 70 + i * 32);
        });
        context.textAlign = "center";
    };

    drawSmallBox(boxX1, "ฟีลที่ให้", compactInsights.feel, "#f0f8ff");
    drawSmallBox(boxX2, "จุดเด่น", compactInsights.gift, "#fffdf0");
    drawSmallBox(boxX3, "ทริคเล็กๆ", compactInsights.tip, "#fff0f5");

    // 8. Gang Cats
    context.fillStyle = ink;
    context.font = "800 32px 'IBM Plex Sans Thai', sans-serif";
    context.fillText("แมวตัวอื่นที่เข้ากับคุณ", 540, 1530);

    const gangW = 180;
    const gangGap = 40;
    const gangStartX = 540 - (gangW * 1.5 + gangGap * 1.5);
    
    for (let i = 0; i < gangCats.length; i++) {
        const cat = gangCats[i];
        const x = gangStartX + i * (gangW + gangGap);
        context.fillStyle = "#ffffff";
        drawRoundedRect(context, x, 1570, gangW, 200, 30);
        context.fill();
        
        if (cat?.image) {
            const catImg = await loadShareImage(withAssetVersion(cat.image));
            context.drawImage(catImg, x + 20, 1590, 140, 140);
        }
        
        context.fillStyle = muted;
        context.font = "800 24px 'IBM Plex Sans Thai', sans-serif";
        context.fillText(cat?.mbti || "", x + gangW/2, 1740);
    }

    // 9. Bottom Link
    context.fillStyle = "#ffffff";
    drawRoundedRect(context, 80, 1820, 920, 80, 40);
    context.fill();
    context.fillStyle = brandRed;
    context.font = "800 32px 'IBM Plex Sans Thai', sans-serif";
    context.fillText("เล่นได้ที่ https://foundy.tigerfoundationtech.co.th/", 540, 1872);

    return canvasToBlob(canvas);
  };

  const downloadBlob = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "unspoken-bond-result.png";
    a.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  const handleShare = async () => {
    setSharing(true);

    try {
      const blob = await createResultImageBlob();
      const file = new File([blob], "unspoken-bond-result.png", {
        type: "image/png",
      });

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({
            title: "Unspoken Bond Quiz",
            text: `แมวตัวนี้คือวิธีที่ฉันรักคนอื่น: ${pet.name} (${pet.mbti})`,
            files: [file],
          });
          setShareHint(true);
          setSharing(false);
          return;
        } catch {
          /* fallback below */
        }
      }

      downloadBlob(blob);
      setShareHint(true);
      setSharing(false);
    } catch {
      setSharing(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const blob = await createResultImageBlob();
      downloadBlob(blob);
      setShareHint(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="quiz-page">
      <div className="phone-screen result-screen relative animate-fadeIn">
        <SoundToggle />

        <section ref={shareRef} className="result-collect-card" aria-label="การ์ดผลลัพธ์">
          <div className="result-stage-top">
            <span>การ์ดผลลัพธ์ของคุณ</span>
            <strong>Unspoken Bond</strong>
          </div>
          <h1 className="result-main-title">ฉันเป็นแมว ?</h1>

          <div className="result-cat-portrait">
            {pet.image && (
              <img src={withAssetVersion(pet.image)} alt={`${pet.name} result`} />
            )}
            <div className={`result-rank-medal ${tier.tone}`}>
              <span>{tier.label}</span>
              <small>{tier.sub}</small>
            </div>
          </div>

          <div className="result-name-lockup">
            <span>{pet.mbti}</span>
            <h2>{pet.name}</h2>
            <p>{profile.headline}</p>
          </div>

          <div className="result-detail-card">
            <p className="result-summary">{profile.hook}</p>

            <div className="result-simple-insights" aria-label="สรุปผลลัพธ์หลัก">
              <article>
                <span>ฟีลที่ให้</span>
                <strong>{compactInsights.feel}</strong>
              </article>
              <article>
                <span>จุดเด่น</span>
                <strong>{compactInsights.gift}</strong>
              </article>
              <article>
                <span>ทริคเล็ก ๆ</span>
                <strong>{compactInsights.tip}</strong>
              </article>
            </div>

            <div className="result-party">
              <h3>แมวตัวอื่นที่เข้ากับคุณ</h3>
              <div className="result-gang-row">
                {gangCats.map((cat) => (
                  <div className="result-gang-card" key={cat?.mbti}>
                    {cat?.image && (
                      <img src={withAssetVersion(cat.image)} alt="" aria-hidden="true" />
                    )}
                    <span>{cat?.mbti}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="result-actions">
          <button
            className="btn-dark"
            onClick={handleShare}
            disabled={sharing || saving}
          >
            {sharing ? "กำลังสร้างรูป..." : "แชร์ลง Story"}
          </button>
          <button
            className="btn-handdrawn"
            onClick={handleSave}
            disabled={sharing || saving}
          >
            {saving ? "กำลังบันทึกรูป..." : "Download Image"}
          </button>
          <button className="btn-handdrawn" onClick={onRetake}>
            เล่นใหม่
          </button>
        </div>

        <section className="result-world-panel">
          <div className="result-aura-banner" style={{ background: `linear-gradient(135deg, ${pet.auraColor}15, ${pet.auraColor}33)`, border: `2px solid ${pet.auraColor}55` }}>
             <div className="aura-icon-box" style={{ background: pet.auraColor }}>✦</div>
             <div className="aura-info" style={{ gap: '4px' }}>
               <span>ออร่าของคุณ</span>
               <strong style={{ color: pet.auraColor, lineHeight: '1.2' }}>{auraColorName}</strong>
             </div>
          </div>

          <div className="result-chart-box">
            <h3>สัดส่วนวิธีรักของคุณ</h3>
            <div className="result-chart-bars">
              {statRows.map((row) => (
                <div className="chart-bar-item" key={row.key}>
                  <div className="chart-bar-header">
                    <span className="chart-bar-title">{row.title}</span>
                    <strong className="chart-bar-score" style={{ color: row.color }}>{row.value}</strong>
                  </div>
                  <div className="chart-bar-track-bg">
                    <div className="chart-bar-fill" style={{ width: row.width, backgroundColor: row.color }} />
                  </div>
                  <p className="chart-bar-desc">{row.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="result-insight-grid">
          <div className="result-insight-card">
            <span>แผนที่วิธีรัก</span>
            <strong>{relationshipMap}</strong>
          </div>
          <div className="result-insight-card">
            <span>จุดที่ควรรู้ตัว</span>
            <strong>{profile.blindSpot}</strong>
          </div>
        </div>

      </div>
    </div>
  );
}
