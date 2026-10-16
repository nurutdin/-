import React from 'react';
import { ArrowRight, ShieldCheck, Zap, DownloadCloud, Flame, Gamepad2, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
  onWhyClick: () => void;
  onOpenMiniGame: () => void;
  gamesCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onWhyClick,
  onOpenMiniGame,
  gamesCount
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-22 border-b border-neutral-850/80 bg-neutral-950">
      
      {/* Dark Ambient Vignette & Gamer Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-500/10 via-amber-600/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-[450px] h-[300px] bg-red-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          
          {/* Interactive Gamer Mini-game Callout Badge */}
          <div className="inline-flex items-center gap-2 p-1 pl-3 pr-2 rounded-full bg-neutral-900/90 border border-amber-500/30 text-xs font-medium text-amber-400 tracking-wide backdrop-blur-sm shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Мини-игра для геймеров: «Взлом Denuvo»
            </span>
            <button
              onClick={onOpenMiniGame}
              className="px-2.5 py-1 rounded-full bg-amber-400 text-neutral-950 font-bold text-[11px] hover:bg-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Играть</span>
              <Sparkles className="w-3 h-3" />
            </button>
          </div>

          {/* Balanced Display Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1] text-balance">
            Топовые сюжетные игры <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500 drop-shadow-[0_2px_20px_rgba(245,158,11,0.25)]">
              до 15 раз выгоднее
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl mx-auto text-balance">
            Лицензионная офлайн-активация с вечным доступом к сюжету и всеми DLC. Данные профиля выдаются сразу после оплаты, сохранения защищены на вашем ПК.
          </p>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 group cursor-pointer hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
            >
              <span>Выбрать игру ({gamesCount} в наличии)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onWhyClick}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-semibold text-neutral-300 bg-neutral-900/90 hover:bg-neutral-850 hover:text-white border border-neutral-800 rounded-xl transition-all cursor-pointer"
            >
              Почему это выгодно и безопасно?
            </button>
          </div>

          {/* Value Proof Strip */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left border-t border-neutral-850/80">
            <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-750 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-bold text-neutral-200">Выдача 10 сек</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">Логин и пароль сразу на экране + чек</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-750 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-neutral-200">100% Без бана</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">Ваш личный профиль Steam не задействован</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-750 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <DownloadCloud className="w-4 h-4" />
                <span className="text-xs font-bold text-neutral-200">Серверы Steam</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">Без торрент-вирусов и скрытых майнеров</p>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-750 transition-colors">
              <div className="flex items-center gap-2 text-amber-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-xs font-bold text-neutral-200">Все DLC включены</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-tight">Максимальные издания с предзаказами</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
