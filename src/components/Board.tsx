/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'motion/react';
import { GRIDS, GRID_COUNT, CONTINENTS } from '../constants/gameData';
import { Gift, Star, HelpCircle, User, HelpCircle as HelpIcon } from 'lucide-react';

interface BoardProps {
  position: number;
  boardCycle: number;
}

export default function Board({ position, boardCycle }: BoardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const continent = CONTINENTS[boardCycle % CONTINENTS.length];
  
  // Calculate offset to center the character
  // Each grid is roughly 100px wide
  const gridWidth = 100;
  const offset = -(position - 1) * gridWidth;

  return (
    <div className={`relative w-full h-64 overflow-hidden border-y-4 border-amber-900/20 ${continent.bg} transition-colors duration-1000`}>
      {/* Continent Label */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`text-2xl font-serif font-bold ${continent.accent} opacity-50`}>
          {continent.name}
        </span>
      </div>

      {/* The Track */}
      <motion.div 
        className="absolute top-0 left-1/2 flex items-center h-full"
        animate={{ x: offset - gridWidth / 2 }}
        transition={{ type: 'spring', stiffness: 50, damping: 15 }}
      >
        {Array.from({ length: GRID_COUNT }).map((_, i) => {
          const gridIndex = i + 1;
          const grid = GRIDS[gridIndex];
          const isCurrent = gridIndex === position;

          return (
            <div 
              key={gridIndex}
              className={`relative flex-shrink-0 w-[100px] h-32 flex flex-col items-center justify-end pb-4 border-r border-amber-900/10 ${isCurrent ? 'bg-amber-200/30' : ''}`}
            >
              {/* Grid Content */}
              <div className="mb-2">
                {grid.type === 'reward' && (
                  <div className="p-2 bg-red-500 rounded-full text-white shadow-lg">
                    <Gift size={20} />
                  </div>
                )}
                {grid.type === 'surprise' && (
                  <div className="p-2 bg-purple-500 rounded-full text-white shadow-lg">
                    <HelpIcon size={20} />
                  </div>
                )}
              </div>
              
              <span className="text-[10px] font-mono text-amber-900/40">{gridIndex}</span>
              
              {/* Grid Name */}
              <span className="text-[10px] font-medium text-amber-900/70 text-center px-1">
                {grid.name}
              </span>
            </div>
          );
        })}
      </motion.div>

      {/* Character (Fixed in center) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-12 h-12 bg-amber-800 rounded-full flex items-center justify-center text-white shadow-xl border-2 border-white">
            <User size={24} />
          </div>
          {/* Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/20 rounded-full blur-sm" />
        </motion.div>
      </div>

      {/* Next Reward Hint */}
      <div className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-200 shadow-sm">
        <span className="text-xs font-medium text-amber-900">
          距离最近奖励格还有 <span className="text-red-600 font-bold">{calculateNextReward(position)}</span> 步
        </span>
      </div>
    </div>
  );
}

function calculateNextReward(currentPos: number) {
  const rewardPositions = Object.keys(GRIDS)
    .map(Number)
    .filter(pos => (GRIDS[pos].type === 'reward' || GRIDS[pos].type === 'surprise') && pos > currentPos)
    .sort((a, b) => a - b);
  
  if (rewardPositions.length === 0) {
    // If no rewards ahead on this board, look at the first reward of next board
    const firstReward = Object.keys(GRIDS)
      .map(Number)
      .filter(pos => GRIDS[pos].type === 'reward' || GRIDS[pos].type === 'surprise')
      .sort((a, b) => a - b)[0];
    return (GRID_COUNT - currentPos) + firstReward;
  }
  
  return rewardPositions[0] - currentPos;
}
