import { useMusicPlayer } from "@/contexts/MusicContext";

export default function SoundToggle() {
  const { isSoundOn, toggleSound } = useMusicPlayer();

  return (
    <button
      className="sound-btn"
      onClick={toggleSound}
      aria-label={isSoundOn ? "ปิดเสียง" : "เปิดเสียง"}
    >
      {isSoundOn ? "ON" : "OFF"}
    </button>
  );
}
