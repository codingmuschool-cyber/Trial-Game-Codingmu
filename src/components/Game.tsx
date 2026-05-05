import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

interface GameProps {
  onFinish: (score: number) => void;
}

interface GameObject {
  x: number;
  y: number;
  size: number;
  speed: number;
  type: 'code' | 'bug';
  symbol: string;
  color: string;
}

export function Game({ onFinish }: GameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const scoreRef = useRef(0);
  const timeLeftRef = useRef(20);
  const playerX = useRef(0);
  const objects = useRef<GameObject[]>([]);
  const animationFrameId = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const spawnTimer = useRef<number>(0);

  const symbols = ['{}', '</>', '[]', '()', 'if', 'for'];
  const colors = ['#60A5FA', '#34D399', '#F472B6', '#A78BFA'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      playerX.current = canvas.width / 2;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      playerX.current = x;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchstart', handleMove);
    window.addEventListener('touchmove', handleMove);

    const spawnObject = () => {
      const isBug = Math.random() < 0.2;
      const size = 40 + Math.random() * 20;
      objects.current.push({
        x: Math.random() * (canvas.width - size),
        y: -size,
        size,
        speed: 3 + Math.random() * 4 + (20 - timeLeftRef.current) * 0.2,
        type: isBug ? 'bug' : 'code',
        symbol: isBug ? '👾' : symbols[Math.floor(Math.random() * symbols.length)],
        color: isBug ? '#EF4444' : colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const update = (time: number) => {
      const deltaTime = time - lastTime.current;
      lastTime.current = time;

      // Update timer
      spawnTimer.current += deltaTime;
      if (spawnTimer.current > 600) {
        spawnObject();
        spawnTimer.current = 0;
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Player
      const playerSize = 60;
      const playerY = canvas.height - 100;
      
      // Draw player glow
      const gradient = ctx.createRadialGradient(playerX.current, playerY, 0, playerX.current, playerY, playerSize);
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.4)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(playerX.current, playerY, playerSize * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw player (Robot)
      ctx.fillStyle = '#3B82F6';
      ctx.beginPath();
      ctx.roundRect(playerX.current - playerSize/2, playerY - playerSize/2, playerSize, playerSize, 12);
      ctx.fill();
      
      // Eyes
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(playerX.current - 15, playerY - 5, 6, 0, Math.PI * 2);
      ctx.arc(playerX.current + 15, playerY - 5, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Antenna
      ctx.strokeStyle = '#3B82F6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(playerX.current, playerY - playerSize/2);
      ctx.lineTo(playerX.current, playerY - playerSize/2 - 15);
      ctx.stroke();
      ctx.fillStyle = '#60A5FA';
      ctx.beginPath();
      ctx.arc(playerX.current, playerY - playerSize/2 - 15, 6, 0, Math.PI * 2);
      ctx.fill();

      // Update and Draw Objects
      objects.current = objects.current.filter(obj => {
        obj.y += obj.speed;

        // Collision detection
        const dx = obj.x + obj.size/2 - playerX.current;
        const dy = obj.y + obj.size/2 - playerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (obj.size/2 + playerSize/2)) {
          if (obj.type === 'code') {
            scoreRef.current += 10;
            setScore(scoreRef.current);
            // Visual feedback
            ctx.fillStyle = 'white';
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText('+10', obj.x, obj.y);
          } else {
            scoreRef.current = Math.max(0, scoreRef.current - 20);
            setScore(scoreRef.current);
            // Shake effect could go here
          }
          return false;
        }

        // Draw Object
        ctx.save();
        ctx.shadowBlur = 15;
        ctx.shadowColor = obj.color;
        ctx.fillStyle = obj.color;
        
        if (obj.type === 'code') {
          ctx.beginPath();
          ctx.roundRect(obj.x, obj.y, obj.size, obj.size, 8);
          ctx.fill();
          ctx.fillStyle = 'white';
          ctx.font = `bold ${obj.size * 0.4}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(obj.symbol, obj.x + obj.size/2, obj.y + obj.size/2);
        } else {
          ctx.font = `${obj.size}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(obj.symbol, obj.x + obj.size/2, obj.y + obj.size/2);
        }
        ctx.restore();

        return obj.y < canvas.height;
      });

      animationFrameId.current = requestAnimationFrame(update);
    };

    animationFrameId.current = requestAnimationFrame(update);

    const timerInterval = setInterval(() => {
      timeLeftRef.current -= 1;
      setTimeLeft(timeLeftRef.current);
      if (timeLeftRef.current <= 0) {
        clearInterval(timerInterval);
        cancelAnimationFrame(animationFrameId.current);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(() => onFinish(scoreRef.current), 1000);
      }
    }, 1000);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleMove);
      window.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(animationFrameId.current);
      clearInterval(timerInterval);
    };
  }, [onFinish]);

  return (
    <div className="relative w-full h-full bg-[#0F172A]">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {/* HUD */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-xl">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Score</p>
          <p className="text-3xl font-black tabular-nums">{score}</p>
        </div>
        
        <div className={`px-6 py-3 rounded-2xl border backdrop-blur-md shadow-xl transition-colors ${
          timeLeft <= 5 ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-white/10 border-white/10 text-white'
        }`}>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">Time</p>
          <p className="text-3xl font-black tabular-nums">{timeLeft}s</p>
        </div>
      </div>

      {/* Instructions Overlay (fades out) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-fade-out pointer-events-none">
        <div className="text-center space-y-2 opacity-50">
          <p className="text-xl font-bold">Geser untuk Tangkap Kode!</p>
          <p className="text-sm">Hindari Bug Merah 👾</p>
        </div>
      </div>
    </div>
  );
}
