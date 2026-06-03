import React, { useState } from 'react';
import { Crop } from '../types';

interface AdminDashboardProps {
  isNepali: boolean;
  crops: Crop[];
  onUpdateCropPrice: (cropName: string, newPrice: number) => void;
}

export default function AdminDashboard({ isNepali, crops, onUpdateCropPrice }: AdminDashboardProps) {
  const [selectedCropName, setSelectedCropName] = useState('');
  const [newPrice, setNewPrice] = useState<number>(0);

  const handlePriceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCropName && newPrice > 0) {
      onUpdateCropPrice(selectedCropName, newPrice);
      alert(`Price for ${selectedCropName} updated to ${newPrice}`);
      setSelectedCropName('');
      setNewPrice(0);
    } else {
      alert('Please select a crop and enter a valid new price.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#154212] mb-6">Admin Dashboard</h2>
      <p className="text-gray-700 mb-4">Welcome, Administrator! Here you can manage the marketplace.</p>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-emerald-800/10 mb-6">
        <h3 className="text-xl font-semibold text-[#154212] mb-4">Manage Product Prices</h3>
        <form onSubmit={handlePriceUpdate}>
          <div className="mb-4">
            <label htmlFor="cropSelect" className="block text-sm font-medium text-gray-700 mb-1">Select Crop</label>
            <select
              id="cropSelect"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#154212]"
              value={selectedCropName}
              onChange={(e) => setSelectedCropName(e.target.value)}
              required
            >
              <option value="">-- Select a crop --</option>
              {crops.map((crop) => (
                <option key={crop.id} value={crop.name}>
                  {isNepali ? crop.nepaliName : crop.name} (Current: Rs. {crop.pricePerKgCurrent})
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="newPrice" className="block text-sm font-medium text-gray-700 mb-1">New Price per Kg</label>
            <input
              type="number"
              id="newPrice"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#154212]"
              value={newPrice === 0 ? '' : newPrice}
              onChange={(e) => setNewPrice(parseFloat(e.target.value))}
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#154212] hover:bg-[#2d5a27] text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Update Price
          </button>
        </form>
      </div>

      {/* Placeholder for other admin functionalities */}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-emerald-800/10">
        <h3 className="text-xl font-semibold text-[#154212] mb-4">Other Admin Tools</h3>
        <p className="text-gray-600">Future features here: User Management, Content Moderation, Analytics, etc.</p>
      </div>
    </div>
  );
}