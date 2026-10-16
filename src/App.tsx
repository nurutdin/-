import React, { useState, useEffect } from 'react';
import { Product, ProductType, Order, Review } from './types';
import { initialGames } from './data/initialGames';
import { initialReviews } from './data/initialReviews';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { AdvantageSection } from './components/AdvantageSection';
import { StepGuide } from './components/StepGuide';
import { Catalog } from './components/Catalog';
import { GameModal } from './components/GameModal';
import { CheckoutModal } from './components/CheckoutModal';
import { DeliveryModal } from './components/DeliveryModal';
import { MyPurchasesModal } from './components/MyPurchasesModal';
import { SellerAdminPanel } from './components/SellerAdminPanel';
import { CyberHackerMiniGame } from './components/CyberHackerMiniGame';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

export default function App() {
  // Products, Orders, Reviews state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('playground_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialGames;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('playground_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('playground_reviews');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return initialReviews;
  });

  // Owner authentication state
  const [ownerPin, setOwnerPin] = useState<string>(() => {
    try {
      return localStorage.getItem('playground_owner_pin') || '7777';
    } catch {
      return '7777';
    }
  });

  const [isOwnerAuthenticated, setIsOwnerAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('playground_owner_session') === 'true';
  });

  const [activeCategory, setActiveCategory] = useState<ProductType>('offline_account');

  // Modals & Mini-game state
  const [selectedGameForModal, setSelectedGameForModal] = useState<Product | null>(null);
  const [selectedGameForCheckout, setSelectedGameForCheckout] = useState<Product | null>(null);
  const [activeDeliveryOrder, setActiveDeliveryOrder] = useState<Order | null>(null);
  const [showMyPurchases, setShowMyPurchases] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showMiniGame, setShowMiniGame] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('');

  // Storage persistence
  useEffect(() => {
    try {
      localStorage.setItem('playground_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('playground_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('playground_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('playground_owner_pin', ownerPin);
    } catch (e) {
      console.error(e);
    }
  }, [ownerPin]);

  const handleAuthenticateOwner = (inputPin: string): boolean => {
    if (inputPin.trim() === ownerPin.trim()) {
      setIsOwnerAuthenticated(true);
      sessionStorage.setItem('playground_owner_session', 'true');
      return true;
    }
    return false;
  };

  const handleLogoutOwner = () => {
    setIsOwnerAuthenticated(false);
    sessionStorage.removeItem('playground_owner_session');
    setShowAdmin(false);
  };

  const handleUpdateOwnerPin = (newPin: string) => {
    setOwnerPin(newPin);
  };

  const handleCheckoutSuccess = (order: Order) => {
    setOrders(prev => [order, ...prev]);

    // Decrease stock for this game
    setProducts(prev =>
      prev.map(p => {
        if (p.id === order.productId) {
          const remainingPool = p.accountsPool.slice(1);
          return {
            ...p,
            inStock: Math.max(0, p.inStock - 1),
            accountsPool: remainingPool.length > 0 ? remainingPool : p.accountsPool
          };
        }
        return p;
      })
    );

    setSelectedGameForCheckout(null);
    setActiveDeliveryOrder(order);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const handleAddReview = (newReview: Review) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const handlePromoFromMiniGame = (code: string) => {
    setAppliedPromoCode(code);
    setShowMiniGame(false);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      
      {/* Floating Owner Bar if logged in */}
      {isOwnerAuthenticated && (
        <div className="bg-amber-400 text-neutral-950 px-4 py-1.5 text-xs font-bold flex items-center justify-between sticky top-0 z-50 shadow-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-950" />
            <span>Вы вошли как единственный владелец playgroundoffline</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdmin(true)}
              className="underline hover:text-black font-semibold cursor-pointer"
            >
              Панель управления (загрузка фото/видео)
            </button>
            <button
              onClick={handleLogoutOwner}
              className="px-2 py-0.5 rounded bg-neutral-900 text-amber-400 text-[10px] uppercase font-mono cursor-pointer"
            >
              Выйти
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <Header
        onOpenMyPurchases={() => setShowMyPurchases(true)}
        onOpenAdmin={() => setShowAdmin(true)}
        onOpenMiniGame={() => setShowMiniGame(true)}
        myPurchasesCount={orders.length}
        isOwnerAuthenticated={isOwnerAuthenticated}
      />

      <main className="flex-1">
        {/* Hero Banner with Mini-game Callout */}
        <HeroBanner
          onExploreClick={() => scrollToSection('catalog')}
          onWhyClick={() => scrollToSection('advantages')}
          onOpenMiniGame={() => setShowMiniGame(true)}
          gamesCount={products.filter(p => p.type === 'offline_account').length}
        />

        {/* Advantage & Trust Comparison Section */}
        <AdvantageSection />

        {/* 3-Step Simple Activation Guide */}
        <StepGuide />

        {/* Catalog of Games */}
        <Catalog
          products={products}
          onSelectProduct={(product) => setSelectedGameForModal(product)}
          onBuyProduct={(product) => setSelectedGameForCheckout(product)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Reviews Section */}
        <ReviewsSection
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer 
        onOpenAdmin={() => setShowAdmin(true)} 
        isOwnerAuthenticated={isOwnerAuthenticated}
      />

      {/* MODALS */}

      {/* Game Details & Native Video Modal */}
      {selectedGameForModal && (
        <GameModal
          product={selectedGameForModal}
          onClose={() => setSelectedGameForModal(null)}
          onBuy={(product) => {
            setSelectedGameForModal(null);
            setSelectedGameForCheckout(product);
          }}
        />
      )}

      {/* Checkout & Payment Modal */}
      {selectedGameForCheckout && (
        <CheckoutModal
          product={selectedGameForCheckout}
          onClose={() => setSelectedGameForCheckout(null)}
          onSuccess={handleCheckoutSuccess}
          initialPromo={appliedPromoCode}
        />
      )}

      {/* Immediate Delivery Receipt Modal */}
      {activeDeliveryOrder && (
        <DeliveryModal
          order={activeDeliveryOrder}
          onClose={() => setActiveDeliveryOrder(null)}
        />
      )}

      {/* My Purchases Lookup Modal */}
      {showMyPurchases && (
        <MyPurchasesModal
          orders={orders}
          onClose={() => setShowMyPurchases(false)}
          onSelectOrderToView={(order) => {
            setShowMyPurchases(false);
            setActiveDeliveryOrder(order);
          }}
        />
      )}

      {/* CyberHacker Gamer Mini-Game Modal */}
      {showMiniGame && (
        <CyberHackerMiniGame
          onClose={() => setShowMiniGame(false)}
          onApplyPromoCode={handlePromoFromMiniGame}
        />
      )}

      {/* Seller Admin Management Panel */}
      {showAdmin && (
        <SellerAdminPanel
          products={products}
          orders={orders}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onClose={() => setShowAdmin(false)}
          isOwnerAuthenticated={isOwnerAuthenticated}
          onAuthenticateOwner={handleAuthenticateOwner}
          onLogoutOwner={handleLogoutOwner}
          ownerPin={ownerPin}
          onUpdateOwnerPin={handleUpdateOwnerPin}
        />
      )}

    </div>
  );
}
