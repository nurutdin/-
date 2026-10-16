import React from 'react';
import { Check, X, Shield, Lock, DollarSign, HardDrive, WifiOff, FileCheck } from 'lucide-react';

export const AdvantageSection: React.FC = () => {
  return (
    <section id="advantages" className="py-20 border-b border-neutral-850 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Честное сравнение</span>
            <span aria-hidden="true">·</span>
            <span>Прозрачные условия</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Почему офлайн-аккаунты выгоднее и безопаснее покупки за 7 000 ₽
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Разбираемся без маркетинговых мифов: как работает офлайн-активация, почему за нее не банят и за что вы на самом деле платите в официальных магазинах.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto mb-16 rounded-2xl border border-neutral-800 bg-neutral-900/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 bg-neutral-900/80 text-xs sm:text-sm">
                <th className="py-4 px-5 text-neutral-400 font-medium w-1/3">Параметр</th>
                <th className="py-4 px-5 text-neutral-400 font-medium w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span>Официальный магазин (Steam / EA)</span>
                  </div>
                </th>
                <th className="py-4 px-5 text-amber-400 font-bold w-1/3 bg-amber-500/5 border-l border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Офлайн-аккаунт playgroundoffline</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-850 text-xs sm:text-sm">
              <tr>
                <td className="py-4 px-5 text-neutral-300 font-medium">Стоимость игры</td>
                <td className="py-4 px-5 text-neutral-400 font-mono tabular-nums">4 500 – 8 000 ₽</td>
                <td className="py-4 px-5 text-emerald-400 font-bold font-mono tabular-nums bg-amber-500/5 border-l border-amber-500/20">
                  290 – 399 ₽ <span className="text-xs text-amber-400 font-normal">(Экономия до 95%)</span>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-neutral-300 font-medium">Доступность в РФ и СНГ</td>
                <td className="py-4 px-5 text-neutral-400">
                  Многие игры заблокированы, нужна смена региона на Турцию/Казахстан и зарубежные карты
                </td>
                <td className="py-4 px-5 text-neutral-200 bg-amber-500/5 border-l border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Доступно в 1 клик (СБП, карты РФ, МИР)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-neutral-300 font-medium">Сюжетная кампания и графика</td>
                <td className="py-4 px-5 text-neutral-400">100% полноценный сюжет</td>
                <td className="py-4 px-5 text-neutral-200 bg-amber-500/5 border-l border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Точно такой же оригинальный сюжет и графика</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-neutral-300 font-medium">Дополнения (DLC) и бонусы</td>
                <td className="py-4 px-5 text-neutral-400">Отдельная доплата 2 000 – 4 000 ₽ за Season Pass</td>
                <td className="py-4 px-5 text-neutral-200 bg-amber-500/5 border-l border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Все Deluxe DLC и дополнения включены сразу</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-neutral-300 font-medium">Безопасность вашего ПК</td>
                <td className="py-4 px-5 text-neutral-400">Чистые файлы Steam</td>
                <td className="py-4 px-5 text-neutral-200 bg-amber-500/5 border-l border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>100% чистый Steam (скачивание с серверов Valve, никаких торрентов и вирусов)</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-neutral-300 font-medium">Риск для вашего личного аккаунта</td>
                <td className="py-4 px-5 text-neutral-400">Риск депортации или бана при смене региона</td>
                <td className="py-4 px-5 text-neutral-200 bg-amber-500/5 border-l border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>0% риска — ваш личный профиль никак не задействован</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 text-neutral-300 font-medium">Где хранятся сохранения</td>
                <td className="py-4 px-5 text-neutral-400">Локально на вашем SSD + Steam Cloud</td>
                <td className="py-4 px-5 text-neutral-200 bg-amber-500/5 border-l border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Локально на вашем ПК (прогресс только ваш)</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Штатная функция Steam</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Автономный режим (Offline Mode) встроен в клиент Steam самими разработчиками Valve. Это официально разрешенная возможность играть без интернета.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono">
              Valve Docs Verified
            </div>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Ваш профиль в безопасности</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Вам не требуется давать доступ к своей основной учетной записи. Вы входите в отдельный чистый купленный профиль, качаете игру и играете.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono">
              0% Risk Policy
            </div>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Никаких вирусов и майнеров</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                В отличие от торрентов и сомнительных «кряков», где легко подцепить троян или криптомайнер, все файлы скачиваются напрямую с официальных серверов.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono">
              Official Signed Binaries
            </div>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <HardDrive className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white">Сохранения навсегда у вас</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Файлы сохранений и конфигураций записываются в стандартную папку на вашем жестком диске. Вы можете спокойно пройти игру до конца в своем темпе.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 font-mono">
              Permanent Saves
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
