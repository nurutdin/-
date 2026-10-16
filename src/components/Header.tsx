import React from 'react';
import { ShoppingBag, Lock, Unlock, Flame, Gamepad2, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenMyPurchases: () => void;
  onOpenAdmin: () => void;
  onOpenMiniGame: () => void;
  myPurchasesCount: number;
  isOwnerAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMyPurchases,
  onOpenAdmin,
  onOpenMiniGame,
  myPurchasesCount,
  isOwnerAuthenticated
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/95 backdrop-blur-md border-b border-neutral-850/80 shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#catalog" className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 group-hover:shadow-[0_0_12px_rgba(245,158,11,0.35)] transition-all">
            <Flame className="w-4 h-4 fill-amber-400/20" />
          </div>
          <span className="font-extrabold tracking-tight text-white">
            playground<span className="text-amber-400">offline</span>
          </span>
        </a>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <a href="#catalog" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Каталог игр
          </a>
          <a href="#advantages" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Выгода и безопасность
          </a>
          <a href="#guide" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Как активировать
          </a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Отзывы
          </a>
          <a href="#faq" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Gamer Mini-game trigger button */}
          <button
            onClick={onOpenMiniGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 rounded-lg transition-all shadow-[0_0_12px_rgba(245,158,11,0.15)] cursor-pointer"
            title="Сыграть в мини-игру и получить промокод 15%"
          >
            <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Мини-игра</span>
            <span className="text-[10px] bg-amber-400 text-neutral-950 px-1 py-0.2 rounded font-black">
              -15%
            </span>
          </button>

          {/* My purchases button */}
          <button
            onClick={onOpenMyPurchases}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-750 hover:text-white transition-all whitespace-nowrap cursor-pointer"
            title="Проверить купленные аккаунты"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Мои покупки</span>
            {myPurchasesCount > 0 && (
              <span className="bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {myPurchasesCount}
              </span>
            )}
          </button>

          {/* Owner Exclusive Portal */}
          <button
            onClick={onOpenAdmin}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-lg border transition-all whitespace-nowrap cursor-pointer ${
              isOwnerAuthenticated
                ? 'bg-amber-500/15 border-amber-500/50 text-amber-300 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                : 'text-neutral-500 hover:text-neutral-300 bg-neutral-900/40 border-neutral-850 hover:border-neutral-750'
            }`}
            title={isOwnerAuthenticated ? 'Панель владельца магазина' : 'Вход для владельца'}
          >
            {isOwnerAuthenticated ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden xl:inline">Владелец</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
                <span className="hidden xl:inline text-[11px]">Владелец</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
