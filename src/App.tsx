import React, { useState } from 'react';
import { INITIAL_CROPS, INITIAL_PRE_ORDERS, INITIAL_QUALITY_BATCHES } from './data';
import { Crop, PreOrderRequest, QualityBatch, CartItem, ViewTab, FarmerSidebarTab, User as UserType, UserRole } from './types';
import Header from './components/Header';
import Marketplace from './components/Marketplace';
import FarmerDashboard from './components/FarmerDashboard';
import ProductDetails from './components/ProductDetails';
import QualityControl from './components/QualityControl';
import Logistics from './components/Logistics';
import LoginPage from './components/LoginPage'; // New import
import RegisterPage from './components/RegisterPage'; // New import
import CustomerDashboard from './components/CustomerDashboard'; // New import
// import AdminDashboard from './components/AdminDashboard'; // New import
import { Store, ShoppingBag, Truck, ClipboardCheck, CheckCircle, User } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<ViewTab>('login');
  const [farmerActiveSubTab, setFarmerActiveSubTab] = useState<FarmerSidebarTab>('dashboard');
  const [isNepali, setIsNepali] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  // Derived role from currentUser
  const currentRole: UserRole | null = currentUser ? currentUser.role : null;

  // Authentication Handlers
  const handleLogin = (user: UserType) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    setCurrentTab('dashboard'); // Redirect to dashboard after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setCurrentTab('login'); // Redirect to login after logout
  };
  
  // Master Synced Datasets
  const [crops, setCrops] = useState<Crop[]>(INITIAL_CROPS);
  const [preOrders, setPreOrders] = useState<PreOrderRequest[]>(INITIAL_PRE_ORDERS);
  const [qualityBatches, setQualityBatches] = useState<QualityBatch[]>(INITIAL_QUALITY_BATCHES);
  
  // Shopping Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  // Success Checkout Confirmation modal state
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Language translation helper
  const toggleLanguage = () => {
    setIsNepali(!isNepali);
  };

  // Cart operations
  const handleAddToCart = (crop: Crop, isBulk: boolean) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.crop.id === crop.id && item.isBulk === isBulk);
      if (existing) {
        return prev.map((item) => 
          item.crop.id === crop.id && item.isBulk === isBulk
            ? { ...item, quantity: item.quantity + (isBulk ? 50 : 1) }
            : item
        );
      }
      return [...prev, { crop, quantity: isBulk ? 50 : 1, isBulk }];
    });
  };

  const handleRemoveFromCart = (cropId: string) => {
    setCart((prev) => prev.filter((item) => item.crop.id !== cropId));
  };

  const handleUpdateCartQty = (cropId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(cropId);
      return;
    }
    setCart((prev) => 
      prev.map((item) => 
        item.crop.id === cropId 
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setCart([]);
  };

  // Farmer stock listing modifiers
  const handleAddNewCrop = (newCrop: Partial<Crop>) => {
    const freshCrop: Crop = {
      id: `crop-${Date.now()}`,
      name: newCrop.name || 'Organic Cauliflower',
      nepaliName: newCrop.nepaliName || 'काउली (Cauliflower)',
      category: newCrop.category || 'Vegetables',
      image: newCrop.image || 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?auto=format&fit=crop&q=80&w=300',
      farmer: newCrop.farmer || 'Ram Bahadur Gurung',
      farmerLocation: newCrop.farmerLocation || 'Kavre, Nepal',
      farmerRating: 4.8,
      farmerReviewsCount: 1,
      farmerProfileImg: newCrop.farmerProfileImg || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO65YI3apNnyhBtSn9WnrHHq54F13l63vyGHSl5Eh3d0YQUScZanjAAl_fMwjAQ6_6WwK1ukXik7P1EGXqjcG_H80bNAKyzBDC7GXuV271sn537zt4ch9lZRvwwIyETOoSpSAskueNA2rYVoJplt_33SwojFz7esYHTJn9its_gsQcbyTfJ5h7es2b1iSuIsrtQwQdj9tqayyob4ILLEqKz52nkXgBuUW4fO4bvZIu-kHG4ATLrDkwvZcY2FC-H9XfcROPgByREEt0',
      freshnessScore: newCrop.freshnessScore || 98,
      pricePerKgOriginal: newCrop.pricePerKgOriginal || 100,
      pricePerKgCurrent: newCrop.pricePerKgCurrent || 100,
      unit: newCrop.unit || 'Kg',
      rating: 5.0,
      tag: 'FRESH HARVEST',
      stockKg: newCrop.stockKg || 500,
      description: newCrop.description || 'Pristine harvest listed securely.',
      reviews: [],
      baseFarmPrice: newCrop.baseFarmPrice || 85,
      freshnessPremium: newCrop.freshnessPremium || 10,
      demandSurcharge: newCrop.demandSurcharge || 5,
    };

    setCrops((prev) => [freshCrop, ...prev]);
    alert(`${freshCrop.name} listed successfully. Customers can shop now in the fresh catalog!`);
  };

  const handleUpdateCrop = (cropId: string, updates: Partial<Crop>) => {
    setCrops((prev) => {
      const updated = prev.map((crop) => 
        crop.id === cropId ? { ...crop, ...updates } : crop
      );
      // Synchronize changes on selected crop details panel if active
      const match = updated.find(c => c.id === cropId);
      if (match && selectedCrop?.id === cropId) {
        setSelectedCrop(match);
      }
      return updated;
    });
  };

  const handleDeleteCrop = (cropId: string) => {
    setCrops((prev) => prev.filter((crop) => crop.id !== cropId));
    if (selectedCrop?.id === cropId) {
      setSelectedCrop(null);
    }
  };

  // Pre-orders modifiers
  const handleAcceptPreOrder = (id: string) => {
    setPreOrders((prev) => prev.map((item) => 
      item.id === id ? { ...item, status: 'ACCEPTED' as const } : item
    ));
    alert('Bids accepted. Harvest delivery locked in escrow records.');
  };

  const handleDeclinePreOrder = (id: string) => {
    setPreOrders((prev) => prev.map((item) => 
      item.id === id ? { ...item, status: 'DECLINED' as const } : item
    ));
    alert('Contract proposal declined.');
  };

  // Quality mitigation synchronizer
  const handleApplyMitigation = (batchId: string) => {
    setQualityBatches((prev) => prev.map((b) => 
      b.id === batchId ? { ...b, mitigationApplied: true } : b
    ));
  };

  const handleUpdateCropPrice = (cropName: string, newPrice: number) => {
    setCrops((prev) => {
      const updated = prev.map((crop) => 
        crop.name === cropName 
          ? { ...crop, pricePerKgCurrent: newPrice, tag: 'HOT DEAL' as const } 
          : crop
      );
      // Synchronize updates on open product details sheet
      const match = updated.find(c => c.name === cropName);
      if (match && selectedCrop?.name === cropName) {
        setSelectedCrop(match);
      }
      return updated;
    });
  };

  const handleSelectCropAndTab = (crop: Crop) => {
    setSelectedCrop(crop);
    setCurrentTab('market');
  };

  return (
    <div className="bg-[#fbf9f8] min-h-screen text-[#1b1c1c] font-sans antialiased">
      {/* Dynamic Header Component */}
      {(currentTab !== 'login' && currentTab !== 'register') && (
        <Header 
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          isNepali={isNepali}
          onToggleLanguage={toggleLanguage}
          cart={cart}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateCartQty={handleUpdateCartQty}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onCheckout={handleCheckout}
          isAuthenticated={isAuthenticated}
          currentUser={currentUser}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
      )}

      {/* Main Container Workspace */}
      <main className="pt-[80px] pb-[92.5px] px-4 md:px-6 max-w-7xl mx-auto w-full">
        {!isAuthenticated ? (
          currentTab === 'register' ? (
            <RegisterPage onLogin={handleLogin} onTabChange={setCurrentTab} />
          ) : (
            <LoginPage onLogin={handleLogin} onTabChange={setCurrentTab} />
          )
        ) : (
          <>
            {/* Market Route Panel */}
            {currentTab === 'market' && (
              selectedCrop ? (
                <ProductDetails 
                  crop={selectedCrop}
                  isNepali={isNepali}
                  onBackToMarket={() => setSelectedCrop(null)}
                  onAddToCart={handleAddToCart}
                />
              ) : (
                <Marketplace 
                  crops={crops}
                  isNepali={isNepali}
                  onSelectCrop={setSelectedCrop}
                  onAddToCart={handleAddToCart}
                  searchQuery={searchQuery}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  onUpdateCropPrice={handleUpdateCropPrice}
                />
              )
            )}

            {/* Dashboard Route Panel */}
            {currentTab === 'dashboard' && (currentUser?.role === 'farmer' || currentUser?.role === 'admin') && (
              <div className="flex flex-col lg:flex-row gap-6">
                
                {/* Embedded sidebar sub-menu (Mobile Only) */}
                <div className="lg:hidden flex flex-wrap gap-2.5 mb-2 font-semibold">
                  <button 
                    onClick={() => setFarmerActiveSubTab('dashboard')}
                    className={`px-4 py-2 rounded-xl text-xs ${
                      farmerActiveSubTab === 'dashboard' ? 'bg-[#154212] text-white shadow-xs' : 'bg-white border text-slate-600'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => setFarmerActiveSubTab('inventory')}
                    className={`px-4 py-2 rounded-xl text-xs ${
                      farmerActiveSubTab === 'inventory' ? 'bg-[#154212] text-white shadow-xs' : 'bg-white border text-slate-600'
                    }`}
                  >
                    Inventory ({crops.filter(c => c.farmer.includes('Ram')).length})
                  </button>
                  <button 
                    onClick={() => setFarmerActiveSubTab('pre-orders')}
                    className={`px-4 py-2 rounded-xl text-xs ${
                      farmerActiveSubTab === 'pre-orders' ? 'bg-[#154212] text-white shadow-xs' : 'bg-white border text-slate-600'
                    }`}
                  >
                    Bids
                  </button>
                  <button 
                    onClick={() => setFarmerActiveSubTab('quality-control')}
                    className={`px-4 py-2 rounded-xl text-xs ${
                      farmerActiveSubTab === 'quality-control' ? 'bg-[#154212] text-white shadow-xs' : 'bg-white border text-slate-600'
                    }`}
                  >
                    Quality Control Check
                  </button>
                  <button 
                    onClick={() => setFarmerActiveSubTab('profits')}
                    className={`px-4 py-2 rounded-xl text-xs ${
                      farmerActiveSubTab === 'profits' ? 'bg-[#154212] text-white shadow-xs' : 'bg-white border text-slate-600'
                    }`}
                  >
                    Profits Ledger
                  </button>
                </div>

                {farmerActiveSubTab === 'quality-control' ? (
                  <div className="lg:ml-64 flex-1">
                    <button 
                      onClick={() => setFarmerActiveSubTab('dashboard')}
                      className="mb-6 flex items-center gap-1.5 text-slate-500 hover:text-[#154212] font-semibold text-xs transition-all"
                    >
                      <span>← Back to Farmer Console Home</span>
                    </button>
                    <QualityControl 
                      batches={qualityBatches}
                      onApplyMitigation={handleApplyMitigation}
                      crops={crops}
                      isNepali={isNepali}
                      onUpdateCropPrice={handleUpdateCropPrice}
                    />
                  </div>
                ) : (
                  <FarmerDashboard 
                    crops={crops}
                    onAddCrop={handleAddNewCrop}
                    onUpdateCrop={handleUpdateCrop}
                    onDeleteCrop={handleDeleteCrop}
                    preOrders={preOrders}
                    onAcceptPreOrder={handleAcceptPreOrder}
                    onDeclinePreOrder={handleDeclinePreOrder}
                    isNepali={isNepali}
                    onNavigateToQC={() => setFarmerActiveSubTab('quality-control')}
                    currentUser={currentUser}
                  />
                )}
              </div>
            )}

            {currentTab === 'dashboard' && currentUser?.role === 'customer' && (
              <CustomerDashboard
                isNepali={isNepali}
                crops={crops}
                onSelectCrop={handleSelectCropAndTab}
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                onUpdateCropPrice={handleUpdateCropPrice}
              />
            )}

            {/* Logistics Route Panel */}
            {currentTab === 'logistics' && (
              <Logistics isNepali={isNepali} />
            )}
          </>
        )}
      </main>

      {/* Mobile Sticky Bottom Navigation Menu is aligned with layout guidelines */}
      {isAuthenticated && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full h-[72px] bg-white border-t border-emerald-800/10 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)] rounded-t-2xl z-40 flex justify-around items-center">
          <button 
            onClick={() => {
              setCurrentTab('market');
              setSelectedCrop(null);
            }}
            className={`flex flex-col items-center justify-center p-2.5 transition-all w-16 ${
              currentTab === 'market' ? 'text-[#154212] font-bold' : 'text-slate-400'
            }`}
          >
            <Store className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-sans">Market</span>
          </button>

          {currentUser?.role === 'farmer' && (
            <button 
              onClick={() => {
                setCurrentTab('dashboard');
                setFarmerActiveSubTab('dashboard');
              }}
              className={`flex flex-col items-center justify-center p-2.5 transition-all w-18 ${
                currentTab === 'dashboard' ? 'text-[#154212] font-bold' : 'text-slate-400'
              }`}
            >
              <ClipboardCheck className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-sans">Dashboard</span>
            </button>
          )}

          {currentUser?.role === 'customer' && (
            <button 
              onClick={() => {
                setCurrentTab('dashboard');
              }}
              className={`flex flex-col items-center justify-center p-2.5 transition-all w-18 ${
                currentTab === 'dashboard' ? 'text-[#154212] font-bold' : 'text-slate-400'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-sans">My Orders</span>
            </button>
          )}

          {currentUser?.role === 'admin' && (
            <button 
              onClick={() => {
                setCurrentTab('dashboard');
              }}
              className={`flex flex-col items-center justify-center p-2.5 transition-all w-18 ${
                currentTab === 'dashboard' ? 'text-[#154212] font-bold' : 'text-slate-400'
              }`}
            >
              <ClipboardCheck className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-sans">Admin</span>
            </button>
          )}

          {currentUser?.role !== 'customer' && (
            <button 
              onClick={() => setCurrentTab('logistics')}
              className={`flex flex-col items-center justify-center p-2.5 transition-all w-16 ${
                currentTab === 'logistics' ? 'text-[#154212] font-bold' : 'text-slate-400'
              }`}
            >
              <Truck className="w-5 h-5" />
              <span className="text-[10px] mt-1 font-sans">Logistics</span>
            </button>
          )}

          <button 
            onClick={handleLogout}
            className="flex flex-col items-center justify-center p-2.5 text-slate-400 w-16 active:text-[#1d5219]"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-1 font-sans">Logout</span>
          </button>
        </nav>
      )}

      {/* Checkout Success Modal Popup */}
      {checkoutSuccess && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-emerald-800/10 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-[#bcf0ae] text-[#154212] rounded-full flex items-center justify-center mx-auto mb-4 scale-110 shadow-lg">
              <CheckCircle className="w-8 h-8 fill-emerald-100" />
            </div>

            <h3 className="text-[#154212] font-extrabold text-lg font-display">भुक्तानी सफल (Payment Successful)</h3>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              Your agricultural purchase order has been queued securely. BP Highway dispatch freezer trucks will collect and deliver within 4 hours.
            </p>

            <button 
              onClick={() => setCheckoutSuccess(false)}
              className="w-full mt-6 py-3 bg-[#154212] hover:bg-[#2d5a27] text-white font-bold text-xs rounded-xl tracking-wider uppercase transition-colors"
            >
              Back to Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}