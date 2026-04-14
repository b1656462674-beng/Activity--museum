/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Gift } from 'lucide-react';

interface GlobalProgressProps {
  totalDiceRolls: number;
  targetRolls: number;
  showGlobal?: boolean;
  showPity?: boolean;
  pityProgress?: number;
}

export default function GlobalProgress({ 
  totalDiceRolls, 
  targetRolls, 
  showGlobal = true, 
  showPity = false, 
  pityProgress = 0 
}: GlobalProgressProps) {
  const globalPercent = Math.min(100, (totalDiceRolls / targetRolls) * 100);
  const pityPercent = Math.min(100, (pityProgress / 50) * 100);

  return (
    <div className="w-full space-y-6">
      {/* Global Task */}
      {showGlobal && (
        <div className="bg-amber-900/5 p-4 rounded-2xl border border-amber-900/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Gift size={18} className="text-red-600" />
              <span className="text-sm font-bold text-amber-900">全球文化累计</span>
            </div>
            <span className="text-xs font-mono text-amber-800">
              {totalDiceRolls.toLocaleString()} / {targetRolls.toLocaleString()}
            </span>
          </div>
          <div className="h-3 bg-amber-900/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${globalPercent}%` }}
              className="h-full bg-gradient-to-r from-red-500 to-orange-500"
            />
          </div>
          <p className="text-[10px] text-amber-900/60 mt-2">
            全球文化累计到达目标后，HT为你送上文化大礼
          </p>
        </div>
      )}

      {/* Personal Pity */}
      {showPity && (
        <div className="bg-amber-900/5 p-4 rounded-2xl border border-amber-900/10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-amber-600" />
              <span className="text-sm font-bold text-amber-900">一等奖保底进度</span>
            </div>
            <span className="text-xs font-medium text-amber-800">
              还差 <span className="text-amber-600 font-bold">{50 - pityProgress}</span> 抽必得一等奖
            </span>
          </div>
          <div className="h-3 bg-amber-900/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${pityPercent}%` }}
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
            />
          </div>
        </div>
      )}
    </div>
  );
}
