import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'Забанят ли мой личный основной аккаунт Steam?',
    a: 'Нет, это технически невозможно на 100%. Вы не вводите данные своего личного профиля и не передаете его нам. Вы входите в отдельный чистый купленный аккаунт через официальный лаунчер Steam, скачиваете игру и переключаетесь в автономный режим. Ваш личный профиль никак не связан с этим процессом.'
  },
  {
    q: 'Чем офлайн-аккаунт лучше бесплатного торрента или взлома?',
    a: 'Во-первых, многие современные игры (например, Black Myth: Wukong, Silent Hill 2, EA Sports) защищены Denuvo и не взломаны на торрентах в принципе. Во-вторых, вы скачиваете чистые официальные бинарники напрямую с защищенных серверов Valve, без риска скачать скрытый криптомайнер, троян или стиллер паролей.'
  },
  {
    q: 'Смогу ли я играть после перезагрузки компьютера или отключения интернета?',
    a: 'Да! Вы можете играть полностью без интернета. Клиент Steam запоминает данные и запускается в автономном режиме в любое время. Все сохранения лежат в локальной папке ваших документов на диске.'
  },
  {
    q: 'Включены ли все дополнения (DLC) и патчи?',
    a: 'Да. Мы приобретаем максимальные издания (Deluxe / Ultimate Edition). В комплекте идут все сюжетные DLC, саундтреки, бонусы предзаказа и самые свежие патчи с оптимизацией.'
  },
  {
    q: 'Можно ли играть по сети или в кооперативе?',
    a: 'Офлайн-активация предназначена строго для прохождения сюжетной одиночной кампании. Сетевые многопользовательские режимы требуют постоянного онлайна на одном аккаунте, поэтому сетевой режим отключен. Для сюжета же это идеальный и самый выгодный вариант.'
  },
  {
    q: 'Что делать, если при входе потребуется подтверждение Steam Guard?',
    a: 'На большинстве наших аккаунтов вход настроен без кода. Если же система Steam запросит код авторизации, наша круглосуточная автоматическая поддержка в Telegram выдаст вам код моментально в течение пары минут.'
  }
];

export const FAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 border-b border-neutral-850 bg-neutral-900/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 tracking-wider uppercase">
            <span>Частые вопросы</span>
            <span aria-hidden="true">·</span>
            <span>База знаний</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ответы на популярные вопросы
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            Все, что нужно знать перед первой покупкой офлайн-аккаунта
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-850/60 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
