import React, { useState } from 'react';
import { Star, ShoppingCart, Calendar, CalendarRange, HelpCircle, Heart, CheckCircle2, Edit, X } from 'lucide-react';
import { Crop, CartItem, User as UserType } from '../types';

interface MarketplaceProps {
  crops: Crop[];
  isNepali: boolean;
  onSelectCrop: (crop: Crop) => void;
  onAddToCart: (crop: Crop, isBulk: boolean) => void;
  searchQuery: string;
  isAuthenticated: boolean;
  currentUser: UserType | null;
  onUpdateCropPrice: (cropId: string, newPrice: number) => void;
}

export default function Marketplace({
  crops,
  isNepali,
  onSelectCrop,
  onAddToCart,
  searchQuery,
  isAuthenticated,
  currentUser,
  onUpdateCropPrice,
}: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Organic' | 'Vegetables' | 'Fruits' | 'Grains'>('All');
  const [deliveryDate, setDeliveryDate] = useState('2026-10-27');
  const [supportOpen, setSupportOpen] = useState(false);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [editingCropId, setEditingCropId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);

  // Filters based on tab + search + category button
  const filteredCrops = crops.filter((crop) => {
    // 1. Search Query Filter
    const matchesSearch = 
      crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crop.nepaliName.includes(searchQuery) ||
      crop.farmer.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category Filter
    const matchesCategory = 
      selectedCategory === 'All' || 
      crop.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleAddToCartClick = (e: React.MouseEvent, crop: Crop) => {
    e.stopPropagation(); // Avoid triggering route details modal
    onAddToCart(crop, crop.tag === 'BULK ONLY');
    
    // Animate add-to-cart button
    setAddedAnimationId(crop.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1200);
  };

  const getTagBgColor = (tag: Crop['tag']) => {
    switch (tag) {
      case 'FRESH HARVEST': return 'bg-emerald-700 text-white';
      case 'HOT DEAL': return 'bg-orange-600 text-white';
      case 'BULK ONLY': return 'bg-[#493600] text-[#ffdf98]';
      case 'BEST SELLER': return 'bg-[#2d5a27] text-[#9dd090]';
      case 'LIMITED': return 'bg-[#984700] text-white';
      default: return 'bg-emerald-600 text-white';
    }
  };

  return (
    <div className="w-full">
      {/* Search Input for Mobile Only */}
      <div className="md:hidden mb-6 mt-4">
        <div className="flex items-center bg-[#f6f3f2] rounded-xl px-4 h-14 border border-emerald-800/10 shadow-inner">
          <input
            type="text"
            placeholder={isNepali ? "बाली, फार्महरू खोज्नुहोस्..." : "Search crops, farms..."}
            className="bg-transparent border-none focus:ring-0 focus:outline-none w-full text-sm font-semibold text-slate-800"
            value={searchQuery}
            readOnly
          />
        </div>
      </div>

      {/* Categories Bento Header Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Daily Fresh Card */}
        <div 
          onClick={() => setSelectedCategory('Vegetables')}
          className="group relative overflow-hidden rounded-2xl h-48 bg-[#2d5a27] text-[#9dd090] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-2xl font-display text-white tracking-tight">Daily Fresh</h2>
              <p className="text-xs font-semibold tracking-wider opacity-90 italic mt-1 font-sans">
                आजको ताजा (Daily Fresh)
              </p>
            </div>
            <span className="self-end bg-white/15 p-2 rounded-xl text-white">
              {isNepali ? 'अहिले किन्नुहोस्' : 'Buy Now'}
            </span>
          </div>
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800')] opacity-25 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          ></div>
        </div>

        {/* Bulk Orders Card */}
        <div 
          onClick={() => setSelectedCategory('Fruits')}
          className="group relative overflow-hidden rounded-2xl h-48 bg-[#fd8f42] text-[#321300] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer font-display"
        >
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-2xl tracking-tight text-[#321300]">Bulk Orders</h2>
              <p className="text-xs font-semibold tracking-wider opacity-90 italic mt-1 font-sans">
                थोक खरिद (Bulk Purchase)
              </p>
            </div>
            <span className="self-end bg-[#321300]/10 p-2 rounded-xl font-sans font-bold text-xs">
              {isNepali ? 'थोक दर' : 'Wholesale Rate'}
            </span>
          </div>
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=800')] opacity-20 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          ></div>
        </div>

        {/* Pre-order Card */}
        <div 
          onClick={() => setSelectedCategory('Organic')}
          className="group relative overflow-hidden rounded-2xl h-48 bg-[#654c00] text-[#ffdf98] p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-2xl font-display text-[#f5bf1f] tracking-tight">Pre-order</h2>
              <p className="text-xs font-semibold tracking-wider opacity-90 italic mt-1 font-sans">
                अग्रिम अर्डर (Next Season)
              </p>
            </div>
            <span className="self-end bg-white/10 p-2 rounded-xl text-white">
              {isNepali ? 'नयाँ सिजन' : 'Form Future contract'}
            </span>
          </div>
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800')] opacity-20 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          ></div>
        </div>
      </section>

      {/* Filters and Date Picker Segment */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Category Filters Chips */}
        <div className="flex flex-wrap gap-2">
          {(['All', 'Organic', 'Vegetables', 'Fruits', 'Grains'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-sans text-xs font-semibold tracking-wide transition-all ${
                (selectedCategory === cat || (cat === 'All' && selectedCategory === 'All'))
                  ? 'bg-[#154212] text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isNepali ? (
                cat === 'All' ? 'सबै बाली' :
                cat === 'Organic' ? 'जैविक (Organic)' :
                cat === 'Vegetables' ? 'तरकारी' :
                cat === 'Fruits' ? 'फलफूल' : 'अन्न (Grains)'
              ) : (
                cat === 'All' ? 'All Crops' : cat
              )}
            </button>
          ))}
        </div>

        {/* Date Picker Component */}
        <div className="flex items-center gap-3 bg-[#eae8e7] p-2.5 rounded-2xl border border-[#154212]/10 transition-all shadow-sm">
          <CalendarRange className="text-[#154212] w-5 h-5 ml-2" />
          <div className="flex flex-col">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#42493e]">
              Recurring Delivery
            </span>
            <input 
              type="date" 
              value={deliveryDate}
              onChange={(e) => {
                setDeliveryDate(e.target.value);
                alert(`Recurring schedule established for ${e.target.value}`);
              }}
              className="bg-transparent border-none p-0 focus:ring-0 text-xs font-semibold text-slate-800 cursor-pointer focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Trending Header Label */}
      <h3 className="text-xl md:text-2xl font-bold font-display text-slate-800 mb-6 flex items-center gap-3">
        Trending Now 
        <span className="text-[#984700] text-xs font-semibold bg-[#ffdbc8] px-2.5 py-1 rounded-md">
          ट्रेन्डिङ (Trending)
        </span>
      </h3>

      {/* Product Card Grid */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white border rounded-2xl py-12 text-center shadow-sm">
          <p className="text-slate-500 font-medium font-sans">No matching farm products found.</p>
          <button 
            onClick={() => setSelectedCategory('All')} 
            className="text-[#154212] text-xs font-bold hover:underline mt-2"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => (
            <div 
              key={crop.id}
              onClick={() => onSelectCrop(crop)}
              className="bg-white rounded-2xl border border-[#154212]/10 shadow-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer group"
            >
              {/* Product Card Image Segment */}
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={crop.image} 
                  alt={crop.name}
                  referrerPolicy="no-referrer"
                />
                {crop.tag && (
                  <span className={`absolute top-3 left-3 text-[9px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-sm ${getTagBgColor(crop.tag)}`}>
                    {crop.tag}
                  </span>
                )}
                <span className="absolute bottom-3 right-3 bg-white/85 text-[10px] text-slate-700 font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                  Stock: {crop.stockKg} {crop.unit}
                </span>
              </div>

              {/* Product Card Text Metadata */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-base text-[#154212] group-hover:text-[#2d5a27] transition-colors leading-tight">
                    {isNepali ? crop.nepaliName : crop.name}
                  </h4>
                  <div className="flex items-center gap-0.5 text-[#493600]">
                    <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    <span className="font-bold text-xs">{crop.rating}</span>
                  </div>
                </div>

                <p className="text-slate-500 text-xs mb-4">
                  Farmer: <span className="font-extrabold text-[#42493e]">{crop.farmer}</span>
                </p>

                {/* Freshness Progress Bar with customizable Nepalese background gradients */}
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] mb-1 font-medium">
                    <span className="text-slate-500">Freshness Meter</span>
                    <span className="font-extrabold text-[#154212]">{crop.freshnessScore}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#f0eded] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${crop.freshnessScore}%`,
                        background: 'linear-gradient(90deg, #ba1a1a 0%, #f5bf1f 50%, #154212 100%)'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Card Button triggers Cart checkout or Contact Info */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-slate-400 text-[9px] font-extrabold uppercase tracking-wider">
                      Price / kg
                    </span>
                    {editingCropId === crop.id ? (
                      <input
                        type="number"
                        value={newPrice}
                        onChange={(e) => setNewPrice(parseFloat(e.target.value))}
                        className="w-20 bg-slate-100 border border-slate-300 rounded-md px-2 py-1 text-sm font-bold text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-[#154212]"
                        onClick={(e) => e.stopPropagation()} // Prevent card click
                      />
                    ) : (
                      <span className="font-bold text-base text-slate-800 font-mono">
                        रू {crop.pricePerKgCurrent}
                      </span>
                    )}
                  </div>

                  {isAuthenticated && currentUser?.role === 'admin' ? (
                    editingCropId === crop.id ? (
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateCropPrice(crop.id, newPrice);
                            setEditingCropId(null);
                            setNewPrice(0);
                          }}
                          className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#154212] hover:bg-[#2d5a27] text-white active:scale-95 transition-all"
                          title="Save Price"
                        >
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCropId(null);
                            setNewPrice(0);
                          }}
                          className="w-11 h-11 rounded-xl flex items-center justify-center bg-slate-300 hover:bg-slate-400 text-slate-800 active:scale-95 transition-all"
                          title="Cancel Edit"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingCropId(crop.id);
                          setNewPrice(crop.pricePerKgCurrent);
                        }}
                        className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all"
                        title="Edit Price"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                    )
                  ) : (
                    <button 
                      onClick={(e) => handleAddToCartClick(e, crop)}
                      className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
                        addedAnimationId === crop.id
                          ? 'bg-emerald-600 text-white scale-105 shadow-md shadow-emerald-200'
                          : 'bg-[#154212] hover:bg-[#2d5a27] text-white active:scale-95'
                      }`}
                      title="Add to basket"
                    >
                      {addedAnimationId === crop.id ? (
                        <CheckCircle2 className="w-5 h-5 animate-bounce" />
                      ) : (
                        <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Support Drawer Widget */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 hidden md:flex flex-col items-end">
        {supportOpen && (
          <div className="bg-white border border-[#154212]/10 shadow-2xl rounded-2xl p-5 mb-3 w-80 text-left border-b-4 border-b-[#984700]">
            <h4 className="font-bold text-sm text-[#154212] flex items-center gap-1.5 pb-2 border-b">
              <HelpCircle className="w-4 h-4 text-[#984700]" />
              FarmMitra Support Center
            </h4>
            <div className="text-xs text-slate-600 space-y-2 mt-3 font-sans">
              <p><b>Q: How do pre-orders work?</b></p>
              <p className="text-slate-500 pl-2">Harvest agreements are established ahead of seasons with secured escrow prices.</p>
              <p><b>Q: What is the freshness meter?</b></p>
              <p className="text-slate-500 pl-2">An audit scorecard logging temperature, moisture, and days elapsed since field picking.</p>
            </div>
            <button 
              onClick={() => alert('Support ticket raised. Live agent will match in 2 minutes.')}
              className="w-full bg-[#984700] hover:bg-[#743500] text-white text-xs font-bold py-2 rounded-lg mt-4 transition-colors"
            >
              Contact Live Support Team
            </button>
          </div>
        )}
        <button 
          onClick={() => setSupportOpen(!supportOpen)}
          className="bg-[#984700] text-white font-sans font-bold px-5 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Support</span>
        </button>
      </div>
    </div>
  );
}