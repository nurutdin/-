import React, { useState, useMemo } from 'react';
import { Product, ProductType } from '../types';
import { Search, Film, ShoppingCart, Star, Shield, Filter, CheckCircle2 } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onBuyProduct: (product: Product) => void;
  activeCategory: ProductType;
  onCategoryChange: (category: ProductType) => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onSelectProduct,
  onBuyProduct,
  activeCategory,
  onCategoryChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Все');
  const [sortBy, setSortBy] = useState<'popular' | 'price_asc' | 'price_desc' | 'rating'>('popular');

  // Collect unique genres
  const genres = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => (p.genre || []).forEach(g => set.add(g)));
    return ['Все', ...Array.from(set)];
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        if (p.type !== activeCategory) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (p.title || '').toLowerCase().includes(q);
          const matchGenre = (p.genre || []).some(g => g.toLowerCase().includes(q));
          const matchDesc = (p.shortDescription || '').toLowerCase().includes(q);
          if (!matchTitle && !matchGenre && !matchDesc) return false;
        }

        // Genre filter
        if (selectedGenre !== 'Все') {
          if (!(p.genre || []).includes(selectedGenre)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default popular
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, activeCategory, searchQuery, selectedGenre, sortBy]);

  return (
    <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Category Tabs: Future-proof for Keys, Top-up, Subscriptions */}
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Каталог цифровых товаров
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Выберите желаемую игру для мгновенной офлайн-активации со всеми дополнениями
          </p>
        </div>

        {/* Product Type Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900 rounded-xl border border-neutral-800">
          <button
            onClick={() => onCategoryChange('offline_account')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
              activeCategory === 'offline_account'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Офлайн аккаунты
          </button>
          
          <button
            onClick={() => onCategoryChange('key')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'key'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span>Ключи активации</span>
            <span className="text-[10px] uppercase tracking-wider text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded">
              Скоро
            </span>
          </button>

          <button
            onClick={() => onCategoryChange('topup')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'topup'
                ? 'bg-amber-400 text-neutral-950 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span>Пополнение баланса</span>
            <span className="text-[10px] uppercase tracking-wider text-amber-400/90 bg-amber-400/10 px-1.5 py-0.5 rounded">
              Скоро
            </span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Поиск по названию игры (например, Wukong, Cyberpunk, Silent Hill)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-900 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Очистить
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 whitespace-nowrap hidden lg:inline">Сортировка:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 text-xs font-medium bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-200 focus:outline-none focus:border-amber-400/60"
            >
              <option value="popular">По популярности</option>
              <option value="rating">По рейтингу</option>
              <option value="price_asc">Сначала дешевле</option>
              <option value="price_desc">Сначала дороже</option>
            </select>
          </div>
        </div>

        {/* Genre Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-neutral-400 flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3.5 h-3.5" /> Жанр:
          </span>
          {genres.map(genre => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-neutral-800 text-white font-semibold border border-neutral-700'
                  : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900/60 hover:bg-neutral-850'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center rounded-2xl border border-dashed border-neutral-800 bg-neutral-900/30">
          <p className="text-neutral-400 text-sm">По вашему запросу ничего не найдено.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedGenre('Все'); }}
            className="mt-3 text-xs text-amber-400 hover:underline"
          >
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const savingsPercent = Math.round(
              ((product.officialPrice - product.price) / product.officialPrice) * 100
            );

            return (
              <div
                key={product.id}
                className="gamer-card-glow group flex flex-col justify-between rounded-2xl bg-neutral-900/60 border border-neutral-800/90 overflow-hidden shadow-lg shadow-black/60 relative"
              >
                {/* Product Media Container */}
                <div 
                  className="relative aspect-[16/10] overflow-hidden bg-neutral-850 cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback gradient if image fails
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Fallback styling container behind image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent pointer-events-none" />

                  {/* Badge & Platform */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-neutral-950/80 text-amber-400 border border-amber-400/30 backdrop-blur-sm">
                      {product.badge || 'Офлайн'}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-neutral-950/80 text-neutral-300 border border-neutral-800 backdrop-blur-sm">
                      {product.platform}
                    </span>
                  </div>

                  {/* Savings percentage callout */}
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-600/90 text-white shadow-sm">
                      -{savingsPercent}%
                    </span>
                  </div>

                  {/* Quick Trailer Button Overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    className="absolute bottom-3 right-3 px-2.5 py-1 text-xs font-medium rounded-lg bg-neutral-950/85 hover:bg-neutral-900 text-neutral-200 hover:text-white border border-neutral-800 flex items-center gap-1.5 backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>Трейлер & Инфо</span>
                  </button>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Metadata line (Unboxed with typographic separators) */}
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                      <span>{product.releaseYear}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{(product.genre || []).slice(0, 2).join(', ')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span className="tabular-nums">{product.rating}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="text-base font-bold text-white hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer"
                      title={product.title}
                    >
                      {product.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Features list (Compact) */}
                    <ul className="mt-3 space-y-1 text-xs text-neutral-300">
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Все сюжетные DLC включены</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Сохранения на вашем ПК</span>
                      </li>
                    </ul>
                  </div>

                  {/* Pricing and Action row */}
                  <div className="pt-4 border-t border-neutral-850 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-white font-mono tabular-nums">
                          {product.price} ₽
                        </span>
                        <span className="text-xs text-neutral-500 line-through font-mono tabular-nums">
                          {product.officialPrice} ₽
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">
                        В наличии: {product.inStock} шт.
                      </div>
                    </div>

                    <button
                      onClick={() => onBuyProduct(product)}
                      className="px-4 py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center gap-1.5 shadow-sm hover:shadow-amber-400/20 cursor-pointer"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Купить</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
