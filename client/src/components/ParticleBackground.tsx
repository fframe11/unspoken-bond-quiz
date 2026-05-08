import { useEffect, useRef } from "react";

type ConfettiPiece = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  baseO: number;
  o: number;
  phase: number;
  rotation: number;
  spin: number;
  color: string;
  shape: "dot" | "dash" | "plus";
};

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const pieces: ConfettiPiece[] = [];
    const colors = [
      "239,68,68",
      "56,189,248",
      "52,211,153",
      "251,191,36",
      "244,114,182",
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 42; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 5 + 3,
        dx: (Math.random() - 0.5) * 0.18,
        dy: (Math.random() - 0.5) * 0.18,
        baseO: Math.random() * 0.22 + 0.08,
        o: 0,
        phase: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        shape: ["dot", "dash", "plus"][
          Math.floor(Math.random() * 3)
        ] as ConfettiPiece["shape"],
      });
    }

    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      for (const p of pieces) {
        p.x += p.dx;
        p.y += p.dy;
        p.rotation += p.spin;

        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;

        p.o = p.baseO * (0.6 + 0.4 * Math.sin(time * 2 + p.phase));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `rgba(${p.color},${p.o})`;
        ctx.strokeStyle = `rgba(${p.color},${p.o})`;
        ctx.lineWidth = 2;

        if (p.shape === "dot") {
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === "dash") {
          ctx.fillRect(-p.r, -1.5, p.r * 2, 3);
        } else {
          ctx.beginPath();
          ctx.moveTo(-p.r, 0);
          ctx.lineTo(p.r, 0);
          ctx.moveTo(0, -p.r);
          ctx.lineTo(0, p.r);
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
