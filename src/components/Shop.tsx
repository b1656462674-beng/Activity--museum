/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SHOP_ITEMS } from '../constants/gameData';
import { Coins, ShoppingBag } from 'lucide-react';

interface ShopProps {
  tokenCount: number;
  onPurchase: (itemId: string) => void;
}

export default function Shop({ tokenCount, onPurchase }: ShopProps) {
  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl border border-amber-100 max-w-md w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <ShoppingBag className="text-amber-800" />
          <h2 className="text-2xl font-serif font-bold text-amber-900">兑换商店</h2>
        </div>
        <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
          <Coins size={16} className="text-amber-600" />
          <span className="text-sm font-bold text-amber-900">{tokenCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {SHOP_ITEMS.map((item) => {
          const canAfford = tokenCount >= item.price;

          return (
            <div 
              key={item.id}
              className="p-4 rounded-2xl border border-amber-100 bg-amber-50/30 flex flex-col items-center text-center hover:border-amber-300 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                {item.image}
              </div>
              <h3 className="text-sm font-bold text-amber-900 mb-1">{item.name}</h3>
              <div className="flex items-center gap-1 text-amber-700 mb-4">
                <Coins size={12} />
                <span className="text-xs font-mono">{item.price}</span>
              </div>

              <button
                disabled={!canAfford}
                onClick={() => onPurchase(item.id)}
                className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  canAfford 
                    ? 'bg-amber-800 text-white hover:bg-amber-900 active:scale-95' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {canAfford ? '立即兑换' : '代币不足'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
