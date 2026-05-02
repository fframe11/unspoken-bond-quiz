import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";

interface MusicContextType {
  isSoundOn: boolean;
  toggleSound: () => void;
}

const MusicContext = createContext<MusicContextType>({
  isSoundOn: false,
  toggleSound: () => {},
});

export function useMusicPlayer() {
  return useContext(MusicContext);
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/Velvet_Paws_on_Wood.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleSound = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isSoundOn) {
      audio.pause();
      setIsSoundOn(false);
    } else {
      audio.volume = 0.25;
      audio.play().catch((e) => console.log("Waiting for user interaction before playing audio"));
      setIsSoundOn(true);
    }
  }, [isSoundOn]);

  return (
    <MusicContext.Provider value={{ isSoundOn, toggleSound }}>
      {children}
    </MusicContext.Provider>
  );
}
