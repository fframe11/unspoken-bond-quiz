import { Music2, Pause } from "lucide-react";
import { useMusicPlayer } from "@/contexts/MusicContext";

export default function SoundToggle() {
  const { isSoundOn, toggleSound } = useMusicPlayer();

  return (
    <button
      className={`sound-btn ${isSoundOn ? "is-playing" : ""}`}
      onClick={toggleSound}
      aria-label={isSoundOn ? "หยุดเพลง" : "เปิดเพลงประกอบ"}
      title={isSoundOn ? "หยุดเพลง" : "เปิดเพลงประกอบ"}
    >
      {isSoundOn ? (
        <Pause size={18} aria-hidden="true" />
      ) : (
        <Music2 size={18} aria-hidden="true" />
      )}
      <span>เพลง</span>
    </button>
  );
}
