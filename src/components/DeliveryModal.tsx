import React, { useState } from 'react';
import { Order } from '../types';
import { CheckCircle, Copy, Check, Download, Eye, EyeOff, ShieldCheck, HelpCircle, ExternalLink, MessageCircle } from 'lucide-react';

interface DeliveryModalProps {
  order: Order | null;
  onClose: () => void;
}

export const DeliveryModal: React.FC<DeliveryModalProps> = ({
  order,
  onClose
}) => {
  if (!order) return null;

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDownloadTxt = () => {
    const fileContent = `===========================================
ЧЕК И ДАННЫЕ ОФЛАЙН-АККАУНТА PLAYGROUNDOFFLINE
===========================================
Заказ: ${order.orderNumber}
Дата покупки: ${order.date}
Игра: ${order.productTitle}
Платформа: ${order.issuedCredentials.platform}
Сумма: ${order.price} ₽
Email покупателя: ${order.buyerEmail}

-------------------------------------------
ДАННЫЕ ДЛЯ ВХОДА:
-------------------------------------------
Логин: ${order.issuedCredentials.login}
Пароль: ${order.issuedCredentials.password}
Steam Guard / PIN: ${order.issuedCredentials.pinOrGuard || 'Не требуется'}

-------------------------------------------
ПОШАГОВАЯ ИНСТРУКЦИЯ ПО АКТИВАЦИИ:
-------------------------------------------
1. Запустите клиент ${order.issuedCredentials.platform}.
2. Войдите с полученным логином и паролем (поставьте галочку "Запомнить пароль").
3. Перейдите в библиотеку и начните установку игры "${order.productTitle}".
4. После окончания загрузки запустите игру 1 раз до главного меню, чтобы сгенерировались локальные файлы лицензии на вашем ПК.
5. Выйдите из игры, в верхнем меню клиента выберите:
   ${order.issuedCredentials.platform} -> "Перейти в автономный режим" (Offline Mode).
6. Теперь вы можете запускать игру в любое удобное время без интернета!
   Ваши сохранения и прогресс хранятся локально на вашем ПК.

-------------------------------------------
ТЕХНИЧЕСКАЯ ПОДДЕРЖКА:
Telegram: @playgroundoffline_support (24/7)
===========================================`;

    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PlaygroundOffline_${order.orderNumber}_${order.issuedCredentials.login}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleStep = (stepIdx: number) => {
    setCompletedSteps(prev =>
      prev.includes(stepIdx) ? prev.filter(s => s !== stepIdx) : [...prev, stepIdx]
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-100 flex flex-col my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Header Banner */}
        <div className="p-6 bg-gradient-to-b from-amber-500/15 via-neutral-900 to-neutral-900 border-b border-neutral-800 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Оплата прошла успешно!
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300">
            Заказ <span className="font-mono font-bold text-amber-400">{order.orderNumber}</span> подтвержден. Ваши данные готовы к использованию:
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Credentials Box */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-amber-400/30 space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-neutral-850 pb-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Данные для входа в {order.issuedCredentials.platform}</span>
              </div>
              <button
                onClick={handleDownloadTxt}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-amber-400 bg-amber-400/10 hover:bg-amber-400/20 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Сохранить в .txt</span>
              </button>
            </div>

            {/* Login field */}
            <div className="space-y-1">
              <span className="text-[11px] text-neutral-400 font-medium">Логин аккаунта:</span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <code className="text-sm sm:text-base font-mono font-bold text-white select-all">
                  {order.issuedCredentials.login}
                </code>
                <button
                  onClick={() => handleCopy(order.issuedCredentials.login, 'login')}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  title="Скопировать логин"
                >
                  {copiedField === 'login' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Копировать</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1">
              <span className="text-[11px] text-neutral-400 font-medium">Пароль:</span>
              <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-2">
                  <code className="text-sm sm:text-base font-mono font-bold text-white select-all">
                    {showPassword ? order.issuedCredentials.password : '••••••••••••••••'}
                  </code>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-neutral-500 hover:text-neutral-300 p-1"
                    title={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <button
                  onClick={() => handleCopy(order.issuedCredentials.password, 'password')}
                  className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors flex items-center gap-1 text-xs cursor-pointer"
                  title="Скопировать пароль"
                >
                  {copiedField === 'password' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Копировать</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Guard status */}
            <div className="text-xs text-neutral-400 flex items-center justify-between pt-1">
              <span>Steam Guard:</span>
              <span className="text-neutral-200 font-medium">
                {order.issuedCredentials.pinOrGuard || 'Код не требуется / Авторизован'}
              </span>
            </div>
          </div>

          {/* Quick Interactive Checklist */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Чек-лист правильной активации:
            </h4>
            
            <div className="space-y-2 text-xs">
              {[
                'Войдите в клиент Steam под выданным логином и паролем (галочка «Запомнить пароль»)',
                `Найдите «${order.productTitle}» в библиотеке и нажмите «Установить»`,
                'Запустите игру 1 раз до главного меню для генерации файлов защиты',
                'В левом верхнем углу Steam выберите: «Steam» → «Перейти в автономный режим»'
              ].map((step, idx) => {
                const isDone = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border transition-colors cursor-pointer ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-neutral-300'
                        : 'bg-neutral-950 border-neutral-850 text-neutral-400 hover:border-neutral-800'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      isDone ? 'bg-emerald-500 border-emerald-400 text-neutral-950' : 'border-neutral-700 bg-neutral-900'
                    }`}>
                      {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Support Strip */}
          <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-300">
              <MessageCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Нужна помощь или возникли вопросы по входу?</span>
            </div>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-200 hover:text-white flex items-center gap-1.5 transition-colors font-medium whitespace-nowrap"
            >
              <span>Поддержка в Telegram</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Action Close */}
          <button
            onClick={onClose}
            className="w-full py-3 text-xs font-semibold text-neutral-300 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded-xl transition-colors cursor-pointer"
          >
            Закрыть окно (данные всегда доступны во вкладке «Мои покупки»)
          </button>

        </div>

      </div>

    </div>
  );
};
