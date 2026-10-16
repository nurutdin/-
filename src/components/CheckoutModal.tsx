import React, { useState } from 'react';
import { Product, Order } from '../types';
import { X, QrCode, CreditCard, Wallet, Smartphone, ShieldCheck, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  product: Product | null;
  onClose: () => void;
  onSuccess: (order: Order) => void;
  initialPromo?: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  onClose,
  onSuccess,
  initialPromo = ''
}) => {
  if (!product) return null;

  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'sbp' | 'card' | 'crypto' | 'tinkoff'>('sbp');
  const [promoCode, setPromoCode] = useState(initialPromo);
  const [discountAmount, setDiscountAmount] = useState(() => {
    if (initialPromo.toUpperCase() === 'HACKER15') {
      return Math.round(product.price * 0.15);
    }
    return 0;
  });
  const [promoApplied, setPromoApplied] = useState(() => Boolean(initialPromo));
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const finalPrice = Math.max(0, product.price - discountAmount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'HACKER15') {
      const disc = Math.round(product.price * 0.15);
      setDiscountAmount(disc);
      setPromoApplied(true);
      setErrorMsg('');
    } else if (code === 'PLAY' || code === 'OFFLINE10') {
      const disc = Math.round(product.price * 0.10);
      setDiscountAmount(disc);
      setPromoApplied(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Неверный промокод. Сыграйте в мини-игру «Взлом Denuvo» для получения скидки 15%!');
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Пожалуйста, укажите корректный Email для получения чека и восстановления');
      return;
    }

    setIsProcessing(true);
    setErrorMsg('');

    // Simulate instant payment gateway check & account assignment
    setTimeout(() => {
      // Pick available credentials from pool or generate
      const availableAcc = product.accountsPool[0] || {
        login: `${product.slug.replace(/-/g, '_')}_vip_${Math.floor(100 + Math.random() * 900)}`,
        password: `PlaySafe${Math.floor(1000 + Math.random() * 9000)}!`,
        pinOrGuard: 'Steam Guard подтвержден',
        notes: 'Лицензия'
      };

      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `PO-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleString('ru-RU', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        productId: product.id,
        productTitle: product.title,
        productType: product.type,
        price: finalPrice,
        buyerEmail: email,
        paymentMethod: paymentMethod,
        status: 'completed',
        issuedCredentials: {
          login: availableAcc.login,
          password: availableAcc.password,
          pinOrGuard: availableAcc.pinOrGuard,
          platform: product.platform,
          instructions: `1. Запустите клиент ${product.platform} на вашем компьютере.
2. Введите полученный логин: "${availableAcc.login}" и пароль.
3. Скачайте "${product.title}" в библиотеке.
4. Запустите игру один раз до меню.
5. В меню клиента переключитесь в Автономный режим (Offline Mode).
6. Приятной игры! Ваши сохранения и прогресс будут в безопасности.`
        }
      };

      setIsProcessing(false);
      onSuccess(newOrder);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">Оформление заказа</h3>
            <span className="text-xs text-neutral-400">· Моментальная выдача</span>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Product Recap Item */}
          <div className="flex items-center gap-4 p-3.5 rounded-xl bg-neutral-950 border border-neutral-850">
            <img
              src={product.coverImage}
              alt=""
              className="w-16 h-12 rounded-lg object-cover border border-neutral-800 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[11px] text-amber-400 font-semibold">{product.platform}</span>
              <h4 className="text-sm font-bold text-white truncate">{product.title}</h4>
              <p className="text-xs text-neutral-400">Офлайн аккаунт с пожизненным доступом</p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-base font-extrabold text-white font-mono tabular-nums">
                {product.price} ₽
              </span>
            </div>
          </div>

          <form onSubmit={handlePay} className="space-y-5">
            
            {/* Buyer Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                <span>Ваш Email (для чека и восстановления)</span>
                <span className="text-neutral-500 font-normal">Обязательно</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                disabled={isProcessing}
                className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/60"
              />
              <span className="text-[11px] text-neutral-500">
                Данные аккаунта покажутся сразу на экране и дополнительно сохранятся в вашем браузере.
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-neutral-300">
                Способ оплаты
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                
                {/* SBP */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('sbp')}
                  disabled={isProcessing}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'sbp'
                      ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400/40'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center text-amber-400 shrink-0">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">СБП (QR-код)</div>
                    <div className="text-[10px] text-neutral-400">0% комиссии</div>
                  </div>
                </button>

                {/* Bank Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  disabled={isProcessing}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400/40'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center text-blue-400 shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Карта (МИР / РФ)</div>
                    <div className="text-[10px] text-neutral-400">Все банки РФ</div>
                  </div>
                </button>

                {/* Tinkoff / SberPay */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('tinkoff')}
                  disabled={isProcessing}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'tinkoff'
                      ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400/40'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center text-yellow-400 shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Tinkoff Pay / Sber</div>
                    <div className="text-[10px] text-neutral-400">В 1 клик со смартфона</div>
                  </div>
                </button>

                {/* Crypto */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('crypto')}
                  disabled={isProcessing}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'crypto'
                      ? 'bg-amber-400/10 border-amber-400 text-white ring-1 ring-amber-400/40'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-750 flex items-center justify-center text-emerald-400 shrink-0">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Криптовалюта</div>
                    <div className="text-[10px] text-neutral-400">USDT / TON / BTC</div>
                  </div>
                </button>

              </div>
            </div>

            {/* Promo code field */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Промокод (введите PLAY для скидки 10%)"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                disabled={promoApplied || isProcessing}
                className="flex-1 px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none uppercase"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                disabled={promoApplied || isProcessing || !promoCode.trim()}
                className="px-3 py-2 text-xs font-medium text-neutral-300 bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {promoApplied ? 'Применен' : 'Применить'}
              </button>
            </div>

            {errorMsg && (
              <div className="text-xs text-rose-400 bg-rose-950/40 border border-rose-800/60 p-2.5 rounded-lg">
                {errorMsg}
              </div>
            )}

            {/* Price breakdown */}
            <div className="pt-3 border-t border-neutral-850 space-y-1.5 text-xs text-neutral-400">
              <div className="flex justify-between">
                <span>Стоимость товара:</span>
                <span className="font-mono tabular-nums text-neutral-200">{product.price} ₽</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Скидка по промокоду:</span>
                  <span className="font-mono tabular-nums">-{discountAmount} ₽</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-850">
                <span>Итого к оплате:</span>
                <span className="font-mono tabular-nums text-amber-400 text-base">{finalPrice} ₽</span>
              </div>
            </div>

            {/* Submit payment button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-neutral-950" />
                  <span>Обработка платежа и выдача аккаунта...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Оплатить {finalPrice} ₽ и получить данные</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-neutral-500 text-center flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Безопасное соединение · Мгновенное открытие логина и пароля</span>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};
