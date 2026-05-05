/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StartScreen, EndScreen } from './components/Screens';
import { Game } from './components/Game';

export type GameState = 'START' | 'PLAYING' | 'FINISHED';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('START');
  const [score, setScore] = useState(0);

  // Prevent scrolling on mobile for better game experience
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    };
  }, []);

  const startGame = () => {
    setScore(0);
    setGameState('PLAYING');
  };

  const finishGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState('FINISHED');
  };

  return (
    <div className="fixed inset-0 bg-[#0F172A] text-white font-sans overflow-hidden select-none">
      <AnimatePresence mode="wait">
        {gameState === 'START' && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <StartScreen onStart={startGame} />
          </motion.div>
        )}

        {gameState === 'PLAYING' && (
          <motion.div
            key="game"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            className="h-full"
          >
            <Game onFinish={finishGame} />
          </motion.div>
        )}

        {gameState === 'FINISHED' && (
          <motion.div
            key="end"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="h-full"
          >
            <EndScreen score={score} onRestart={startGame} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
