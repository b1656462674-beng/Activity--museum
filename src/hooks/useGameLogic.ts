/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GRIDS, GRID_COUNT, SURPRISE_REWARDS, TASKS } from '../constants/gameData';

export function useGameLogic() {
  // User Data State (Local)
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('museum_day_user_data');
    return saved ? JSON.parse(saved) : {
      diceCount: 10,
      tokenCount: 0,
      position: 1,
      boardCycle: 0,
      isVip: false,
      pityProgress: 0,
      tasksStatus: {} as Record<string, number>,
      inventory: [] as string[]
    };
  });

  // Global State (Local Mock)
  const [globalStats, setGlobalStats] = useState(() => {
    const saved = localStorage.getItem('museum_day_global_stats');
    return saved ? JSON.parse(saved) : {
      totalDiceRolls: 12500,
      redEnvelopeTriggered: false
    };
  });

  const targetRolls = 50000;

  // Persistence
  useEffect(() => {
    localStorage.setItem('museum_day_user_data', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('museum_day_global_stats', JSON.stringify(globalStats));
  }, [globalStats]);

  // Game Actions
  const rollDice = (value: number) => {
    if (userData.diceCount <= 0) return;

    const newPity = userData.pityProgress + 1;
    let finalPos = userData.position + value;
    let newCycle = userData.boardCycle;

    if (finalPos > GRID_COUNT) {
      finalPos = finalPos - GRID_COUNT;
      newCycle += 1;
    }

    if (newPity >= 50) {
      finalPos = 38;
    }

    const grid = GRIDS[finalPos];
    let newTokenCount = userData.tokenCount;
    let newInventory = [...userData.inventory];
    let rewardMsg = '';

    if (grid.type === 'reward') {
      newTokenCount += (grid.tokens || 0);
      rewardMsg = `恭喜获得 ${grid.name}: ${grid.tokens} 代币!`;
    } else if (grid.type === 'surprise') {
      const surprise = SURPRISE_REWARDS[Math.floor(Math.random() * SURPRISE_REWARDS.length)];
      if (surprise.type === 'tokens') {
        newTokenCount += (surprise.value || 0);
      } else {
        newInventory.push(surprise.name);
      }
      rewardMsg = `惊喜发现! 获得: ${surprise.name}`;
    } else {
      newTokenCount += (grid.tokens || 0);
      rewardMsg = `站定保底格，获得 ${grid.tokens} 代币`;
    }

    setUserData(prev => ({
      ...prev,
      diceCount: prev.diceCount - 1,
      tokenCount: newTokenCount,
      position: finalPos,
      boardCycle: newCycle,
      pityProgress: newPity >= 50 ? 0 : newPity,
      inventory: newInventory
    }));

    setGlobalStats(prev => ({
      ...prev,
      totalDiceRolls: prev.totalDiceRolls + 1
    }));

    return rewardMsg;
  };

  const completeTask = (taskId: string) => {
    const task = TASKS.find(t => t.id === taskId);
    if (!task) return;

    const currentCount = userData.tasksStatus[taskId] || 0;
    if (task.limit && currentCount >= task.limit) return;

    setUserData(prev => ({
      ...prev,
      diceCount: prev.diceCount + task.reward,
      tasksStatus: {
        ...prev.tasksStatus,
        [taskId]: currentCount + 1
      }
    }));
  };

  const purchaseItem = (itemId: string) => {
    console.log('Purchased:', itemId);
  };

  const toggleVip = () => {
    setUserData(prev => ({ ...prev, isVip: !prev.isVip }));
  };

  return {
    ...userData,
    ...globalStats,
    targetRolls,
    rollDice,
    completeTask,
    purchaseItem,
    toggleVip
  };
}
