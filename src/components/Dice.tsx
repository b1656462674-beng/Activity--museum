/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dices } from 'lucide-react';

interface DiceProps {
  onRoll: (value: number) => void;
  disabled?: boolean;
  diceCount: number;
}

export default function Dice({ onRoll, disabled, diceCount }: DiceProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentValue, setCurrentValue] = useState(1);

  const handleRoll = () => {
    if (isRolling || disabled || diceCount <= 0) return;

    setIsRolling(true);
    
    // Animation duration
    const duration = 1000;
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      setCurrentValue(Math.floor(Math.random() * 6) + 1);
      if (Date.now() - startTime > duration) {
        clearInterval(interval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setCurrentValue(finalValue);
        setIsRolling(false);
        onRoll(finalValue);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <motion.div
          animate={isRolling ? {
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1],
            x: [0, -10, 10, -5, 5, 0],
            y: [0, -20, 0]
          } : {}}
          transition={{ duration: 0.5, repeat: isRolling ? Infinity : 0 }}
          className={`w-20 h-20 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-amber-900/10 ${disabled || diceCount <= 0 ? 'opacity-50 grayscale' : 'cursor-pointer'}`}
          onClick={handleRoll}
        >
          <div className="grid grid-cols-3 grid-rows-3 gap-1 w-12 h-12">
            {getDots(currentValue).map((dot, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${dot ? 'bg-amber-900' : 'bg-transparent'}`} />
            ))}
          </div>
        </motion.div>
        
        {/* Dice Count Badge */}
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
          {diceCount}
        </div>
      </div>

      <button
        onClick={handleRoll}
        disabled={isRolling || disabled || diceCount <= 0}
        className={`px-8 py-3 bg-amber-800 text-white rounded-full font-bold shadow-lg transform transition hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
      >
        <Dices size={20} />
        {isRolling ? '前进中...' : '摇骰子'}
      </button>
    </div>
  );
}

function getDots(value: number) {
  const dots = Array(9).fill(false);
  switch (value) {
    case 1: dots[4] = true; break;
    case 2: dots[0] = true; dots[8] = true; break;
    case 3: dots[0] = true; dots[4] = true; dots[8] = true; break;
    case 4: dots[0] = true; dots[2] = true; dots[6] = true; dots[8] = true; break;
    case 5: dots[0] = true; dots[2] = true; dots[4] = true; dots[6] = true; dots[8] = true; break;
    case 6: dots[0] = true; dots[2] = true; dots[3] = true; dots[5] = true; dots[6] = true; dots[8] = true; break;
  }
  return dots;
}
