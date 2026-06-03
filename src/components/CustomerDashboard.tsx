import React from 'react';
import { Crop } from '../types';
import Marketplace from './Marketplace';

interface CustomerDashboardProps {
  isNepali: boolean;
  crops: Crop[];
  onSelectCrop: (crop: Crop) => void;
}

export default function CustomerDashboard({ isNepali, crops, onSelectCrop }: CustomerDashboardProps) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#154212] mb-6">Welcome, Customer!</h2>
      <p className="text-gray-700 mb-4">Explore the marketplace for fresh produce.</p>
      {/* For now, customers will see the marketplace directly as their dashboard */}
      <Marketplace 
        crops={crops}
        isNepali={isNepali}
        onSelectCrop={onSelectCrop}
        onAddToCart={() => { /* CustomerDashboard doesn't handle add to cart directly */ }}
        searchQuery=""
      />
    </div>
  );
}