import { create } from 'zustand';

export type UserType = 'artisan' | 'ngo' | null;
export type UserRole = 'artisan' | 'ngo';

export interface ArtisanUser {
  id: string;
  name: string;
  email?: string;
  phone: string;
  craft: string;
  location: {
    state: string;
    district: string;
    village?: string;
  };
  photo?: string;
  joinDate: string;
  experience: number;
  monthlyIncome: number;
  qualityScore: number;
  language: string;
}

export interface NGOUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationNumber: string;
  logo?: string;
  location: {
    state: string;
    districts: string[];
  };
  craftsSupported: string[];
  artisansCount: number;
  language: string;
}

interface AuthState {
  user: ArtisanUser | NGOUser | null;
  userType: UserType;
  isAuthenticated: boolean;
  isGuestMode: boolean;
  login: (user: ArtisanUser | NGOUser, type: UserRole) => void;
  logout: () => void;
  setGuestMode: (isGuest: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userType: null,
  isAuthenticated: false,
  isGuestMode: false,
  login: (user, type) => set({ user, userType: type, isAuthenticated: true, isGuestMode: false }),
  logout: () => set({ user: null, userType: null, isAuthenticated: false, isGuestMode: false }),
  setGuestMode: (isGuest) => set({ isGuestMode: isGuest }),
}));

