/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  LayoutGrid, 
  User, 
  Bell, 
  Info,
  X,
  Trophy,
  Coins,
  Gift,
  ChevronLeft,
  Share2,
  Dices
} from 'lucide-react';
import Board from './components/Board';
import Dice from './components/Dice';
import TaskCenter from './components/TaskCenter';
import Shop from './components/Shop';
import GlobalProgress from './components/GlobalProgress';
import { useGameLogic } from './hooks/useGameLogic';

export default function App() {
  const {
    diceCount,
    tokenCount,
    position,
    boardCycle,
    isVip,
    toggleVip,
    pityProgress,
    tasksStatus,
    totalDiceRolls,
    targetRolls,
    rollDice,
    completeTask,
    purchaseItem
  } = useGameLogic();

  const [activeTab, setActiveTab] = useState<'board' | 'shop' | 'square'>('board');
  const [showTasks, setShowTasks] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [rewardModal, setRewardModal] = useState<string | null>(null);

  const handleRoll = (value: number) => {
    const msg = rollDice(value);
    if (msg) {
      setTimeout(() => setRewardModal(msg), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f2ed] font-sans text-amber-900 overflow-x-hidden">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-amber-100 z-40 px-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-amber-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-amber-800" />
          </button>
          <h1 className="font-serif font-bold text-lg leading-tight">国际博物馆日</h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-amber-50 rounded-full transition-colors">
            <Share2 size={20} className="text-amber-800" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-24 pb-48 px-4 md:px-8 max-w-6xl mx-auto flex flex-col items-center gap-8">
        
        {/* Game Board Section */}
        <section className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-amber-900/5 border border-amber-100 overflow-hidden relative">
          <Board position={position} boardCycle={boardCycle} />
          
          {/* Board Footer Info */}
          <div className="p-8 bg-gradient-to-b from-white to-amber-50/50">
            <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
              
              {/* Stats Row */}
              <div className="flex items-center justify-center gap-12 w-full">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-900/40 mb-2">当前骰子</span>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-amber-100">
                    <Dices size={16} className="text-amber-600" />
                    <span className="text-lg font-mono font-bold text-amber-900">{diceCount}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-amber-900/40 mb-2">当前代币</span>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl shadow-sm border border-amber-100">
                    <Coins size={16} className="text-amber-600" />
                    <span className="text-lg font-mono font-bold text-amber-900">{tokenCount}</span>
                  </div>
                </div>
              </div>

              {/* Main Action Area */}
              <div className="flex flex-col items-center gap-4">
                <Dice onRoll={handleRoll} diceCount={diceCount} />
                <div className="px-4 py-1.5 bg-amber-100/50 rounded-full border border-amber-200/50">
                  <span className="text-xs font-medium text-amber-800">
                    还差 <span className="text-red-600 font-black tabular-nums">{50 - pityProgress}</span> 抽必得一等奖
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Global Progress at Bottom of Main */}
        <div className="w-full max-w-2xl">
          <GlobalProgress 
            totalDiceRolls={totalDiceRolls} 
            targetRolls={targetRolls} 
            showGlobal={true}
            showPity={false}
          />
        </div>
      </main>

      {/* Activity Description Bubble */}
      <button 
        onClick={() => setShowDescription(true)}
        className="fixed left-6 bottom-32 w-12 h-12 bg-white/40 backdrop-blur-md rounded-full shadow-lg border border-white/50 flex items-center justify-center text-amber-900 hover:bg-white/60 transition-all z-30"
      >
        <Info size={24} />
      </button>

      {/* Right Tab Bar (Fixed) */}
      <aside className="fixed right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        <button 
          onClick={() => setActiveTab('shop')}
          className="w-14 h-14 bg-white rounded-2xl shadow-xl border border-amber-100 flex flex-col items-center justify-center gap-1 hover:scale-110 transition-all text-amber-800"
        >
          <ShoppingBag size={20} />
          <span className="text-[10px] font-bold">商店</span>
        </button>
        <button 
          onClick={() => setActiveTab('square')}
          className="w-14 h-14 bg-white rounded-2xl shadow-xl border border-amber-100 flex flex-col items-center justify-center gap-1 hover:scale-110 transition-all text-amber-800"
        >
          <LayoutGrid size={20} />
          <span className="text-[10px] font-bold">广场</span>
        </button>
      </aside>

      {/* Task Center Bottom Drawer (Persistent) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div 
            initial={false}
            animate={{ y: showTasks ? 0 : "calc(100% - 60px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl mx-auto bg-white rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-x border-t border-amber-100 pointer-events-auto"
          >
            {/* Handle / Trigger Area */}
            <div 
              onClick={() => setShowTasks(!showTasks)}
              className="h-[60px] flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50/50 transition-colors rounded-t-[3rem]"
            >
              <div className="h-1.5 w-12 bg-amber-200 rounded-full mb-2" />
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <LayoutGrid size={18} />
                <span>任务中心</span>
                <motion.div
                  animate={{ rotate: showTasks ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronLeft size={18} className="-rotate-90" />
                </motion.div>
              </div>
            </div>

            {/* Content area */}
            <div className="px-6 pb-8 max-h-[60vh] overflow-y-auto">
              <div className="h-px bg-amber-100 w-full mb-6" />
              <TaskCenter isVip={isVip} tasksStatus={tasksStatus} onCompleteTask={completeTask} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDescription && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDescription(false)}
              className="absolute inset-0 bg-amber-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative z-10 w-full max-w-md bg-white p-8 rounded-[3rem] shadow-2xl border border-amber-100"
            >
              <button 
                onClick={() => setShowDescription(false)}
                className="absolute top-6 right-6 p-2 hover:bg-amber-50 rounded-full transition-colors"
              >
                <X size={24} className="text-amber-800" />
              </button>
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-800 mb-6">
                <Info size={32} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-4">活动说明</h3>
              <div className="space-y-4 text-amber-800/80 text-sm leading-relaxed">
                <p>1. 活动时间：5.14 - 5.28</p>
                <p>2. 棋盘设定：走完42格后自动从头开始，仅切换大洲背景（亚洲→欧洲→非洲→北美洲→南美洲→大洋洲→南极洲循环）。</p>
                <p>3. 核心玩法：完成任务获取骰子 → 摇骰子前进 → 站定格子领奖励 → 积累代币兑换奖品。</p>
                <p>4. 惊喜奖励：站定惊喜格（❓）可随机获得代币、VIP卡、头像框等礼品。</p>
                <p>5. 保底机制：累计摇满 50 个骰子，必得一等奖（固定第38格奖励）。</p>
              </div>
              <button 
                onClick={() => setShowDescription(false)}
                className="w-full mt-8 py-4 bg-amber-800 text-white rounded-2xl font-bold hover:bg-amber-900 transition-all shadow-lg"
              >
                我知道了
              </button>
            </motion.div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTab('board')}
              className="absolute inset-0 bg-amber-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative z-10 w-full max-w-md"
            >
              <button 
                onClick={() => setActiveTab('board')}
                className="absolute -top-12 right-0 text-white hover:rotate-90 transition-transform"
              >
                <X size={32} />
              </button>
              <Shop tokenCount={tokenCount} onPurchase={purchaseItem} />
            </motion.div>
          </div>
        )}

        {rewardModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRewardModal(null)}
              className="absolute inset-0 bg-amber-950/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="relative z-10 bg-white p-8 rounded-[3rem] border-4 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.3)] text-center max-w-xs w-full"
            >
              <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                <Gift size={40} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-amber-900 mb-2">获得奖励!</h2>
              <p className="text-amber-800 font-medium mb-6">{rewardModal}</p>
              <button 
                onClick={() => setRewardModal(null)}
                className="w-full py-3 bg-amber-800 text-white rounded-2xl font-bold shadow-lg hover:bg-amber-900 transition-all"
              >
                太棒了
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Red Envelope Rain Trigger (Mock) */}
      {totalDiceRolls >= targetRolls && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-6 py-2 rounded-full shadow-2xl animate-bounce flex items-center gap-2">
          <Bell size={18} />
          <span className="font-bold">全服红包雨已触发！点击领取</span>
        </div>
      )}
    </div>
  );
}
