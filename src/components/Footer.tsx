import React from 'react';
import { Flame, ShieldCheck, Send, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  isOwnerAuthenticated: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, isOwnerAuthenticated }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-850 pt-14 pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-white font-black text-base tracking-tight">
              <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Flame className="w-4 h-4 fill-amber-400/20" />
              </div>
              <span>playground<span className="text-amber-400">offline</span></span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Эксклюзивный маркетплейс лицензионных офлайн-аккаунтов для ПК. Одиночные сюжетные кампании топовых AAA-игр без переплат, санкций и риска блокировок.
            </p>
            <div className="flex items-center gap-2 text-neutral-300 font-medium text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Пожизненный доступ к сюжету и поддержка 24/7</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Навигация
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalog" className="hover:text-white transition-colors">Каталог игр</a>
              </li>
              <li>
                <a href="#advantages" className="hover:text-white transition-colors">Сравнение выгоды</a>
              </li>
              <li>
                <a href="#guide" className="hover:text-white transition-colors">Инструкция по активации</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Отзывы игроков</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Вопрос-ответ</a>
              </li>
            </ul>
          </div>

          {/* Contact & Exclusive Owner Portal */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Связь и поддержка
            </h4>
            <div className="space-y-2.5">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 hover:text-white hover:border-neutral-700 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-blue-400" />
                <span>Telegram: @playgroundoffline</span>
              </a>
              <div className="text-[11px] text-neutral-500">
                Автоматическая выдача: 24/7
              </div>
              <div className="pt-2">
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 text-neutral-600 hover:text-neutral-400 text-[11px] transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>{isOwnerAuthenticated ? 'Панель владельца (активна)' : 'Вход для владельца'}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} playgroundoffline. Эксклюзивный магазин офлайн-аккаунтов.
          </div>
          <div className="flex items-center gap-4">
            <span>Безопасная оплата СБП / Карты</span>
            <span>·</span>
            <span>Автономный режим Steam</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
