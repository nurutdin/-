import React, { useState } from 'react';
import { Product, ProductType, Order } from '../types';
import { Plus, Trash2, Package, ShoppingBag, X, Check, KeyRound, Lock, Unlock, Key, ShieldCheck, AlertCircle, Upload, Film, Image as ImageIcon } from 'lucide-react';

interface SellerAdminPanelProps {
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onClose: () => void;
  isOwnerAuthenticated: boolean;
  onAuthenticateOwner: (pin: string) => boolean;
  onLogoutOwner: () => void;
  ownerPin: string;
  onUpdateOwnerPin: (newPin: string) => void;
}

export const SellerAdminPanel: React.FC<SellerAdminPanelProps> = ({
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onClose,
  isOwnerAuthenticated,
  onAuthenticateOwner,
  onLogoutOwner,
  ownerPin,
  onUpdateOwnerPin
}) => {
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'add_product' | 'replenish' | 'settings'>('inventory');
  const [selectedProductForRestock, setSelectedProductForRestock] = useState<Product | null>(null);
  const [restockRawText, setRestockRawText] = useState('');

  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<ProductType>('offline_account');
  const [newPlatform, setNewPlatform] = useState<'Steam' | 'Epic Games' | 'EA App' | 'Ubisoft Connect' | 'PlayStation'>('Steam');
  const [newPrice, setNewPrice] = useState(390);
  const [newOfficialPrice, setNewOfficialPrice] = useState(4999);
  const [newGenres, setNewGenres] = useState('Экшен, RPG');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newFullDesc, setNewFullDesc] = useState('');

  // Media state (supports both direct file uploads and links!)
  const [newCoverImage, setNewCoverImage] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80');
  const [newScreenshots, setNewScreenshots] = useState<string[]>([]);
  const [videoMode, setVideoMode] = useState<'upload' | 'direct_url' | 'youtube'>('upload');
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string>('');
  const [newTrailerId, setNewTrailerId] = useState('');
  const [newAccountsRaw, setNewAccountsRaw] = useState('');

  const totalRevenue = orders.reduce((sum, o) => sum + o.price, 0);
  const totalAccountsInStock = products.reduce((sum, p) => sum + p.inStock, 0);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuthenticateOwner(pinInput);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPinInput('');
    }
  };

  // Handle Cover image file upload from PC
  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setNewCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Screenshot file uploads from PC
  const handleScreenshotsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setNewScreenshots(prev => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle Video file upload from PC
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUploadedVideoUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const accountsLines = newAccountsRaw
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const parsedPool = accountsLines.map((line, idx) => {
      const parts = line.split(':');
      const login = parts[0]?.trim() || `acc_${idx + 1}`;
      const password = parts[1]?.trim() || 'SafePass2026!';
      return {
        id: `acc-${Date.now()}-${idx}`,
        login,
        password,
        pinOrGuard: 'Steam Guard подтвержден',
        notes: 'Свежая партия'
      };
    });

    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const created: Product = {
      id: `game-${Date.now()}`,
      type: newType,
      title: newTitle,
      slug,
      price: Number(newPrice),
      officialPrice: Number(newOfficialPrice),
      platform: newPlatform,
      genre: newGenres.split(',').map(g => g.trim()),
      shortDescription: newShortDesc || `Официальная офлайн-версия ${newTitle} с бессрочной гарантией.`,
      fullDescription: newFullDesc || `${newTitle} — захватывающее одиночное прохождение со всеми сюжетными дополнениями.`,
      trailerYoutubeId: videoMode === 'youtube' ? newTrailerId : undefined,
      videoUrl: (videoMode === 'upload' || videoMode === 'direct_url') ? uploadedVideoUrl : undefined,
      videoType: videoMode === 'youtube' ? 'youtube' : 'direct',
      coverImage: newCoverImage,
      screenshots: newScreenshots.length > 0 ? newScreenshots : [newCoverImage],
      features: [
        'Все вышедшие сюжетные DLC',
        'Автономный режим навсегда',
        'Сохранения на вашем ПК',
        'Пожизненный доступ'
      ],
      systemRequirements: {
        os: 'Windows 10 / 11 64-bit',
        processor: 'Intel Core i5 / AMD Ryzen 5',
        memory: '16 GB RAM',
        graphics: 'GTX 1060 / RX 580',
        storage: '80 GB SSD'
      },
      inStock: parsedPool.length > 0 ? parsedPool.length : 5,
      accountsPool: parsedPool.length > 0 ? parsedPool : [
        { id: `acc-init-1`, login: `${slug}_user1`, password: 'AutoPassword#2026', pinOrGuard: 'Код не требуется' }
      ],
      badge: 'Новинка',
      rating: 5.0,
      reviewsCount: 1,
      releaseYear: 2024,
      developer: 'Official Studio',
      publisher: 'Official Publisher',
      languages: 'Русский интерфейс'
    };

    onAddProduct(created);
    setNewTitle('');
    setNewAccountsRaw('');
    setUploadedVideoUrl('');
    setNewScreenshots([]);
    setActiveTab('inventory');
  };

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductForRestock) return;

    const lines = restockRawText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const newAccounts = lines.map((line, idx) => {
      const parts = line.split(':');
      return {
        id: `acc-restock-${Date.now()}-${idx}`,
        login: parts[0]?.trim() || `login_${idx}`,
        password: parts[1]?.trim() || 'SafePass2026!',
        pinOrGuard: 'Готов к входу',
        notes: 'Пополнение'
      };
    });

    const updated: Product = {
      ...selectedProductForRestock,
      accountsPool: [...selectedProductForRestock.accountsPool, ...newAccounts],
      inStock: selectedProductForRestock.inStock + newAccounts.length
    };

    onUpdateProduct(updated);
    setSelectedProductForRestock(null);
    setRestockRawText('');
    setActiveTab('inventory');
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.length >= 4) {
      onUpdateOwnerPin(newPinInput);
      setPinChangeSuccess(true);
      setNewPinInput('');
      setTimeout(() => setPinChangeSuccess(false), 3000);
    }
  };

  if (!isOwnerAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
        <div 
          className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-100 p-6 space-y-5"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Вход для владельца</h3>
                <span className="text-[11px] text-neutral-400">playgroundoffline</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs text-neutral-400 leading-relaxed bg-neutral-950 p-3.5 rounded-xl border border-neutral-850">
            Этот магазин настроен в режиме <strong className="text-neutral-200">единственного продавца</strong>. Только вы как владелец можете добавлять товары, менять цены и пополнять склад.
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300">
                Введите PIN-код владельца:
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="••••"
                value={pinInput}
                onChange={e => {
                  setPinInput(e.target.value);
                  setAuthError(false);
                }}
                className="w-full px-4 py-2.5 text-center tracking-widest text-lg font-mono bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
              <span className="text-[11px] text-neutral-500 block text-center">
                Стандартный PIN-код: <code className="text-amber-400 font-bold">7777</code>
              </span>
            </div>

            {authError && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 bg-rose-950/40 p-2.5 rounded-lg border border-rose-800/60">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Неверный PIN-код владельца. Попробуйте 7777</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Войти в управление магазином</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl text-neutral-100 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/90">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              <h2 className="text-base sm:text-lg font-extrabold text-white">
                Панель владельца: playgroundoffline
              </h2>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Загрузка собственных фото и видео, управление складом и заказами
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onLogoutOwner}
              className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 rounded-lg transition-colors cursor-pointer"
            >
              Выйти из сессии
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats strip */}
        <div className="p-4 bg-neutral-950/70 border-b border-neutral-850 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-neutral-500 block">Игр в продаже:</span>
            <span className="text-base font-extrabold text-white font-mono">{products.length}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-neutral-500 block">Остаток аккаунтов:</span>
            <span className="text-base font-extrabold text-emerald-400 font-mono">{totalAccountsInStock} шт.</span>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-neutral-500 block">Всего продаж:</span>
            <span className="text-base font-extrabold text-white font-mono">{orders.length}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-neutral-900/60 border border-neutral-800">
            <span className="text-neutral-500 block">Выручка владельца:</span>
            <span className="text-base font-extrabold text-amber-400 font-mono">{totalRevenue} ₽</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-neutral-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Товары ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('add_product')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'add_product'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Добавить игру (со своими фото и видео)</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>История продаж ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Безопасность и PIN</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* TAB 1: Inventory */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Управление ассортиментом</h3>
                <button
                  onClick={() => setActiveTab('add_product')}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Добавить игру</span>
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-neutral-800">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-950/80 text-neutral-400">
                      <th className="py-3 px-4">Игра</th>
                      <th className="py-3 px-3">Категория</th>
                      <th className="py-3 px-3">Медиа</th>
                      <th className="py-3 px-3">Цена</th>
                      <th className="py-3 px-3">Остаток</th>
                      <th className="py-3 px-4 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-850">
                    {products.map(prod => (
                      <tr key={prod.id} className="hover:bg-neutral-850/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={prod.coverImage}
                              alt=""
                              className="w-10 h-7 rounded object-cover border border-neutral-800 shrink-0"
                            />
                            <div>
                              <span className="font-semibold text-white block">{prod.title}</span>
                              <span className="text-[10px] text-neutral-500 font-mono">{prod.platform}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[11px] text-amber-400">
                            {prod.type === 'offline_account' ? 'Офлайн аккаунт' : 'Ключ / Баланс'}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {prod.videoUrl ? 'Свое видео' : 'YouTube'}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-white tabular-nums">
                          {prod.price} ₽
                        </td>
                        <td className="py-3 px-3">
                          <span className={`font-mono font-semibold ${prod.inStock > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {prod.inStock} шт.
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setSelectedProductForRestock(prod);
                                setActiveTab('replenish');
                              }}
                              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-medium flex items-center gap-1 cursor-pointer"
                              title="Пополнить логины и пароли"
                            >
                              <KeyRound className="w-3 h-3" />
                              <span>Пополнить</span>
                            </button>
                            <button
                              onClick={() => onDeleteProduct(prod.id)}
                              className="p-1 rounded text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
                              title="Удалить товар"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Add Product Form with Direct Photo & Video Upload */}
          {activeTab === 'add_product' && (
            <form onSubmit={handleCreateProduct} className="space-y-6 max-w-2xl mx-auto">
              <div className="border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-white">
                  Добавление новой игры в playgroundoffline
                </h3>
                <p className="text-xs text-neutral-400">
                  Вы можете загрузить свои собственные фотографии и видеофайлы прямо с компьютера или телефона!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-neutral-300 font-semibold">Название игры:</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: S.T.A.L.K.E.R. 2: Heart of Chornobyl"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold">Категория:</label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none"
                  >
                    <option value="offline_account">Офлайн аккаунт (сейчас)</option>
                    <option value="key">Ключ активации (на будущее)</option>
                    <option value="topup">Пополнение баланса (на будущее)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold">Платформа:</label>
                  <select
                    value={newPlatform}
                    onChange={e => setNewPlatform(e.target.value as any)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none"
                  >
                    <option value="Steam">Steam</option>
                    <option value="Epic Games">Epic Games</option>
                    <option value="EA App">EA App</option>
                    <option value="Ubisoft Connect">Ubisoft Connect</option>
                    <option value="PlayStation">PlayStation</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold">Ваша цена (₽):</label>
                  <input
                    type="number"
                    min="1"
                    value={newPrice}
                    onChange={e => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-300 font-semibold">Официальная цена (₽):</label>
                  <input
                    type="number"
                    min="1"
                    value={newOfficialPrice}
                    onChange={e => setNewOfficialPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-neutral-300 font-semibold">Жанры (через запятую):</label>
                  <input
                    type="text"
                    value={newGenres}
                    onChange={e => setNewGenres(e.target.value)}
                    placeholder="Шутер, Открытый мир, Выживание"
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none"
                  />
                </div>

                {/* --- PHOTO UPLOAD SECTION --- */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>Обложка игры (Загрузка своего фото)</span>
                  </div>

                  <div className="flex items-start gap-4">
                    <img
                      src={newCoverImage}
                      alt="Превью обложки"
                      className="w-24 h-16 rounded-lg object-cover border border-neutral-700 shrink-0 bg-neutral-900"
                    />
                    <div className="space-y-2 flex-1">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-semibold text-xs cursor-pointer transition-colors border border-neutral-700">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Выбрать фото с компьютера или телефона</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleCoverFileUpload}
                          className="hidden"
                        />
                      </label>
                      <div className="text-[11px] text-neutral-500">
                        или укажите URL:
                      </div>
                      <input
                        type="url"
                        value={newCoverImage}
                        onChange={e => setNewCoverImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1 text-xs bg-neutral-900 border border-neutral-800 rounded text-neutral-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Screenshots multi-upload */}
                  <div className="pt-3 border-t border-neutral-850 space-y-2">
                    <label className="text-neutral-300 font-semibold block">
                      Дополнительные скриншоты для галереи:
                    </label>
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-850 hover:bg-neutral-800 text-neutral-200 text-xs cursor-pointer border border-neutral-750">
                      <Upload className="w-3.5 h-3.5 text-amber-400" />
                      <span>Загрузить файлы скриншотов</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleScreenshotsUpload}
                        className="hidden"
                      />
                    </label>
                    {newScreenshots.length > 0 && (
                      <div className="flex items-center gap-2 overflow-x-auto pt-2">
                        {newScreenshots.map((shot, idx) => (
                          <div key={idx} className="relative shrink-0 w-16 h-12 rounded border border-neutral-750 overflow-hidden group">
                            <img src={shot} alt="" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setNewScreenshots(prev => prev.filter((_, i) => i !== idx))}
                              className="absolute inset-0 bg-red-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* --- VIDEO UPLOAD / DIRECT PLAYER SECTION --- */}
                <div className="sm:col-span-2 p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Film className="w-4 h-4 text-amber-400" />
                      <span>Геймплейное видео (Воспроизведение без перехода на сторонние сайты)</span>
                    </div>
                  </div>

                  {/* Mode selector */}
                  <div className="flex items-center gap-2 p-1 bg-neutral-900 rounded-lg border border-neutral-800">
                    <button
                      type="button"
                      onClick={() => setVideoMode('upload')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        videoMode === 'upload' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Свой видеофайл (MP4 / WebM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoMode('direct_url')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        videoMode === 'direct_url' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Прямая ссылка на видео
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoMode('youtube')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                        videoMode === 'youtube' ? 'bg-amber-400 text-neutral-950' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      YouTube ID
                    </button>
                  </div>

                  {/* Video Input Based on Mode */}
                  {videoMode === 'upload' && (
                    <div className="space-y-2">
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-amber-400 font-semibold text-xs cursor-pointer border border-neutral-700">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Выбрать MP4 видеофайл с устройства</span>
                        <input
                          type="file"
                          accept="video/mp4,video/webm"
                          onChange={handleVideoFileUpload}
                          className="hidden"
                        />
                      </label>
                      {uploadedVideoUrl && (
                        <div className="mt-2 rounded-lg overflow-hidden border border-neutral-800 max-w-sm">
                          <video src={uploadedVideoUrl} controls className="w-full h-32 object-cover" />
                          <span className="text-[10px] text-emerald-400 block p-1 bg-neutral-900 text-center">
                            ✓ Видео загружено и готово к показу прямо на сайте!
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {videoMode === 'direct_url' && (
                    <div className="space-y-1">
                      <input
                        type="url"
                        placeholder="https://example.com/gameplay.mp4"
                        value={uploadedVideoUrl}
                        onChange={e => setUploadedVideoUrl(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none"
                      />
                      <span className="text-[11px] text-neutral-500">
                        Прямая ссылка на видеофайл MP4/WebM. Играет напрямую в плеере сайта.
                      </span>
                    </div>
                  )}

                  {videoMode === 'youtube' && (
                    <div className="space-y-1">
                      <input
                        type="text"
                        placeholder="Например: pnSsgkjTxbE"
                        value={newTrailerId}
                        onChange={e => setNewTrailerId(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none"
                      />
                      <span className="text-[11px] text-neutral-500">
                        Укажите ID ролика. Видео воспроизводится во встроенном плеере.
                      </span>
                    </div>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-neutral-300 font-semibold">
                    Запас аккаунтов (по одной строке логин:пароль):
                  </label>
                  <textarea
                    rows={4}
                    value={newAccountsRaw}
                    onChange={e => setNewAccountsRaw(e.target.value)}
                    placeholder={`stalker_acc_01:VaultPass2026!\nstalker_acc_02:VaultPass2026!`}
                    className="w-full font-mono text-xs px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none"
                  />
                </div>

              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Опубликовать игру в playgroundoffline</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className="px-4 py-3 text-xs text-neutral-400 hover:text-white"
                >
                  Отмена
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: Replenish Stock */}
          {activeTab === 'replenish' && selectedProductForRestock && (
            <form onSubmit={handleRestockSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-white">
                  Пополнение склада: {selectedProductForRestock.title}
                </h3>
                <span className="text-xs text-emerald-400 font-mono">
                  На складе: {selectedProductForRestock.inStock} шт.
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <label className="text-neutral-300 font-medium">
                  Вставьте новые аккаунты (по одной строке логин:пароль):
                </label>
                <textarea
                  required
                  rows={6}
                  value={restockRawText}
                  onChange={e => setRestockRawText(e.target.value)}
                  placeholder={`login_01:Password!2026\nlogin_02:Password!2026`}
                  className="w-full font-mono text-xs px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Пополнить склад</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setSelectedProductForRestock(null); setActiveTab('inventory'); }}
                  className="px-4 py-2.5 text-xs text-neutral-400 hover:text-white"
                >
                  Отмена
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: Orders History */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white">Все заказы покупателей playgroundoffline</h3>

              {orders.length === 0 ? (
                <p className="text-xs text-neutral-500 py-8 text-center">Заказов пока не поступало.</p>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-neutral-800">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-800 bg-neutral-950/80 text-neutral-400">
                        <th className="py-3 px-3">Заказ</th>
                        <th className="py-3 px-3">Дата</th>
                        <th className="py-3 px-3">Игра</th>
                        <th className="py-3 px-3">Покупатель</th>
                        <th className="py-3 px-3">Выданный логин</th>
                        <th className="py-3 px-3">Выручка</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-850">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-neutral-850/40">
                          <td className="py-2.5 px-3 font-mono font-semibold text-amber-400">{o.orderNumber}</td>
                          <td className="py-2.5 px-3 text-neutral-400">{o.date}</td>
                          <td className="py-2.5 px-3 text-white font-medium">{o.productTitle}</td>
                          <td className="py-2.5 px-3 text-neutral-300">{o.buyerEmail}</td>
                          <td className="py-2.5 px-3 font-mono text-neutral-400">{o.issuedCredentials.login}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-emerald-400 tabular-nums">{o.price} ₽</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Security / Change PIN */}
          {activeTab === 'settings' && (
            <form onSubmit={handleChangePin} className="space-y-4 max-w-md mx-auto py-4">
              <h3 className="text-sm font-bold text-white border-b border-neutral-800 pb-2">
                Защита панели владельца
              </h3>

              <div className="text-xs text-neutral-400">
                Текущий PIN активен. Только тот, кто знает этот PIN, имеет доступ к добавлению игр, загрузке фото и видео, изменению цен и базе логинов.
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-neutral-300 font-medium">Новый PIN-код (от 4 знаков):</label>
                <input
                  type="password"
                  required
                  placeholder="Новый PIN"
                  value={newPinInput}
                  onChange={e => setNewPinInput(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-amber-400 font-mono tracking-widest text-center"
                />
              </div>

              {pinChangeSuccess && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-800/60">
                  <ShieldCheck className="w-4 h-4" />
                  <span>PIN-код владельца успешно обновлен!</span>
                </div>
              )}

              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
              >
                Сохранить новый PIN
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
