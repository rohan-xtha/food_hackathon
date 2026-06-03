export interface Crop {
  id: string;
  name: string;
  nepaliName: string;
  category: 'Organic' | 'Vegetables' | 'Fruits' | 'Grains';
  image: string;
  farmer: string;
  farmerLocation: string;
  farmerRating: number;
  farmerReviewsCount: number;
  farmerProfileImg: string;
  freshnessScore: number;
  pricePerKgOriginal: number;
  pricePerKgCurrent: number;
  unit: string;
  rating: number;
  tag: 'FRESH HARVEST' | 'HOT DEAL' | 'BULK ONLY' | 'BEST SELLER' | 'LIMITED' | null;
  stockKg: number;
  description: string;
  reviews: Review[];
  baseFarmPrice: number;
  freshnessPremium: number;
  demandSurcharge: number;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
}

export interface PreOrderRequest {
  id: string;
  cropName: string;
  cropNepaliName: string;
  deliveryDate: string;
  quantityKg: number;
  pricePerKg: number;
  buyerName: string;
  buyerAvatar: string;
  status: 'PENDING' | 'ACCEPTED' | 'DECLINED';
}

export interface QualityBatch {
  id: string;
  cropName: string;
  nepaliName: string;
  grade: 'Grade A' | 'Grade B' | null;
  stage: 'At Farm' | 'At Warehouse' | 'Before Dispatch';
  shelfLifeDays: number;
  warning?: string;
  originalPrice: number;
  suggestedPrice: number;
  mitigationApplied: boolean;
  image: string;
}

export interface CartItem {
  crop: Crop;
  quantity: number;
  isBulk: boolean;
}

export type UserRole = 'customer' | 'farmer' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

export type ViewTab = 'market' | 'dashboard' | 'logistics' | 'login' | 'register';
export type FarmerSidebarTab = 'dashboard' | 'inventory' | 'pre-orders' | 'profits' | 'quality-control';
export type AdminSidebarTab = 'dashboard' | 'users' | 'products' | 'settings';