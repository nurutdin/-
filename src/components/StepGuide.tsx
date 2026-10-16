import React from 'react';
import { KeyRound, Download, Play, Info } from 'lucide-react';

export const StepGuide: React.FC = () => {
  return (
    <section id="guide" className="py-20 border-b border-neutral-850 bg-neutral-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Простая инструкция</span>
            <span aria-hidden="true">·</span>
            <span>Всего 3 шага</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Как активировать игру за 3 минуты
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Никаких сложных программ или сомнительных патчей. Стандартный процесс в официальном лаунчере Steam.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 relative group hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-extrabold font-mono text-amber-400/30 group-hover:text-amber-400/60 transition-colors">01</span>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <KeyRound className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Получение данных</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Сразу после оплаты на экране откроется карточка заказа с логином и паролем. Вы сможете скопировать их в 1 клик и скачать резервный текстовый файл.
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-500">
              Выдача: моментально 24/7
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 relative group hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-extrabold font-mono text-amber-400/30 group-hover:text-amber-400/60 transition-colors">02</span>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Download className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Вход и скачивание</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Откройте клиент Steam, войдите под выданным логином и паролем. Перейдите в библиотеку и поставьте игру на загрузку с максимальной скоростью.
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-500">
              Скорость: неограниченная от провайдера
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 relative group hover:border-neutral-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-extrabold font-mono text-amber-400/30 group-hover:text-amber-400/60 transition-colors">03</span>
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                <Play className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Автономный режим</h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Запустите игру 1 раз до главного меню, затем нажмите в верхнем меню Steam: «Steam» → «Перейти в автономный режим». Играйте сколько угодно!
            </p>
            <div className="mt-4 pt-4 border-t border-neutral-800 text-xs text-neutral-500">
              Доступ: бессрочный, без очередей
            </div>
          </div>

        </div>

        {/* Helpful Tip Box */}
        <div className="mt-10 p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-neutral-300">
            <strong className="text-white font-semibold">Важно:</strong> При автономном режиме никто не может выбить вас из игры или перезаписать ваш прогресс. Ваши сохранения сохраняются в папке пользователя на диске C (или вашем целевом диске) и не перезаписываются другими игроками.
          </div>
        </div>

      </div>
    </section>
  );
};
