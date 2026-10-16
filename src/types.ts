export type ProductType = 'offline_account' | 'key' | 'topup' | 'subscription';

export interface SystemRequirements {
  os: string;
  processor: string;
  memory: string;
  graphics: string;
  storage: string;
}

export interface AccountCredential {
  id: string;
  login: string;
  password: string;
  pinOrGuard?: string;
  notes?: string;
  isUsed?: boolean;
}

export interface Product {
  id: string;
  type: ProductType;
  title: string;
  slug: string;
  price: number;
  officialPrice: number;
  platform: 'Steam' | 'Epic Games' | 'EA App' | 'Ubisoft Connect' | 'Battle.net' | 'PlayStation';
  genre: string[];
  shortDescription: string;
  fullDescription: string;
  trailerYoutubeId?: string;
  videoUrl?: string; // Direct MP4/WebM URL or base64 data URL
  videoType?: 'direct' | 'youtube';
  coverImage: string;
  screenshots: string[];
  features: string[];
  systemRequirements: SystemRequirements;
  inStock: number;
  accountsPool: AccountCredential[];
  badge?: string;
  rating: number;
  reviewsCount: number;
  releaseYear: number;
  developer: string;
  publisher: string;
  languages: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  productId: string;
  productTitle: string;
  productType: ProductType;
  price: number;
  buyerEmail: string;
  paymentMethod: 'sbp' | 'card' | 'crypto' | 'tinkoff' | 'sberpay';
  status: 'completed' | 'processing';
  issuedCredentials: {
    login: string;
    password: string;
    pinOrGuard?: string;
    instructions: string;
    platform: string;
  };
}

export interface Review {
  id: string;
  gameTitle: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  verifiedPurchase: boolean;
  avatarSeed?: string;
}
