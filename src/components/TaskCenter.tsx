/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TASKS } from '../constants/gameData';
import { CheckCircle2, Circle, Lock } from 'lucide-react';

interface TaskCenterProps {
  isVip: boolean;
  tasksStatus: Record<string, number>;
  onCompleteTask: (taskId: string) => void;
}

export default function TaskCenter({ isVip, tasksStatus, onCompleteTask }: TaskCenterProps) {
  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl border border-amber-100 max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif font-bold text-amber-900">任务中心</h2>
        {isVip && (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
            VIP 专属任务已解锁
          </span>
        )}
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {TASKS.map((task) => {
          const isVipTask = task.type === 'vip';
          const isLocked = isVipTask && !isVip;
          const count = tasksStatus[task.id] || 0;
          const isCompleted = task.limit && count >= task.limit;

          return (
            <div 
              key={task.id}
              className={`p-4 rounded-2xl border transition-all ${isLocked ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-amber-50/50 border-amber-100 hover:border-amber-300'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-amber-900">{task.name}</h3>
                    {isVipTask && <Lock size={12} className="text-amber-600" />}
                  </div>
                  {(task as any).desc && <p className="text-xs text-amber-700/60 mt-1">{(task as any).desc}</p>}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-bold text-red-600">奖励: 骰子 * {task.reward}</span>
                    {task.limit && (
                      <span className="text-[10px] text-amber-900/40">
                        进度: {count}/{task.limit}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  disabled={isLocked || isCompleted}
                  onClick={() => onCompleteTask(task.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    isCompleted 
                      ? 'bg-green-100 text-green-700 cursor-default' 
                      : isLocked 
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        : 'bg-amber-800 text-white hover:bg-amber-900 active:scale-95'
                  }`}
                >
                  {isCompleted ? (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={14} />
                      已完成
                    </div>
                  ) : isLocked ? '需VIP' : '去完成'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
