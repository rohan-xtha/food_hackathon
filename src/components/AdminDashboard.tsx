import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Crop, User as UserType, PreOrderRequest, QualityBatch } from '../../types';

interface AdminDashboardProps {
  isNepali: boolean;
  crops: Crop[];
  onUpdateCropPrice: (cropName: string, newPrice: number) => void;
  currentUser?: UserType | null; // Add currentUser to props
  users: UserType[]; // Add users to props
  preOrders: PreOrderRequest[]; // Add preOrders to props
  qualityBatches: QualityBatch[]; // Add qualityBatches to props
}

export default function AdminDashboard({ isNepali, crops, onUpdateCropPrice, currentUser, users, preOrders, qualityBatches }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'userManagement' | 'productManagement'>('overview');

  // Calculate overview statistics
  const totalUsers = users.length;
  const totalFarmers = users.filter(user => user.role === 'farmer').length;
  const totalCustomers = users.filter(user => user.role === 'customer').length;
  const totalCropsListed = crops.length;
  const totalPendingPreOrders = preOrders.filter(order => order.status === 'PENDING').length;
  const totalQualityBatchesNeedingMitigation = qualityBatches.filter(batch => !batch.mitigationApplied).length;

  // Data for User Distribution Pie Chart
  const userDistributionData = [
    { name: 'Admins', value: users.filter(user => user.role === 'admin').length },
    { name: 'Farmers', value: totalFarmers },
    { name: 'Customers', value: totalCustomers },
  ];

  const COLORS = ['#154212', '#4CAF50', '#FFC107']; // Green, Light Green, Amber

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-[#154212] mb-6">Welcome, Admin!</h2>
      
      {/* Admin Dashboard Navigation */}
      <div className="flex gap-4 mb-6 border-b pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'overview' ? 'bg-[#154212] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('userManagement')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'userManagement' ? 'bg-[#154212] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          User Management
        </button>
        <button
          onClick={() => setActiveTab('productManagement')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === 'productManagement' ? 'bg-[#154212] text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          Product Management
        </button>
      </div>

      {/* Content based on activeTab */}
      {activeTab === 'overview' && (
        <div>
          <p className="text-gray-700 mb-4">This is the Admin Dashboard. Here you can manage users, products, and system settings.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {/* Stat Card: Total Users */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Total Users</h4>
              <p className="text-3xl font-bold text-[#154212] mt-2">{totalUsers}</p>
            </div>

            {/* Stat Card: Total Farmers */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Total Farmers</h4>
              <p className="text-3xl font-bold text-[#154212] mt-2">{totalFarmers}</p>
            </div>

            {/* Stat Card: Total Customers */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Total Customers</h4>
              <p className="text-3xl font-bold text-[#154212] mt-2">{totalCustomers}</p>
            </div>

            {/* Stat Card: Crops Listed */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Crops Listed</h4>
              <p className="text-3xl font-bold text-[#154212] mt-2">{totalCropsListed}</p>
            </div>

            {/* Stat Card: Pending Pre-Orders */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Pending Pre-Orders</h4>
              <p className="text-3xl font-bold text-orange-500 mt-2">{totalPendingPreOrders}</p>
            </div>

            {/* Stat Card: Quality Batches Needing Mitigation */}
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Quality Issues</h4>
              <p className="text-3xl font-bold text-red-500 mt-2">{totalQualityBatchesNeedingMitigation}</p>
            </div>
          </div>

          <div className="mt-8 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-[#154212] mb-4">User Distribution by Role</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'userManagement' && (
        <div>
          <h3 className="text-xl font-semibold text-[#154212] mb-4">User Management</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-[#f0fdf4]">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{user.username}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'productManagement' && (
        <div>
          <h3 className="text-xl font-semibold text-[#154212] mb-4">Product Management</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-[#f0fdf4]">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop Name</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Farmer</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {crops.map((crop) => (
                  <tr key={crop.name}>
                    <td className="py-3 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{crop.name}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{crop.category}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{crop.farmer}</td>
                    <td className="py-3 px-4 whitespace-nowrap text-sm text-gray-700">{crop.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}