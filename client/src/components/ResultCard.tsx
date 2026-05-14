import { calculateMBTI, getResultCat } from "@/lib/quizDataNew";
import SoundToggle from "@/components/SoundToggle";
import { withAssetVersion } from "@/lib/assets";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import html2canvas from "html2canvas";

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
    if (!shareRef.current) throw new Error("Share reference not found");

    // Capture the exact DOM node that displays the UI
    const canvas = await html2canvas(shareRef.current, {
      scale: 2, // Higher resolution
      useCORS: true, // Allow external images
      backgroundColor: "#f7f7f2",
      windowWidth: 460, // Mimic mobile width so styling matches what user sees
    });

    return new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas to Blob conversion failed"));
      }, "image/png");
    });
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

        {shareHint && (
          <div className="result-forward-prompt" role="status">
            ส่งให้เพื่อนเล่นต่อ แล้วดูว่าเขาเป็นแมวที่รักคนแบบไหน
          </div>
        )}

        <section className="result-world-panel">
          <div className="result-map-header">
            <span>รายละเอียดวิธีรักของคุณ</span>
            <strong>{auraColorName}</strong>
          </div>

          <div className="result-world-track" aria-label="สรุปพลังรัก 4 ด้าน">
            {statRows.map((row, index) => (
              <div
                className="result-world-node"
                key={row.key}
                style={{ "--node-color": row.color } as CSSProperties}
              >
                <div className="result-node-flag">LV.{index + 1}</div>
                <div className="result-node-block">
                  <strong>{row.value}</strong>
                </div>
                <div className="result-node-copy">
                  <strong>{row.title}</strong>
                  <p>{row.summary}</p>
                </div>
              </div>
            ))}
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
