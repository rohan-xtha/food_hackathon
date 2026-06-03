import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckSquare, Sparkles, Check, ArrowRight, ClipboardCheck, Info, Leaf, Star, Warehouse, Truck, RefreshCw
} from 'lucide-react';
import { QualityBatch, Crop } from '../types';

interface QualityControlProps {
  batches: QualityBatch[];
  onApplyMitigation: (batchId: string) => void;
  crops: Crop[];
  isNepali: boolean;
  onUpdateCropPrice: (cropName: string, newPrice: number) => void;
}

export default function QualityControl({
  batches,
  onApplyMitigation,
  crops,
  isNepali,
  onUpdateCropPrice,
}: QualityControlProps) {
  const [selectedBatchId, setSelectedBatchId] = useState('BATCH-ORG-442');
  const [gradeSelected, setGradeSelected] = useState<'Grade A' | 'Grade B'>('Grade A');
  const [activeStageModal, setActiveStageModal] = useState<'At Farm' | 'At Warehouse' | 'Before Dispatch' | null>(null);

  // Modal Checklist State for Stage 1 validation
  const [checklistIndex, setChecklistIndex] = useState(0);
  const [checkedAnswers, setCheckedAnswers] = useState<Record<number, boolean>>({});

  const stageChecklists = {
    'At Farm': [
      { q: 'Is the crop moisture content below 12% target limit?', detail: 'Checked using calibrated field moisture probe' },
      { q: 'Is organic field crop certification paperwork valid?', detail: 'Verified with state department audit logs' },
      { q: 'Are packaging crates sanitized & free of pests?', detail: 'Ensures zero contamination during transit loading' }
    ],
    'At Warehouse': [
      { q: 'Is warehouse storage climate strictly 4°C - 7°C?', detail: 'Verified with local telemetry sensors' },
      { q: 'Are ethylene gas concentration levels normal?', detail: 'Prevents premature ripening of adjacent stocks' },
      { q: 'Is rotational inventory matching FIFO active?', detail: 'First-in first-out stock rotation logs verified' }
    ],
    'Before Dispatch': [
      { q: 'Is final consumer packaging sealed & untampered?', detail: 'Verified box integrity checks' },
      { q: 'Are transit transport temperature logs responsive?', detail: 'Checked freezer vehicle calibration' },
      { q: 'Is the dispatch barcode and batch ID scanned?', detail: 'Linked inside agricultural blockchain manifest' }
    ]
  };

  const activeBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Audit report submitted successfully. Batch ${selectedBatchId} logged as ${gradeSelected} under active system records.`);
  };

  const handleMitigateBtn = (batch: QualityBatch) => {
    // 1. apply state update locally
    onApplyMitigation(batch.id);

    // 2. apply price reduction on parent crop in consumer view
    // Batch is e.g. "Organic Vine Tomatoes" -> search in crops with this name
    onUpdateCropPrice(batch.cropName, batch.suggestedPrice);

    alert(`Mitigation Accepted. The public consumer market price of ${batch.cropName} is reduced to Rs. ${batch.suggestedPrice}/kg to fast-track sales and prevent waste.`);
  };

  const handleTriggerInspection = (stage: 'At Farm' | 'At Warehouse' | 'Before Dispatch') => {
    setActiveStageModal(stage);
    setChecklistIndex(0);
    setCheckedAnswers({});
  };

  const handleCheckmark = (idx: number) => {
    setCheckedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleNextCheck = (checklistLength: number) => {
    if (checklistIndex < checklistLength - 1) {
      setChecklistIndex(checklistIndex + 1);
    } else {
      // Completed checklist
      alert(`inspection completed! All standard checklists cleared for stage: ${activeStageModal}`);
      setActiveStageModal(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Dynamic Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display text-[#154212] tracking-tight">
            Quality Control &amp; Waste Management
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Monitor farm-to-dispatch standards, evaluate crop metrics, and optimize stock lifecycle.
          </p>
        </div>

        {/* Prevented Waste counter Widget */}
        <div className="flex items-center gap-2.5 bg-[#eae8e7] border border-[#154212]/15 p-4 rounded-2xl shadow-sm">
          <div className="text-right">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#42493e]">
              Total Waste Prevented
            </p>
            <p className="text-emerald-800 text-lg font-bold font-mono">
              428 kg <span className="text-xs font-semibold text-slate-500">this month</span>
            </p>
          </div>
          <span className="p-2.5 bg-emerald-100 rounded-2xl text-[#154212]">
            <Leaf className="w-6 h-6 animate-pulse" />
          </span>
        </div>
      </header>

      {/* Checklist categories: At Farm, At Warehouse, Before Dispatch columns */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
        {/* Stage 1: At Farm */}
        <div className="bg-white border rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <span className="p-3 bg-emerald-100 text-[#154212] rounded-xl font-bold">
              Stage 1
            </span>
            <span className="bg-[#bcf0ae] text-[#002201] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              At Farm
            </span>
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-2">At Farm Check</h3>
          <p className="text-slate-500 text-xs flex-grow leading-relaxed">
            Initial harvest check verifying moisture content, size classification, soil logs, and organic standards.
          </p>
          <button 
            onClick={() => handleTriggerInspection('At Farm')}
            className="mt-6 w-full py-2.5 bg-[#154212] hover:bg-[#2d5a27] text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Start Inspection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage 2: Warehouse Check */}
        <div className="bg-white border-2 border-[#fd8f42]/40 rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow shadow-xs">
          <div className="flex justify-between items-start mb-6">
            <span className="p-3 bg-[#ffdbc8] text-[#984700] rounded-xl font-bold">
              Stage 2
            </span>
            <span className="bg-[#ffdbc8] text-[#321300] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Warehouse
            </span>
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-2">At Warehouse Check</h3>
          <p className="text-slate-500 text-xs flex-grow leading-relaxed">
            Periodic telemetry inspection evaluating climate variables, ethylene gas accumulation, and shelf aging indicators.
          </p>
          <button 
            onClick={() => handleTriggerInspection('At Warehouse')}
            className="mt-6 w-full py-2.5 bg-[#984700] hover:bg-[#743500] text-white rounded-xl font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Review Stock</span>
            <Warehouse className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stage 3: Dispatch Check */}
        <div className="bg-white border rounded-2xl p-6 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <span className="p-3 bg-amber-100 text-[#493600] rounded-xl font-bold">
              Stage 3
            </span>
            <span className="bg-[#ffdf98] text-[#251a00] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Dispatch Ready
            </span>
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-2">Before Dispatch</h3>
          <p className="text-slate-500 text-xs flex-grow leading-relaxed">
            Final audit vetting box sealing, transit packaging alignment, temperature monitor calibration, and barcode links.
          </p>
          <button 
            onClick={() => handleTriggerInspection('Before Dispatch')}
            className="mt-6 w-full py-2.5 border-2 border-amber-500 text-amber-700 hover:bg-amber-50 rounded-xl font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Final Quality Seal</span>
            <Truck className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Manual Quality Audit form split and AI Suggested pricing reductions */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 font-sans">
        
        {/* Manual Audit form card */}
        <div className="bg-white rounded-3xl p-6 border shadow-xs flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-base">Manual Quality Audit Report</h2>
            <ClipboardCheck className="text-slate-400 w-5 h-5" />
          </div>

          <form onSubmit={handleAuditSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-400 block text-[10px] uppercase">Select Inventory batch</label>
              <select 
                className="w-full border rounded-xl px-4 py-2.5 bg-slate-50 text-xs focus:ring-1 focus:outline-none focus:ring-[#154212]"
                value={selectedBatchId}
                onChange={(e) => setSelectedBatchId(e.target.value)}
              >
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.id} - {batch.cropName}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage tracking logs */}
            <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[9px]">ACTIVE STAGE</span>
                <span className="text-slate-700">{activeBatch.stage}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-slate-400 block text-[9px]">ESTIMATED SHELF-LIFE DIRECTED</span>
                <span className="text-slate-700 font-mono text-[#ba1a1a]">{activeBatch.shelfLifeDays} days left</span>
              </div>
            </div>

            {/* Selection choice buttons for grade */}
            <div className="space-y-1 flex flex-col">
              <label className="font-bold text-slate-400 block text-[10px] uppercase">Assessed Grade</label>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  onClick={() => setGradeSelected('Grade A')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    gradeSelected === 'Grade A' 
                      ? 'border-2 border-[#154212] bg-[#154212]/5 text-[#154212] font-semibold' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-6 h-6" />
                  <span className="text-xs">Grade A (Premium)</span>
                </div>
                <div 
                  onClick={() => setGradeSelected('Grade B')}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-1 cursor-pointer transition-colors ${
                    gradeSelected === 'Grade B' 
                      ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold' 
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Leaf className="w-6 h-6 bg-transparent" />
                  <span className="text-xs">Grade B (Standard)</span>
                </div>
              </div>
            </div>

            {/* Dynamic warning banner */}
            {activeBatch.warning && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                <AlertTriangle className="text-[#ba1a1a] w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-xs text-[#ba1a1a]">Warning: Expiring Soon Audit Logged</p>
                  <p className="text-[11px] text-[#93000a] mt-0.5 leading-normal">{activeBatch.warning}</p>
                </div>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-3.5 bg-[#174414] hover:bg-[#2d5a27] text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Submit Audit Logs
            </button>
          </form>
        </div>

        {/* Waste Mitigation Engine */}
        <div className="bg-white rounded-3xl p-6 border shadow-xs flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-800 text-sm">Waste Mitigation Engine</h2>
            <span className="bg-[#ffdf98] text-[#251a00] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              AI Suggested
            </span>
          </div>

          <div className="space-y-4 flex-grow">
            {batches.slice(0, 2).map((batch) => (
              <div key={batch.id} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img 
                    src={batch.image} 
                    alt={batch.cropName} 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs">{batch.cropName}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Batch {batch.id} • Shelf life: {batch.shelfLifeDays} days left
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 line-through">रू {batch.originalPrice}/kg</span>
                      <p className="text-sm font-bold text-[#9af090] bg-[#2d5a27] px-2 py-0.5 rounded-md mt-1 font-mono">
                        रू {batch.suggestedPrice}/kg
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="text-[10px] text-slate-400 italic">Apply 15% markdown to clear inventory</span>
                    {batch.mitigationApplied ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-3 py-1 rounded-md flex items-center gap-1 shadow-xs">
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button 
                        onClick={() => handleMitigateBtn(batch)}
                        className="py-1 px-3.5 bg-[#984700] hover:bg-[#743500] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Apply</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#bcf0ae]/20 p-5 rounded-2xl border border-[#002201]/10 mt-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#154212] block mb-1">
              Inventory Insight Analyst
            </span>
            <p className="text-xs text-slate-600 leading-normal">
              Reducing price by 15-20% for batches with &lt; 3 days shelf-life increases clearance rates in city centers by 65%. Your local waste scoring rating stands in the <b>Top 5%</b> this month.
            </p>
          </div>
        </div>

      </section>

      {/* Stats - Farmer Integrity Rating */}
      <section className="bg-white rounded-3xl p-6 border shadow-xs flex flex-col md:flex-row items-center gap-8 font-sans">
        <div className="w-20 h-20 bg-[#eae8e7] border border-[#154212]/10 flex items-center justify-center rounded-3xl shadow-inner text-[#154212] flex-shrink-0">
          <Star className="w-10 h-10 fill-[#ffdf98] text-[#984700]" />
        </div>

        <div className="flex-grow space-y-1 text-center md:text-left">
          <h2 className="font-bold text-[#154212] text-lg">Farmer Integrity Rating Scorecard</h2>
          <p className="text-slate-500 text-xs leading-normal">
            Your harvesting grade consistency directly influences placement in search algorithms and triggers eligibility for high-tier premium catalogs.
          </p>
        </div>

        <div className="text-center md:text-right flex-shrink-0">
          <div className="flex text-amber-500 gap-0.5 justify-center md:justify-end">
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
          </div>
          <p className="text-slate-800 text-3xl font-extrabold tracking-tight mt-1">4.8 / 5.0</p>
          <span className="text-emerald-700 text-[10px] font-extrabold block mt-0.5">
            +0.2 premium gain from last week
          </span>
        </div>
      </section>

      {/* Interactive stage validation Dialog Modal */}
      {activeStageModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 relative font-sans text-xs">
            
            <div className="pb-3 border-b border-slate-100 mb-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base text-[#154212]">Stage Audit Inspection</h3>
                <p className="text-slate-400 text-[10px]">Verifying standards for: {activeStageModal}</p>
              </div>
              <button 
                onClick={() => setActiveStageModal(null)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1 rounded-full transition-all"
              >
                <Check className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="space-y-4 py-2">
              <label className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                Step {checklistIndex + 1} of {stageChecklists[activeStageModal].length}
              </label>

              <div className="p-4 bg-slate-50 border rounded-xl">
                <p className="font-bold text-slate-800 text-sm">
                  {stageChecklists[activeStageModal][checklistIndex].q}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  {stageChecklists[activeStageModal][checklistIndex].detail}
                </p>
              </div>

              {/* IOS styled custom checkmark trigger */}
              <div 
                onClick={() => handleCheckmark(checklistIndex)}
                className="p-3.5 rounded-xl border flex items-center justify-between cursor-pointer text-slate-700 font-bold bg-white"
              >
                <span>The parameter meets the required agricultural standard.</span>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                  checkedAnswers[checklistIndex] 
                    ? 'bg-emerald-600 text-white' 
                    : 'border-slate-300'
                }`}>
                  {checkedAnswers[checklistIndex] && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </span>
              </div>
            </div>

            <button 
              disabled={!checkedAnswers[checklistIndex]}
              onClick={() => handleNextCheck(stageChecklists[activeStageModal].length)}
              className="w-full mt-6 py-3.5 bg-[#154212] hover:bg-[#2d5a27] text-white font-bold text-xs rounded-xl tracking-wider uppercase shadow-xs transition-colors disabled:opacity-40"
            >
              {checklistIndex < stageChecklists[activeStageModal].length - 1 ? 'Next audit check' : 'Finalize & sign audit log'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
