import React, { useState } from 'react';
import { Product } from '../types';
import { X, Play, Image as ImageIcon, CheckCircle2, Shield, ShoppingCart, Film, Star, AlertCircle } from 'lucide-react';

interface GameModalProps {
  product: Product | null;
  onClose: () => void;
  onBuy: (product: Product) => void;
}

export const GameModal: React.FC<GameModalProps> = ({
  product,
  onClose,
  onBuy
}) => {
  if (!product) return null;

  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'screenshots'>('video');
  const [selectedScreenshot, setSelectedScreenshot] = useState<string>(product.screenshots[0] || product.coverImage);
  const [videoError, setVideoError] = useState(false);

  const savingsPercent = Math.round(
    ((product.officialPrice - product.price) / product.officialPrice) * 100
  );

  const hasDirectVideo = Boolean(product.videoUrl);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl my-6 text-neutral-100 flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/95 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20 font-mono">
              {product.platform}
            </span>
            <h2 className="text-base sm:text-xl font-extrabold text-white truncate max-w-md sm:max-w-xl">
              {product.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8">
          
          {/* Media Player Viewport (Embedded inline, never redirects outside!) */}
          <div className="space-y-3">
            {/* Media Selector Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
                <button
                  onClick={() => setActiveMediaTab('video')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeMediaTab === 'video'
                      ? 'bg-neutral-800 text-amber-400 font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Видео геймплея (Встроенное)</span>
                </button>
                <button
                  onClick={() => setActiveMediaTab('screenshots')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activeMediaTab === 'screenshots'
                      ? 'bg-neutral-800 text-amber-400 font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Галерея скриншотов</span>
                </button>
              </div>

              <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="font-bold text-white tabular-nums">{product.rating}</span>
                <span>({product.reviewsCount} отзывов)</span>
              </div>
            </div>

            {/* Video or Screenshot Viewport */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-inner">
              {activeMediaTab === 'video' ? (
                hasDirectVideo ? (
                  // Direct HTML5 video uploaded by seller or linked directly (NO YouTube redirects!)
                  <video
                    src={product.videoUrl}
                    controls
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  >
                    Ваш браузер не поддерживает воспроизведение видео.
                  </video>
                ) : product.trailerYoutubeId && !videoError ? (
                  // Embedded player with parameters to keep user strictly inline
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${product.trailerYoutubeId}?playsinline=1&rel=0&modestbranding=1&controls=1&iv_load_policy=3&fs=1`}
                    title={`${product.title} Gameplay Video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onError={() => setVideoError(true)}
                  />
                ) : (
                  // Fallback animated high-res scene if video unavailable
                  <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-950 p-6 text-center space-y-3">
                    <img
                      src={product.coverImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-sm"
                    />
                    <div className="relative z-10 space-y-2">
                      <Film className="w-10 h-10 text-amber-400 mx-auto" />
                      <p className="text-sm font-semibold text-white">{product.title}</p>
                      <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                        Видео воспроизводится во встроенном плеере без переходов. Переключитесь на вкладку «Галерея скриншотов» для просмотра графики.
                      </p>
                      <button
                        onClick={() => setActiveMediaTab('screenshots')}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg text-white"
                      >
                        Смотреть скриншоты
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={selectedScreenshot}
                    alt={`${product.title} screenshot`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {/* Thumbnails rail */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 overflow-x-auto p-1.5 bg-neutral-950/85 backdrop-blur-md rounded-lg border border-neutral-800">
                    {[product.coverImage, ...(product.screenshots || [])].map((shot, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedScreenshot(shot)}
                        className={`w-16 h-10 rounded overflow-hidden shrink-0 border transition-all cursor-pointer ${
                          selectedScreenshot === shot ? 'border-amber-400 ring-1 ring-amber-400' : 'border-neutral-700 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={shot} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 2-Column Split: Details & Purchase Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left 2 Cols: Description & Specs */}
            <div className="lg:col-span-2 space-y-6">
              
              <div>
                <h3 className="text-base font-bold text-white mb-2">Об игре</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              {/* What is included */}
              <div>
                <h3 className="text-base font-bold text-white mb-3">Что входит в издание:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(product.features || ['Все вышедшие сюжетные DLC', 'Пожизненный доступ']).map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200 p-2.5 rounded-lg bg-neutral-950/70 border border-neutral-850">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Requirements */}
              <div>
                <h3 className="text-base font-bold text-white mb-3">Системные требования:</h3>
                <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-850 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-neutral-500 font-medium">Операционная система:</span>
                    <p className="text-neutral-200 mt-0.5">{product.systemRequirements?.os || 'Windows 10 / 11 64-bit'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium">Процессор:</span>
                    <p className="text-neutral-200 mt-0.5">{product.systemRequirements?.processor || 'Intel Core i5 / AMD Ryzen 5'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium">Оперативная память:</span>
                    <p className="text-neutral-200 mt-0.5">{product.systemRequirements?.memory || '16 GB RAM'}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium">Видеокарта:</span>
                    <p className="text-neutral-200 mt-0.5">{product.systemRequirements?.graphics || 'GTX 1060 / RX 580'}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-neutral-500 font-medium">Место на диске:</span>
                    <p className="text-neutral-200 mt-0.5">{product.systemRequirements?.storage || '80 GB SSD'}</p>
                  </div>
                </div>
              </div>

              {/* Metadata details */}
              <div className="pt-2 text-xs text-neutral-400 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-neutral-850">
                <div>
                  <span className="text-neutral-500">Разработчик:</span>
                  <p className="text-neutral-300 font-medium">{product.developer}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Издатель:</span>
                  <p className="text-neutral-300 font-medium">{product.publisher}</p>
                </div>
                <div>
                  <span className="text-neutral-500">Локализация:</span>
                  <p className="text-neutral-300 font-medium">{product.languages}</p>
                </div>
              </div>

            </div>

            {/* Right 1 Col: Purchase Card */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5 lg:sticky lg:top-20">
              
              <div>
                <span className="text-xs text-neutral-400">Стоимость офлайн-аккаунта:</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                    {product.price} ₽
                  </span>
                  <span className="text-sm text-neutral-500 line-through font-mono tabular-nums">
                    {product.officialPrice} ₽
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600/90 text-white">
                    -{savingsPercent}%
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-neutral-300 border-t border-b border-neutral-850 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Тип товара:</span>
                  <span className="font-semibold text-neutral-200">Офлайн аккаунт {product.platform}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Выдача:</span>
                  <span className="font-semibold text-emerald-400">Мгновенно на сайте</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">В наличии:</span>
                  <span className="font-semibold text-neutral-200">{product.inStock} шт.</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-400">Гарантия:</span>
                  <span className="font-semibold text-neutral-200">Бессрочная</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onBuy(product);
                }}
                className="w-full py-3.5 px-4 text-sm font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Купить за {product.price} ₽</span>
              </button>

              <div className="text-[11px] text-neutral-500 text-center leading-relaxed">
                Логин и пароль появятся прямо на экране + доступно скачивание чека в .txt
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
