import React, { useState } from 'react';
import { Search, Bell, ShoppingCart, Cloud, Check, ChevronDown, Trash2, Globe } from 'lucide-react';
import { ViewTab, CartItem, Crop, User } from '../types';

interface HeaderProps {
  currentTab: ViewTab;
  onTabChange: (tab: ViewTab) => void;
  isNepali: boolean;
  onToggleLanguage: () => void;
  cart: CartItem[];
  onRemoveFromCart: (cropId: string) => void;
  onUpdateCartQty: (cropId: string, qty: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onCheckout: () => void;
  isAuthenticated: boolean;
  currentUser: User | null;

  onLogout: () => void;
  onLogin: (user: User) => void;
}

export default function Header({
  currentTab,
  onTabChange,
  isNepali,
  onToggleLanguage,
  cart,
  onRemoveFromCart,
  onUpdateCartQty,
  searchQuery,
  onSearchChange,
  onCheckout,
  isAuthenticated,
  currentUser,
  onLogout,
  onLogin,
}: HeaderProps) {
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cart.reduce((acc, item) => {
    const price = item.crop.pricePerKgCurrent;
    const finalPrice = item.isBulk ? price * 0.85 : price; // 15% discount for bulk
    return acc + finalPrice * item.quantity;
  }, 0);

  const notifications = [
    { id: 1, title: 'New Pre-order Request', desc: 'Kathmandu Fresh Mart requested Ginger', time: '2 mins ago' },
    { id: 2, title: 'High Demand Warning', desc: 'Cauliflower demand expected to increase 25%', time: '1 hour ago' },
    { id: 3, title: 'Quality Report Cleared', desc: 'Batch #442 passed Level 2 check', time: '4 hours ago' }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-[64px] bg-white border-b border-emerald-800/10 shadow-sm z-50 flex justify-between items-center px-6">
        {/* Left Side: Brand and Global Search */}
        <div className="flex items-center gap-4">
          <span
            onClick={() => currentTab !== 'market' && onTabChange('market')}
            className="text-2xl font-bold font-display text-[#154212] select-none cursor-pointer tracking-tight"
            id="brand-logo"
          >
            FarmMitra
          </span>
          
          {(currentTab !== 'login' && currentTab !== 'register') && (
            <div className="hidden md:flex items-center bg-[#f6f3f2] rounded-full px-4 py-1.5 border border-slate-200/50 w-80 lg:w-96">
              <Search className="text-slate-500 w-4 h-4 mr-2" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={isNepali ? "ताजा बाली खोज्नुहोस्..." : "Search fresh crops..."} 
                className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-sm font-medium"
                id="global-search-input"
              />
            </div>
          )}
        </div>

        {/* Center Navigation Tabs (Desktop only) */}
        {(currentTab !== 'login' && currentTab !== 'register') && (
          <div className="hidden md:flex items-center gap-8 font-sans">
            {currentTab !== 'logistics' && !(currentTab === 'dashboard' && currentUser?.role === 'farmer') && (
              <button
                onClick={() => onTabChange('market')}
                className={`py-5 text-sm font-semibold tracking-wide border-b-2 transition-all ${
                  currentTab === 'market'
                    ? 'text-[#154212] border-[#154212]'
                    : 'text-slate-500 border-transparent hover:text-[#154212]'
                }`}
                id="nav-tab-market"
              >
                {isNepali ? 'बजार (Market)' : 'Market'}
              </button>
            )}
            
            {isAuthenticated && (currentUser?.role === 'farmer' || currentUser?.role === 'admin') && (
              <button 
                onClick={() => {
                  onTabChange('dashboard');
                }}
                className={`py-5 text-sm font-semibold tracking-wide border-b-2 transition-all ${
                  currentTab === 'dashboard' 
                    ? 'text-[#154212] border-[#154212]' 
                    : 'text-slate-500 border-transparent hover:text-[#154212]'
                }`}
                id="nav-tab-dashboard"
              >
                {isNepali ? 'ड्यासबोर्ड' : 'Dashboard'}
              </button>
            )}
            
            {isAuthenticated && currentUser?.role !== 'customer' && (
              <button 
                onClick={() => onTabChange('logistics')}
                className={`py-5 text-sm font-semibold tracking-wide border-b-2 transition-all ${
                  currentTab === 'logistics' 
                    ? 'text-[#154212] border-[#154212]' 
                    : 'text-slate-500 border-transparent hover:text-[#154212]'
                }`}
                id="nav-tab-logistics"
              >
                {isNepali ? 'ढुवानी (Logistics)' : 'Logistics'}
              </button>
            )}
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Cloud Sync Status */}
          {currentTab === 'dashboard' && (
            <div className="hidden sm:flex items-center gap-1.5 bg-[#2d5a27]/10 px-3 py-1 rounded-full border border-[#154212]/20">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="text-[11px] font-semibold text-[#154212] tracking-wider uppercase">Synced</span>
            </div>
          )}

          {/* Bilingual Toggle Button */}
          {(currentTab !== 'login' && currentTab !== 'register') && (
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#154212] text-[#154212] text-xs font-semibold hover:bg-emerald-50 active:scale-95 transition-all"
              id="lang-toggle-button"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isNepali ? 'English' : 'नेपाली'}</span>
            </button>
          )}

          {/* Notifications Utility */}
          {(currentTab !== 'login' && currentTab !== 'register') && (
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotificationDropdown(!showNotificationDropdown);
                  setShowCartDropdown(false);
                  setShowProfileMenu(false);
                }}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all relative"
                id="notifications-button"
              >
                <Bell className="w-5 h-5 text-slate-700" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
              </button>

              {showNotificationDropdown && (
                <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 shadow-xl rounded-xl p-4 z-50">
                  <div className="pb-2 border-b border-slate-100 flex justify-between items-center">
                    <h4 className="font-semibold text-sm text-slate-800">
                      {isNepali ? 'सूचना सङ्ग्रह' : 'Notifications'}
                    </h4>
                    <span className="text-xs text-slate-400">3 new</span>
                  </div>
                  <div className="divide-y divide-slate-100 mt-2">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="py-2.5 hover:bg-slate-50 px-1 rounded-md transition-all">
                        <p className="font-medium text-xs text-slate-800">{notif.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{notif.desc}</p>
                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shopping Cart Drawer Trigger */}
          {(currentTab !== 'login' && currentTab !== 'register') && (
            <div className="relative">
              <button 
                onClick={() => {
                  setShowCartDropdown(!showCartDropdown);
                  setShowNotificationDropdown(false);
                  setShowProfileMenu(false);
                }}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-all relative"
                id="cart-toggle-button"
              >
                <ShoppingCart className="w-5 h-5 text-slate-700" />
                {cartTotalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#984700] text-white font-bold text-[9px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartTotalItems}
                  </span>
                )}
              </button>

              {/* Shopping Cart Sidebar Dropdown panel */}
              {showCartDropdown && (
                <div className="absolute right-0 mt-3 w-96 bg-white border border-[#154212]/10 shadow-2xl rounded-2xl p-4 z-50 border-t-4 border-t-[#154212]">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <h4 className="font-bold text-base text-slate-800 flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-[#154212]" />
                      {isNepali ? 'तपाईंको टोकरी' : 'Your Shopping Cart'}
                    </h4>
                    <span className="font-bold text-xs bg-[#bcf0ae] text-[#002201] py-1 px-2.5 rounded-full">
                      {cartTotalItems} {isNepali ? 'वस्तुहरू' : 'items'}
                    </span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-12 text-center">
                      <ShoppingCart className="w-12 h-12 mx-auto text-slate-300 stroke-[1.5]" />
                      <p className="text-sm font-medium text-slate-500 mt-3">
                        {isNepali ? 'टोकरी खाली छ।' : 'Your cart is fully empty.'}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {isNepali ? 'थप्नको लागि उत्पादनमा थिच्नुहोस्।' : 'Add fresh organic vegetables to start.'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 my-2 pr-1">
                        {cart.map((item) => {
                          const originalPrice = item.crop.pricePerKgCurrent;
                          const factor = item.isBulk ? 0.85 : 1;
                          const itemPrice = Math.round(originalPrice * factor);

                          return (
                            <div key={item.crop.id} className="py-3 flex gap-3">
                              <img 
                                src={item.crop.image} 
                                alt={item.crop.name} 
                                className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-grow">
                                <div className="flex justify-between">
                                  <h5 className="font-bold text-xs text-slate-800 line-clamp-1">
                                    {isNepali ? item.crop.nepaliName : item.crop.name}
                                  </h5>
                                  <button 
                                    onClick={() => onRemoveFromCart(item.crop.id)}
                                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-full transition-all"
                                    title="Remove item"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <p className="text-[10px] text-[#984700] hover:underline font-semibold uppercase tracking-wide">
                                  Farmer: {item.crop.farmer}
                                </p>
                                {item.isBulk && (
                                  <span className="inline-block bg-[#ffdf98] text-[#251a00] text-[9px] font-bold px-1.5 py-0.5 rounded-md mt-1">
                                    Bulk Wholesale (15% OFF)
                                  </span>
                                )}
                                <div className="flex justify-between items-center mt-2">
                                  <div className="flex items-center border border-slate-300 rounded-md bg-slate-50 overflow-hidden">
                                    <button 
                                      className="px-2 py-0.5 hover:bg-slate-200 text-xs font-bold"
                                      onClick={() => onUpdateCartQty(item.crop.id, item.quantity - 1)}
                                    >
                                      -
                                    </button>
                                    <span className="px-2 text-xs font-bold font-mono min-w-6 text-center">
                                      {item.quantity}
                                    </span>
                                    <button 
                                      className="px-2 py-0.5 hover:bg-slate-200 text-xs font-bold"
                                      onClick={() => onUpdateCartQty(item.crop.id, item.quantity + 1)}
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span className="font-mono text-sm font-bold text-slate-800">
                                    रू {itemPrice * item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-3 border-t border-slate-100">
                        <div className="flex justify-between text-slate-700 text-xs py-1">
                          <span>Cart Subtotal</span>
                          <span className="font-bold font-mono">रू {cartTotalPrice}</span>
                        </div>
                        <div className="flex justify-between text-slate-700 text-xs py-1">
                          <span>Tax & Marketplace Fee</span>
                          <span className="text-slate-400">Inc.</span>
                        </div>
                        <div className="flex justify-between text-slate-800 text-sm font-bold py-2 border-t border-slate-100 mt-2">
                          <span>Total Price (कुल रकम)</span>
                          <span className="text-[#154212] font-mono text-base">रू {cartTotalPrice}</span>
                        </div>

                        <button 
                          onClick={() => {
                            setShowCartDropdown(false);
                            onCheckout();
                          }}
                          className="w-full bg-[#154212] hover:bg-[#2d5a27] text-white py-3 rounded-xl font-semibold text-xs tracking-wider uppercase mt-4 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                          {isNepali ? 'अर्डर पुरा गर्नुहोस् (Place Order)' : 'Pay & Fast Checkout'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* User Profile / Quick Identity Switching */}
          {isAuthenticated ? (
            <div className="relative">
              <div 
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowCartDropdown(false);
                  setShowNotificationDropdown(false);
                }}
                className="h-10 w-10 rounded-full border-2 border-[#154212]/20 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#154212] transition-colors"
                id="profile-avatar-container"
              >
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO65YI3apNnyhBtSn9WnrHHq54F13l63vyGHSl5Eh3d0YQUScZanjAAl_fMwjAQ6_6WwK1ukXik7P1EGXqjcG_H80bNAKyzBDC7GXuV271sn537zt4ch9lZRvwwIyETOoSpSAskueNA2rYVoHplt_33SwojFz7esYHTJn9its_gsQcbyTfJ5h7es2b1iSuIsrtQwQdj9tqayyob4ILLEqKz52nkXgBuUW4fO4bvZIu-kHG4ATLrDkwvZcY2FC-H9XfcROPgByREEt0" 
                  alt="User Profile Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {showProfileMenu && currentUser && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 z-50">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#bcf0ae] overflow-hidden flex-shrink-0">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO65YI3apNnyhBtSn9WnrHHq54F13l63vyGHSl5Eh3d0YQUScZanjAAl_fMwjAQ6_6WwK1ukXik7P1EGXqjcG_H80bNAKyzBDC7GXuV271sn537zt4ch9lZRvwwIyETOoSpSAskueNA2rYVoHplt_33SwojFz7esYHTJn9its_gsQcbyTfJ5h7es2b1iSuIsrtQwQdj9tqayyob4ILLEqKz52nkXgBuUW4fO4bvZIu-kHG4ATLrDkwvZcY2FC-H9XfcROPgByREEt0" 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-slate-800">{currentUser.username}</h5>
                      <p className="text-[10px] text-slate-500">{currentUser.email}</p>
                      <p className="text-[10px] font-bold text-[#154212] uppercase mt-0.5">{currentUser.role}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-2 text-center mt-2">
                    <button 
                      onClick={() => {
                        onLogout();
                        setShowProfileMenu(false);
                      }}
                      className="text-red-600 text-xs font-bold hover:bg-red-50 w-full py-1.5 rounded-lg transition-colors"
                    >
                      {isNepali ? 'बाहिर निस्कनुहोस्' : 'Log Out'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            (currentTab !== 'login' && currentTab !== 'register') && (
              <button
                onClick={() => onTabChange('login')}
                className="px-4 py-2 bg-[#154212] text-white text-sm font-semibold rounded-full hover:bg-[#2d5a27] transition-colors"
              >
                {isNepali ? 'लग - इन' : 'Login'}
              </button>
            )
          )}
        </div>
      </header>
    </>
  );
}