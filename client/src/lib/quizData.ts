// MBTI Pet Quiz Data Structure
// Unspoken Bond - สายใยไร้เสียง

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    scores: {
      E?: number;
      I?: number;
      S?: number;
      N?: number;
      T?: number;
      F?: number;
      J?: number;
      P?: number;
    };
  }[];
}

export interface Pet {
  mbti: string;
  name: string;
  nameThai: string;
  description: string;
  image: string;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "เจ้าของกลับมาถึงบ้านด้วยท่าทางเหนื่อยล้า เขาโยนกระเป๋าลงแล้วนั่งถอนหายใจ คุณจะทำอย่างไร?",
    options: [
      {
        text: "เดินเข้าไปคลอเคลียเงียบๆ ให้เขารู้ว่าเราอยู่ตรงนี้",
        scores: { I: 1, F: 1 },
      },
      {
        text: "กระโดดโลดเต้น ชวนเขาเล่นเพื่อลืมความเหนื่อย",
        scores: { E: 1, P: 1 },
      },
      {
        text: "นั่งมองห่างๆ ประเมินสถานการณ์ว่าเขาต้องการอะไร",
        scores: { I: 1, T: 1 },
      },
      {
        text: "วิ่งไปคาบของเล่นหรือของโปรดมาอวดเขา",
        scores: { E: 1, S: 1 },
      },
    ],
  },
  {
    id: 2,
    text: "คืนนี้ฝนตกหนักและฟ้าร้องดังมาก เจ้าของดูเหมือนจะหลับไม่สนิท คุณล่ะ?",
    options: [
      {
        text: "ซุกตัวนอนข้างๆ เขา เพื่อให้ความอบอุ่นและรู้สึกปลอดภัยทั้งคู่",
        scores: { S: 1, J: 1 },
      },
      {
        text: "ตื่นตัว คอยเฝ้าระวังเสียงรอบบ้าน เผื่อมีอะไรผิดปกติ",
        scores: { S: 1, T: 1 },
      },
      {
        text: "จินตนาการว่าเสียงฟ้านั้นคือเสียงดนตรี แล้วนอนฝันหวานต่อ",
        scores: { N: 1, P: 1 },
      },
      {
        text: "สังเกตอาการเจ้าของ ถ้าเขาดูแย่จะเข้าไปสะกิดปลอบ",
        scores: { N: 1, F: 1 },
      },
    ],
  },
  {
    id: 3,
    text: "เช้าวันหยุด เจ้าของอยากนอนตื่นสาย แต่คุณหิวแล้ว!",
    options: [
      {
        text: "อดทนรอจนกว่าเขาจะตื่นเอง ไม่อยากกวนเวลาพักผ่อน",
        scores: { I: 1, J: 1 },
      },
      {
        text: "ส่งเสียงเรียกหรือสะกิดเบาๆ เป็นจังหวะจนกว่าเขาจะลุก",
        scores: { E: 1, J: 1 },
      },
      {
        text: "หาอะไรทำแก้เบื่อไปก่อน เดี๋ยวเขาก็ตื่นมาเองแหละ",
        scores: { P: 1, S: 1 },
      },
      {
        text: "พยายามหาวิธีเปิดตู้เก็บอาหารด้วยตัวเอง",
        scores: { T: 1, P: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "มีแขกแปลกหน้ามาเยี่ยมบ้าน เจ้าของดูตื่นเต้นที่ได้เจอเพื่อน",
    options: [
      {
        text: "วิ่งไปต้อนรับแขกเหมือนเป็นเพื่อนเก่า",
        scores: { E: 1, S: 1 },
      },
      {
        text: "แอบดูอยู่ห่างๆ จนกว่าจะแน่ใจว่าปลอดภัย",
        scores: { I: 1, T: 1 },
      },
      {
        text: "เข้าไปดมๆ สำรวจว่าแขกคนนี้ 'พลังงาน' เป็นยังไง",
        scores: { N: 1, S: 1 },
      },
      {
        text: "ทำตัวตามปกติเหมือนไม่มีอะไรเกิดขึ้น",
        scores: { I: 1, S: 1 },
      },
    ],
  },
  {
    id: 5,
    text: "เจ้าของทำแจกันใบโปรดแตกและดูเศร้ามาก",
    options: [
      {
        text: "ช่วยเขาเก็บกวาด (เท่าที่สัตว์จะทำได้) หรือไม่เข้าไปวุ่นวาย",
        scores: { T: 1, J: 1 },
      },
      {
        text: "เข้าไปเลียหน้าปลอบใจ ให้เขารู้ว่าของนอกกายไม่สำคัญเท่าเรา",
        scores: { F: 1, P: 1 },
      },
      {
        text: "นั่งมองแจกันที่แตก แล้วคิดว่า 'มันน่าจะซ่อมได้นะ'",
        scores: { N: 1, T: 1 },
      },
      {
        text: "พยายามเบี่ยงเบนความสนใจให้เขาไปทำอย่างอื่น",
        scores: { E: 1, P: 1 },
      },
    ],
  },
];

export const pets: Record<string, Pet> = {
  ISTJ: {
    mbti: "ISTJ",
    name: "Loyal Tortoise",
    nameThai: "เต่าทองผู้ซื่อสัตย์",
    description:
      "คอยเฝ้าประตูทุกเย็น ทำตามเวลาเป๊ะ ไม่เคยทิ้งเจ้าของแม้โลกจะถล่ม",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_tortoise-T5Xk2rxpqsUtD8PavUPCYn.webp",
  },
  ISFJ: {
    mbti: "ISFJ",
    name: "Silent Guardian Rabbit",
    nameThai: "กระต่ายเงียบผู้พิทักษ์",
    description:
      "นั่งเฝ้าข้างเตียงเงียบ ๆ ให้ความอบอุ่นโดยไม่ต้องพูด",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_rabbit-D8WhJuEnW2oNAiJcTJyxCY.webp",
  },
  INFJ: {
    mbti: "INFJ",
    name: "Understanding Phoenix",
    nameThai: "นกฟินิกซ์ผู้เข้าใจ",
    description:
      "มองทะลุ Aura ได้ลึกที่สุด รู้ว่าเจ้าของเจ็บตรงไหนก่อนที่เจ้าของจะรู้ตัว",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_phoenix-G5xiGsaqtcSLmQW98XQ8MR.webp",
  },
  INTJ: {
    mbti: "INTJ",
    name: "Strategic Sphinx Cat",
    nameThai: "แมวสฟิงซ์นักวางแผน",
    description:
      "เงียบแต่คำนวณทุกอย่าง ช่วยเจ้าของแก้ปัญหาแบบไม่ให้รู้ตัว",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_sphinx_cat-PidHKM5snfPneKA9yfjGjd.webp",
  },
  ISTP: {
    mbti: "ISTP",
    name: "Quick-Fix Ferret",
    nameThai: "เฟอเร็ตเจ้าแผนการ",
    description:
      "ซุกซนแต่แก้ไขสถานการณ์ฉุกเฉินได้ฉับพลัน",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_ferret-TuMbfLo4pKA9AfGTTZ9jfc.webp",
  },
  ISFP: {
    mbti: "ISFP",
    name: "Gentle Panda",
    nameThai: "หมีแพนด้าผู้ละเมียด",
    description:
      "ซ่อนตัวในมุมเงียบ ๆ แล้วค่อย ๆ ปล่อยความอ่อนโยนออกมา",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_panda-jL3HHzE7G9X7ezTJBcUFyK.webp",
  },
  INFP: {
    mbti: "INFP",
    name: "Daydreaming Rabbit",
    nameThai: "กระต่ายลับฝันกลางวัน",
    description:
      "นั่งมองท้องฟ้า แล้วชวนเจ้าของฝันไปด้วยกัน",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_daydream_rabbit-9HnFRoFZawjHYRDjajyFNv.webp",
  },
  INTP: {
    mbti: "INTP",
    name: "Wise Owl Scholar",
    nameThai: "นกฮูกปราชญ์น้อย",
    description:
      "นั่งมองดาว วิเคราะห์ Aura เป็นระบบ แล้วค่อย ๆ แนะนำทาง",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_owl-csAEXnvarSLjHg6F8jopgK.webp",
  },
  ESTP: {
    mbti: "ESTP",
    name: "Brave Fox Adventurer",
    nameThai: "สุนัขจิ้งจอกผู้กล้าหาญ",
    description:
      "ผจญภัยนำหน้า กระโดดข้ามทุกปัญหาให้เจ้าของ",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_fox_brave-dE8w8Wa5KLj7w9TyLuYsTF.webp",
  },
  ESFP: {
    mbti: "ESFP",
    name: "Joyful Songbird",
    nameThai: "นากเพลงร่าเริง",
    description:
      "ว่ายน้ำวน ๆ รอบตัวเจ้าของด้วยพลังบวกแบบไม่หยุด",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_song_bird-QpQUtNi2C5aXc9o9ptzQfR.webp",
  },
  ENFP: {
    mbti: "ENFP",
    name: "Adventure Fox Explorer",
    nameThai: "สุนัขจิ้งจอกนักผจญภัย",
    description:
      "พาเจ้าของไปพบสิ่งใหม่ ๆ ทุกวันด้วยความตื่นเต้น",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_adventure_fox-gUGJiWJZr84HvCSWvXtFBQ.webp",
  },
  ENTP: {
    mbti: "ENTP",
    name: "Clever Monkey",
    nameThai: "ลิงแสมเจ้าไอเดีย",
    description:
      "หยิบของเล่นแปลก ๆ มาให้ แล้วชวนเล่นเกมแก้ปัญหาแบบบ้า ๆ บอ ๆ",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_monkey-7sAN4pvwTzBgyUQgEKGXKW.webp",
  },
  ESTJ: {
    mbti: "ESTJ",
    name: "Golden Retriever Executive",
    nameThai: "สุนัขโกลเด้นราชา",
    description:
      "ผู้นำฝูงตัวจริง จัดระเบียบบ้านและอารมณ์เจ้าของได้หมด",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_golden_dog-i3KxjFUE55zCLiDbVsrCzb.webp",
  },
  ESFJ: {
    mbti: "ESFJ",
    name: "American Shorthair Caregiver",
    nameThai: "แมวอเมริกันชอร์ตแฮร์ผู้ดูแล",
    description:
      "หมุนเวียนไปหาทุกคนในบ้าน ให้ทุกคนรู้สึกว่า 'มีคนคอยดูแล'",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_american_cat-b6WJHLiSYs7UnMWiL8fFEQ.webp",
  },
  ENFJ: {
    mbti: "ENFJ",
    name: "Arabian Horse Supporter",
    nameThai: "ม้าแอเรียบผู้เป็นที่พึ่ง",
    description:
      "สูงสง่าแต่ใจดีสุด ๆ พาเจ้าของไปข้างหน้าเมื่อเขาท้อ",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_horse-kgZ8injU8bvud7qbzf5GtQ.webp",
  },
  ENTJ: {
    mbti: "ENTJ",
    name: "Black Tiger Commander",
    nameThai: "เสือดำผู้บัญชาการ",
    description:
      "มี charisma แรง แม้จะเป็น 'สัตว์เลี้ยง' แต่ดูเหมือนผู้นำตัวจริง",
    image:
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663501179514/VoQPHnonqeTwWnSgD8sgUp/pet_black_tiger-V8wDPLQSvFuvTtpPPHngn3.webp",
  },
};

export function calculateMBTI(answers: number[]): string {
  const scores: Record<string, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  answers.forEach((answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    const selectedOption = question.options[answerIndex];

    Object.entries(selectedOption.scores).forEach(([key, value]) => {
      scores[key] += value;
    });
  });

  const mbti =
    (scores.E >= scores.I ? "E" : "I") +
    (scores.S >= scores.N ? "S" : "N") +
    (scores.T >= scores.F ? "T" : "F") +
    (scores.J >= scores.P ? "J" : "P");

  return mbti;
}

export function getPetResult(mbti: string): Pet {
  return pets[mbti] || pets.ISTJ;
}
