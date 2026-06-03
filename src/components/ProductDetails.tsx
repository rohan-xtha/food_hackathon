import React, { useState } from 'react';
import { 
  Star, MapPin, CheckCircle, Info, TrendingUp, Sparkles, Plus, Minus, ArrowLeft, ArrowRight, ShoppingBasket, MessageSquare, Image, Send, X, User
} from 'lucide-react';
import { Crop, Review } from '../types';

interface ProductDetailsProps {
  crop: Crop;
  isNepali: boolean;
  onBackToMarket: () => void;
  onAddToCart: (crop: Crop, isBulk: boolean) => void;
}

export default function ProductDetails({
  crop,
  isNepali,
  onBackToMarket,
  onAddToCart,
}: ProductDetailsProps) {
  const [isBulk, setIsBulk] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{sender: 'user' | 'farmer', text: string}>>([
    { sender: 'farmer', text: `नमस्ते! I am ${crop.farmer}. My crops are picked fresh at 5:00 AM today in Kavre greenhouse grids. How can I help you?` }
  ]);
  const [typedMessage, setTypedMessage] = useState('');

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(crop.reviews);

  const finalPricePerKg = isBulk ? Math.round(crop.pricePerKgCurrent * 0.85) : crop.pricePerKgCurrent;
  const deliveryTime = isBulk ? 'Within 24 hours (Truck freight)' : 'Within 4 hours (Express logistics)';

  const handleToggleBulk = () => {
    setIsBulk(!isBulk);
    if (!isBulk) {
      // Bulk requires more weight
      setQuantity(50);
    } else {
      setQuantity(1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (isBulk && quantity <= 50) return; // bulk threshold
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const userMsg = typedMessage;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setTypedMessage('');

    // Simulate farmer responsive answer
    setTimeout(() => {
      setChatMessages((prev) => [...prev, { 
        sender: 'farmer', 
        text: `DHANYABAD! I will arrange high-moisture packing for your harvest load of ${quantity} Kg. Quality assurance certificates are attached in the logistics transit document.` 
      }]);
    }, 1500);
  };

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewerComment.trim()) return;

    const newReview: Review = {
      id: `rev-gen-${Date.now()}`,
      reviewerName,
      rating: reviewerRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewerComment,
    };

    setReviewsList((prev) => [newReview, ...prev]);
    setReviewerName('');
    setReviewerComment('');
    setReviewerRating(5);
  };

  return (
    <div className="w-full">
      {/* Back Button */}
      <button 
        onClick={onBackToMarket}
        className="mb-6 flex items-center gap-1.5 text-slate-500 hover:text-[#154212] font-semibold text-xs tracking-wide group transition-all"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Return to Marketplace Catalog</span>
      </button>

      {/* Main Details layout columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Visuals & Price breakdowns */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative group overflow-hidden rounded-3xl border border-[#154212]/10 bg-slate-50 shadow-sm">
            <img 
              src={crop.image} 
              alt={crop.name} 
              className="w-full aspect-[4/3] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-101"
              referrerPolicy="no-referrer"
            />
            
            {/* Authenticated passed quality tag */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-[#154212]/20 shadow-sm">
                <CheckCircle className="w-4.5 h-4.5 text-[#154212] fill-[#bcf0ae]" />
                <span className="font-bold text-xs text-[#154212] tracking-wide">Manual Quality Passed</span>
              </div>
            </div>
          </div>

          {/* Farmer interactive card details */}
          <div className="bg-white rounded-2xl p-6 border border-[#154212]/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#154212]/20 shadow-sm flex-shrink-0 bg-[#bcf0ae]/20">
                <img 
                  src={crop.farmerProfileImg} 
                  alt={crop.farmer} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{crop.farmer}</h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-slate-500 text-xs mt-1 font-semibold">
                  <span className="flex items-center gap-0.5 text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                    <span>{crop.farmerRating} ({crop.farmerReviewsCount} reviews)</span>
                  </span>
                  <span className="text-slate-200">•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{crop.farmerLocation}</span>
                  </span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setChatOpen(true)}
              className="px-6 py-2.5 bg-[#984700] hover:bg-[#743500] text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 active:scale-95 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Contact Farmer
            </button>
          </div>

          {/* Expanded Price Ledger Breakdown */}
          <div className="bg-[#f6f3f2] rounded-3xl p-6 border border-[#154212]/10">
            <h3 className="font-bold text-base text-[#154212] mb-4">Pricing Transparency Breakdown</h3>
            <div className="space-y-4 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-semibold">Base Farm Price (per kg)</span>
                <span className="font-bold text-slate-800 font-mono">रू {crop.baseFarmPrice}.00</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  Freshness Premium (Score: {crop.freshnessScore}%)
                  <Info className="w-3.5 h-3.5 text-slate-400" title="Added bonus based on harvesting speed in transit" />
                </span>
                <span className="font-bold text-[#154212] font-mono">+ रू {crop.freshnessPremium}.00</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-semibold flex items-center gap-1.5">
                  Market Demand Surcharge
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                </span>
                <span className="font-bold text-[#984700] font-mono">+ रू {crop.demandSurcharge}.00</span>
              </div>
              <div className="pt-4 border-t border-[#154212]/15 flex justify-between items-center">
                <span className="text-base font-bold text-[#154212]">Final Consumer Price</span>
                <span className="text-3xl font-extrabold text-[#154212] font-mono">
                  Rs. {crop.pricePerKgCurrent}.00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Config and Feedback submit */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Purchase sideboard parameters */}
          <div className="bg-white rounded-3xl p-6 border border-[#154212]/10 shadow-lg sticky top-24">
            <h2 className="text-2xl font-bold font-display text-slate-800 tracking-tight">
              {isNepali ? crop.nepaliName : crop.name}
            </h2>
            <p className="text-slate-500 text-xs mt-3 leading-relaxed">
              {crop.description}
            </p>

            {/* Wholesale bulk toggle controller */}
            <div className="bg-[#654c00]/5 p-4 rounded-xl my-6 flex items-center justify-between border border-[#654c00]/20">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-[#f5bf1f]/10 rounded-xl text-[#654c00]">
                  <Sparkles className="w-5 h-5 fill-[#f5bf1f] text-[#654c00]" />
                </span>
                <div>
                  <p className="font-bold text-xs text-[#654c00] tracking-wide">Bulk Wholesale Option</p>
                  <p className="text-[10px] text-slate-400">Min. req: 50 kg • Save 15% immediately</p>
                </div>
              </div>

              {/* IOS Styled custom Switch checkbox */}
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={isBulk}
                  onChange={handleToggleBulk}
                  className="sr-only peer" 
                />
                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Weights selection inputs */}
            <div className="space-y-1.5 mb-6">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Select Quantity (kg)
              </label>
              <div className="flex items-center border border-slate-300 rounded-xl h-14 bg-slate-50 overflow-hidden shadow-xs">
                <button 
                  onClick={handleDecrement}
                  className="w-14 h-full hover:bg-slate-200 active:bg-slate-300 transition-colors flex items-center justify-center font-bold text-slate-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (isBulk && val < 50) return;
                    if (val < 1) return;
                    setQuantity(val);
                  }}
                  className="w-full text-center border-none bg-transparent focus:ring-0 font-bold text-slate-800 font-mono text-base"
                />
                <button 
                  onClick={handleIncrement}
                  className="w-14 h-full hover:bg-slate-200 active:bg-slate-300 transition-colors flex items-center justify-center font-bold text-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {isBulk && (
                <span className="text-[10px] text-[#984700] font-bold mt-1 block">
                  ⚠️ Minimum bulk volume threshold active (50Kg)
                </span>
              )}
            </div>

            {/* Dynamic ledger calculation visual summary */}
            <div className="pt-2 border-t border-slate-100 mb-6 font-sans">
              <div className="flex justify-between text-xs py-1 text-slate-500">
                <span>Unit Price (प्रति केजी)</span>
                <span className="font-bold text-slate-700">रू {finalPricePerKg}/Kg</span>
              </div>
              <div className="flex justify-between text-xs py-1 text-slate-800 font-bold pt-2 border-t border-dashed mt-2">
                <span>Estimated Subtotal (काउन्टर मूल्य)</span>
                <span className="text-xl font-mono text-[#154212]">रू {Math.round(finalPricePerKg * quantity)}</span>
              </div>
            </div>

            {/* Shopping Bag Trigger button */}
            <button 
              onClick={() => {
                onAddToCart(crop, isBulk);
                alert(`${quantity} Kg of ${crop.name} successfully loaded into your basket.`);
              }}
              className="w-full bg-[#154212] hover:bg-[#2d5a27] text-white h-14 rounded-xl font-bold tracking-wider text-xs uppercase flex items-center justify-center gap-2 active:scale-98 transition-transform shadow-md"
            >
              <ShoppingBasket className="w-4 h-4 stroke-[2.5]" />
              Add to Basket
            </button>
            
            <p className="text-center text-slate-400 text-[10px] mt-3 font-semibold uppercase tracking-wide">
              {deliveryTime}
            </p>
          </div>

          {/* Feedback section - lists user comments */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/55 shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 text-sm">Community Feedback</h3>
              <span className="text-slate-400 text-xs font-bold">{reviewsList.length} reviews</span>
            </div>

            <div className="space-y-6">
              {reviewsList.map((rev) => (
                <div key={rev.id} className="border-b border-slate-100 pb-5 last:border-none">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-xs text-slate-800">{rev.reviewerName}</span>
                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(rev.rating) 
                              ? 'fill-amber-400 stroke-amber-500' 
                              : 'text-slate-200'
                          }`} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-normal">{rev.comment}</p>
                  
                  {rev.image && (
                    <div className="mt-3 overflow-hidden rounded-xl bg-slate-100 max-w-sm border">
                      <img 
                        src={rev.image} 
                        alt="User review attachment" 
                        className="w-full max-h-32 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <span className="text-[10px] text-slate-400 block mt-2">{rev.date}</span>
                </div>
              ))}
            </div>

            {/* New feedback contribution form */}
            <form onSubmit={handlePostReview} className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider">
                Write a Review
              </h4>
              
              <div className="grid grid-cols-2 gap-3 items-center">
                <input 
                  type="text" 
                  placeholder="Your Name (e.g. Ramesh)"
                  required
                  className="w-full border border-slate-300 rounded-xl px-3 py-1.5 text-xs bg-slate-50 focus:ring-1 focus:outline-none"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                />

                <div className="flex items-center gap-1.5 justify-end">
                  <span className="text-[10px] font-bold text-slate-400">Stars:</span>
                  <div className="flex text-amber-500 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((starVal) => (
                      <Star 
                        key={starVal}
                        className={`w-4 h-4 ${starVal <= reviewerRating ? 'fill-amber-400 stroke-amber-500' : 'text-slate-200'}`}
                        onClick={() => setReviewerRating(starVal)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <textarea 
                placeholder="Share your absolute experience with this product..."
                required
                className="w-full border border-slate-300 rounded-xl px-4 py-2 text-xs bg-slate-50 focus:ring-1 focus:outline-none h-16"
                value={reviewerComment}
                onChange={(e) => setReviewerComment(e.target.value)}
              />

              <button 
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs tracking-wider uppercase shadow-xs active:scale-95 transition-all"
              >
                Post Community Feedback
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* Embedded Grower Chat Drawer Dialogue box */}
      {chatOpen && (
        <div className="fixed bottom-0 right-0 z-50 p-4 w-full sm:w-96">
          <div className="bg-white rounded-t-3xl rounded-b-xl shadow-2xl border border-[#154212]/10 overflow-hidden flex flex-col h-96 relative animate-in slide-in-from-bottom-24">
            
            {/* Chat header panel */}
            <div className="bg-[#154212] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={crop.farmerProfileImg} referrerPolicy="no-referrer" alt="Profile" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
                <div>
                  <h4 className="font-bold text-xs">{crop.farmer}</h4>
                  <span className="text-[9px] text-[#9dd090] uppercase font-bold tracking-widest block">Grower Online</span>
                </div>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="text-white hover:bg-white/10 p-1 rounded-full transition-all"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat message loops */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-[#fbf9f8] text-xs">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`max-w-[80%] p-3 rounded-2xl leading-normal ${
                    msg.sender === 'user' 
                      ? 'bg-[#154212] text-white ml-auto rounded-tr-xs' 
                      : 'bg-white border rounded-tl-xs text-slate-800'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Chat submission trigger footer */}
            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t flex gap-2">
              <input 
                type="text" 
                placeholder="Ask Ram about harvest moisture..."
                className="flex-grow border border-slate-200 rounded-xl px-3 py-1.5 text-xs bg-slate-50 focus:outline-none"
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-[#154212] hover:bg-[#2d5a27] text-white p-2.5 rounded-xl transition-all"
              >
                <Send className="w-3.5 h-3.5 fill-white text-emerald-800" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
