import React, { useState } from 'react';
import { Order } from '../types';
import { X, Search, Copy, Check, Download, ShoppingBag, ArrowRight } from 'lucide-react';

interface MyPurchasesModalProps {
  orders: Order[];
  onClose: () => void;
  onSelectOrderToView: (order: Order) => void;
}

export const MyPurchasesModal: React.FC<MyPurchasesModalProps> = ({
  orders,
  onClose,
  onSelectOrderToView
}) => {
  const [filterEmail, setFilterEmail] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredOrders = orders.filter(o => {
    if (!filterEmail.trim()) return true;
    const q = filterEmail.toLowerCase();
    return (
      o.buyerEmail.toLowerCase().includes(q) ||
      o.orderNumber.toLowerCase().includes(q) ||
      o.productTitle.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-100 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Мои покупки</h3>
            <span className="text-xs text-neutral-500 font-mono">({orders.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-neutral-850 bg-neutral-950/60">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по Email, номеру заказа или названию игры..."
              value={filterEmail}
              onChange={e => setFilterEmail(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/60"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="overflow-y-auto p-6 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 text-xs sm:text-sm space-y-2">
              <p>Пока нет оформленных заказов или совпадений по поиску.</p>
              <p className="text-neutral-500 text-xs">
                После оформления любой игры в каталоге, данные навсегда сохраняются здесь.
              </p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="p-4 rounded-xl bg-neutral-950 border border-neutral-850 hover:border-neutral-800 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-850 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{order.productTitle}</span>
                      <span className="text-[10px] text-amber-400 px-1.5 py-0.5 rounded bg-amber-400/10 font-mono">
                        {order.orderNumber}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      {order.date} · {order.buyerEmail}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-white font-mono tabular-nums">
                      {order.price} ₽
                    </span>
                  </div>
                </div>

                {/* Quick Credentials Copy Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] text-neutral-500 block">Логин:</span>
                      <span className="font-mono text-neutral-200 truncate block">
                        {order.issuedCredentials.login}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(order.issuedCredentials.login, `${order.id}-login`)}
                      className="text-neutral-400 hover:text-white p-1"
                      title="Скопировать логин"
                    >
                      {copiedId === `${order.id}-login` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900 border border-neutral-800">
                    <div className="min-w-0 pr-2">
                      <span className="text-[10px] text-neutral-500 block">Пароль:</span>
                      <span className="font-mono text-neutral-200 truncate block">
                        {order.issuedCredentials.password}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(order.issuedCredentials.password, `${order.id}-pwd`)}
                      className="text-neutral-400 hover:text-white p-1"
                      title="Скопировать пароль"
                    >
                      {copiedId === `${order.id}-pwd` ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* View Full Card */}
                <div className="pt-1 flex items-center justify-end">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectOrderToView(order);
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Открыть полную инструкцию и чек</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </div>
  );
};
