import React, { useState } from 'react';
import { 
  X, Check, PlusCircle, ShieldCheck, DollarSign, Calendar, TrendingUp, Sparkles, AlertCircle, Edit3, Save, CheckCircle
} from 'lucide-react';
import { Crop, PreOrderRequest, User, FarmerSidebarTab } from '../types';

interface FarmerDashboardProps {
  crops: Crop[];
  onAddCrop: (crop: Partial<Crop>) => void;
  onUpdateCrop: (cropId: string, updates: Partial<Crop>) => void;
  onDeleteCrop: (cropId: string) => void;
  preOrders: PreOrderRequest[];
  onAcceptPreOrder: (preOrderId: string) => void;
  onDeclinePreOrder: (preOrderId: string) => void;
  isNepali: boolean;
  onNavigateToQC: () => void;
  currentUser: User | null;
}

export default function FarmerDashboard({
  crops,
  onAddCrop,
  onUpdateCrop,
  onDeleteCrop,
  preOrders,
  onAcceptPreOrder,
  onDeclinePreOrder,
  isNepali,
  onNavigateToQC,
  currentUser
}: FarmerDashboardProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState<FarmerSidebarTab>('inventory');
  
  // Crop listing form modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [cropName, setCropName] = useState('');
  const [cropCategory, setCropCategory] = useState<'Organic' | 'Vegetables' | 'Fruits' | 'Grains'>('Vegetables');
  const [cropPrice, setCropPrice] = useState(100);
  const [cropStock, setCropStock] = useState(500);
  const [cropImg, setCropImg] = useState('');
  const [cropDesc, setCropDesc] = useState('');

  // Inline editing crop state
  const [editingCropId, setEditingCropId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState(0);
  const [editStock, setEditStock] = useState(0);

  // Farmer's own crop listings filter
  const farmerCrops = crops.filter(c => c.farmer === 'Ram Bahadur Gurung' || c.farmer === 'Ram Bahadur');

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName) return;

    // Use a relevant placeholder image if none supplied
    const defaultImg = cropImg || 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=300';

    onAddCrop({
      name: cropName,
      nepaliName: cropName + ' (कृषक)',
      category: cropCategory,
      image: defaultImg,
      farmer: 'Ram Bahadur Gurung',
      farmerLocation: 'Kavre, Nepal',
      farmerRating: 4.9,
      farmerProfileImg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO65YI3apNnyhBtSn9WnrHHq54F13l63vyGHSl5Eh3d0YQUScZanjAAl_fMwjAQ6_6WwK1ukXik7P1EGXqjcG_H80bNAKyzBDC7GXuV271sn537zt4ch9lZRvwwIyETOoSpSAskueNA2rYVoJplt_33SwojFz7esYHTJn9its_gsQcbyTfJ5h7es2b1iSuIsrtQwQdj9tqayyob4ILLEqKz52nkXgBuUW4fO4bvZIu-kHG4ATLrDkwvZcY2FC-H9XfcROPgByREEt0',
      freshnessScore: 98,
      pricePerKgOriginal: cropPrice,
      pricePerKgCurrent: cropPrice,
      unit: 'Kg',
      rating: 5.0,
      tag: 'FRESH HARVEST',
      stockKg: cropStock,
      description: cropDesc || 'Freshly listed high-quality organic farm crop.',
      reviews: [],
      baseFarmPrice: Math.round(cropPrice * 0.85),
      freshnessPremium: Math.round(cropPrice * 0.1),
      demandSurcharge: Math.round(cropPrice * 0.05)
    });

    // Reset Form
    setCropName('');
    setCropImg('');
    setCropStock(500);
    setCropPrice(100);
    setCropDesc('');
    setShowAddModal(false);
  };

  const startInlineEdit = (crop: Crop) => {
    if (currentUser?.role !== 'admin') return; // Only admin can start inline edit
    setEditingCropId(crop.id);
    setEditPrice(crop.pricePerKgCurrent);
    setEditStock(crop.stockKg);
  };

  const saveInlineEdit = (cropId: string) => {
    if (currentUser?.role !== 'admin') return; // Only admin can save inline edit
    onUpdateCrop(cropId, {
      pricePerKgCurrent: editPrice,
      stockKg: editStock
    });
    setEditingCropId(null);
  };

  // Expert suggestion click hook
  const handleApplyExpertTip = () => {
    setCropName('Organic Cauliflower');
    setCropCategory('Organic');
    setCropPrice(150);
    setCropStock(350);
    setCropImg('https://images.unsplash.com/photo-1568584711075-3d021a7c3ec3?auto=format&fit=crop&q=80&w=600');
    setCropDesc('Expected price premium 25% next month. High density, sweet core, certified organic from Kavre greenhouses.');
    setShowAddModal(true);
  };

  return (
    <div className="flex w-full relative min-h-[calc(100vh-140px)]">
      {/* Sidebar Navigation - Desktop Context Only */}
      <aside className="hidden lg:flex flex-col h-[calc(100vh-64px)] fixed left-0 top-[64px] py-6 w-64 bg-white border-r border-[#154212]/10 shadow-sm z-30">
        <div className="px-6 mb-6">
          <h2 className="text-[#154212] font-display text-xl font-bold tracking-tight">नमस्ते किसान</h2>
          <p className="text-slate-400 text-xs mt-1">Manage your harvest & pricing</p>
        </div>

        <nav className="flex-grow space-y-1 px-2 font-sans">


          <button 
            onClick={() => setActiveSidebarTab('inventory')}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide flex items-center gap-3 transition-colors ${
              activeSidebarTab === 'inventory' 
                ? 'bg-[#2d5a27]/10 text-[#154212]' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="bullet-point w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Inventory Management</span>
          </button>

          <button 
            onClick={() => setActiveSidebarTab('pre-orders')}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide flex items-center gap-3 transition-colors ${
              activeSidebarTab === 'pre-orders' 
                ? 'bg-[#2d5a27]/10 text-[#154212]' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="bullet-point w-1.5 h-1.5 rounded-full bg-slate-400"></span>
            <span>Pre-orders Bids ({preOrders.filter(p => p.status === 'PENDING').length})</span>
          </button>

          <button 
            onClick={() => setActiveSidebarTab('profits')}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide flex items-center gap-3 transition-colors ${
              activeSidebarTab === 'profits' 
                ? 'bg-[#2d5a27]/10 text-[#154212]' 
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span className="bullet-point w-1.5 h-1.5 rounded-full bg-[#9c5a00]"></span>
            <span>Profits Ledger</span>
          </button>

          <button 
            onClick={onNavigateToQC}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold tracking-wide flex items-center gap-3 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <span className="bullet-point w-1.5 h-1.5 rounded-full bg-orange-500"></span>
            <span>Quality Control Check</span>
          </button>
        </nav>

        {/* Sidebar Footer listing crop shortcut */}
        {currentUser?.role === 'admin' && (
          <div className="px-4 mt-auto">
            <button 
              onClick={() => setShowAddModal(true)}
              className="w-full py-3.5 bg-[#154212] hover:bg-[#2d5a27] text-white rounded-xl font-bold text-xs shadow-md tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              List New Crop
            </button>
          </div>
        )}
      </aside>

      {/* Main Interactive Work Area */}
      <div className="flex-1 lg:ml-64 px-4 py-6 md:px-8 max-w-7xl">


        {/* Tab 2: Full Inventory Section */}
        {activeSidebarTab === 'inventory' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#154212]">Farm Inventory Listings</h2>
            <p className="text-slate-500 text-sm mt-1">Directly modify price caps and update logs in real-time.</p>

            <div className="bg-white rounded-2xl border shadow-sm divide-y">
              {farmerCrops.map((crop) => (
                <div key={crop.id} className="p-6 flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <img 
                      src={crop.image} 
                      alt={crop.name} 
                      className="w-16 h-16 object-cover rounded-xl bg-slate-100 flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-bold text-[#154212] text-sm md:text-base">
                        {isNepali ? crop.nepaliName : crop.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">Category: {crop.category}</p>
                    </div>
                  </div>

                  {/* Pricing and Stock Edit Form */}
                  <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
                    {editingCropId === crop.id ? (
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold text-slate-400">Price (रू)</label>
                          <input 
                            type="number" 
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold w-20 bg-slate-50"
                            value={editPrice}
                            onChange={(e) => setEditPrice(Number(e.target.value))}
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[10px] font-bold text-slate-400">Stock (Kg)</label>
                          <input 
                            type="number" 
                            className="border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold w-24 bg-slate-50"
                            value={editStock}
                            onChange={(e) => setEditStock(Number(e.target.value))}
                          />
                        </div>
                        <button 
                          onClick={() => saveInlineEdit(crop.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg mt-3 self-center shadow-xs"
                          title="Save changes"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-6 text-slate-700 text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Price</span>
                          <span className="font-extrabold text-[#154212] text-sm">रू {crop.pricePerKgCurrent}/Kg</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Active Stock</span>
                          <span className="font-extrabold text-[#154212] text-sm">{crop.stockKg} {crop.unit}</span>
                        </div>
                        <button 
                          onClick={() => startInlineEdit(crop)}
                          className="text-slate-500 hover:text-[#154212] p-2 hover:bg-slate-100 rounded-full transition-all"
                          title="Edit inline"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    <button 
                      onClick={() => onDeleteCrop(crop.id)}
                      className="py-2.5 px-4 rounded-xl text-xs bg-red-50 hover:bg-red-100 font-bold text-[#ba1a1a] transition-all ml-auto md:ml-0"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Detailed Pre-orders Bids */}
        {activeSidebarTab === 'pre-orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#154212]">Pre-order Agreements</h2>
            <p className="text-slate-500 text-sm mt-1">Accept high quantity crop bids to lock seasonal pricing beforehand.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {preOrders.map((req) => (
                <div key={req.id} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-[#154212] text-lg">
                          {isNepali ? req.cropNepaliName : req.cropName}
                        </h4>
                        <p className="text-emerald-700 text-xs font-semibold mt-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Delivery timeline: {req.deliveryDate}
                        </p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        req.status === 'ACCEPTED' ? 'bg-[#bcf0ae] text-[#002201]' :
                        req.status === 'DECLINED' ? 'bg-red-100 text-[#ba1a1a]' : 'bg-[#ffdf98] text-[#251a00]'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 my-4">
                      <img src={req.buyerAvatar} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" alt="buyer" />
                      <div>
                        <p className="text-slate-700 text-xs font-bold">{req.buyerName}</p>
                        <p className="text-slate-400 text-[10px]">Wholesale Importer Partner</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border mb-4 text-center">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Quantity requested</span>
                        <span className="text-slate-800 font-extrabold font-mono">{req.quantityKg} Kg</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Locked Unit Rate</span>
                        <span className="text-slate-800 font-extrabold font-mono">रू {req.pricePerKg}/Kg</span>
                      </div>
                    </div>
                  </div>

                  {req.status === 'PENDING' && (
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                      <button 
                        onClick={() => onDeclinePreOrder(req.id)}
                        className="py-2.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-xl"
                      >
                        Decline Bid
                      </button>
                      <button 
                        onClick={() => onAcceptPreOrder(req.id)}
                        className="py-2.5 bg-[#154212] hover:bg-[#2d5a27] text-white font-bold text-xs rounded-xl shadow-xs"
                      >
                        Accept & Lock Contract
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Profits statement tracker */}
        {activeSidebarTab === 'profits' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#154212]">Profits & Financial Statement</h2>
            <p className="text-slate-500 text-sm mt-1">Real-time audit reporting for agricultural accounts.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-[#bcf0ae]/30 border border-[#154212]/15 p-6 rounded-2xl">
                <span className="text-slate-500 text-xs font-semibold">Net Income (कुल नाफा)</span>
                <p className="text-2xl font-extrabold text-[#154212] font-mono mt-2">रू ७८,५००</p>
                <span className="text-emerald-700 font-bold text-[10px]">+12.4% vs last month</span>
              </div>
              <div className="bg-white border p-6 rounded-2xl">
                <span className="text-slate-500 text-xs font-semibold">Taxes Paid</span>
                <p className="text-2xl font-extrabold text-slate-800 font-mono mt-2">रू ४,२००</p>
                <span className="text-slate-400 text-[10px]">Auto calculated standard 5%</span>
              </div>
              <div className="bg-white border p-6 rounded-2xl">
                <span className="text-slate-500 text-xs font-semibold">Logistics Costs</span>
                <p className="text-2xl font-extrabold text-slate-800 font-mono mt-2">रू ८,४००</p>
                <span className="text-[#984700] text-[10px]">Within standard 10% target</span>
              </div>
            </div>

            <div className="bg-white shadow-xs border rounded-2xl p-6">
              <h3 className="font-bold text-slate-800 text-sm pb-4 border-b">Recent Ledger Logs</h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-3.5 flex justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Buckwheat Contract Accepted</p>
                    <p className="text-slate-400 text-[10px]">Pokhara Wholesale Co.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600 font-mono">+ रू ४,५०,०००</p>
                    <p className="text-slate-400 text-[10px]">Escrow secured</p>
                  </div>
                </div>
                <div className="py-3.5 flex justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Bulk Saled Organic Potatoes</p>
                    <p className="text-slate-400 text-[10px]">Kathmandu Local Vendor</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600 font-mono">+ रू ३६,०००</p>
                    <p className="text-slate-400 text-[10px]">Completed</p>
                  </div>
                </div>
                <div className="py-3.5 flex justify-between">
                  <div>
                    <p className="font-bold text-slate-800">Dispatch logistics truck charge</p>
                    <p className="text-slate-400 text-[10px]">Kavre to Kathmandu Route</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#ba1a1a] font-mono">- रू ४,५००</p>
                    <p className="text-slate-400 text-[10px]">Paid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* List New Crop Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-slate-100">
            <div className="bg-[#154212] p-6 text-white flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">List New Harvest (नयाँ बाली दर्ता)</h3>
                <p className="text-[#a1d494] text-xs">Fill details for agricultural catalog</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-white hover:bg-white/10 p-1.5 rounded-full transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCrop} className="p-6 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Crop Name (English)</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Organic Cauliflower"
                    className="w-full border border-slate-300 rounded-xl px-4 py-2 text-xs bg-slate-50 focus:ring-2 focus:ring-[#154212]/20 outline-none"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Category</label>
                  <select 
                    className="w-full border border-slate-300 rounded-xl px-4 py-2 text-xs bg-slate-50 focus:ring-2 focus:ring-[#154212]/20 outline-none"
                    value={cropCategory}
                    onChange={(e) => setCropCategory(e.target.value as any)}
                  >
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Organic">Organic</option>
                    <option value="Grains">Grains</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Target Base Price (रू / Kg)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-2 text-xs bg-slate-50 focus:ring-2 focus:ring-[#154212]/20 outline-none"
                    value={cropPrice}
                    onChange={(e) => setCropPrice(Number(e.target.value))}
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-500">Stock Quantity (Kg)</label>
                  <input 
                    type="number" 
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-2 text-xs bg-slate-50 focus:ring-2 focus:ring-[#154212]/20 outline-none"
                    value={cropStock}
                    onChange={(e) => setCropStock(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500">Image URL (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Paste direct Unsplash crop url"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 text-xs bg-slate-50 focus:ring-2 focus:ring-[#154212]/20 outline-none"
                  value={cropImg}
                  onChange={(e) => setCropImg(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500">Bilingual Description</label>
                <textarea 
                  placeholder="Perfectly crisp, harvested early. (आफ्नो उत्पादनको बारेमा लेख्नुहोस)"
                  className="w-full border border-slate-300 rounded-xl px-4 py-2 text-xs bg-slate-50 focus:ring-2 focus:ring-[#154212]/20 outline-none h-20"
                  value={cropDesc}
                  onChange={(e) => setCropDesc(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#154212] hover:bg-[#2d5a27] text-white font-bold text-xs rounded-xl shadow-md tracking-wider uppercase mt-6"
              >
                Submit Listing to Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}