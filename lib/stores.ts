import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'theme-storage' }
  )
);

interface CompareStore {
  selectedProviders: string[];
  addProvider: (slug: string) => void;
  removeProvider: (slug: string) => void;
  clearProviders: () => void;
}

export const useCompareStore = create<CompareStore>((set) => ({
  selectedProviders: [],
  addProvider: (slug) =>
    set((state) => ({
      selectedProviders: state.selectedProviders.includes(slug)
        ? state.selectedProviders
        : [...state.selectedProviders, slug].slice(0, 4),
    })),
  removeProvider: (slug) =>
    set((state) => ({
      selectedProviders: state.selectedProviders.filter((s) => s !== slug),
    })),
  clearProviders: () => set({ selectedProviders: [] }),
}));

interface CalculatorStore {
  inputTokens: number;
  outputTokens: number;
  setInputTokens: (value: number) => void;
  setOutputTokens: (value: number) => void;
}

export const useCalculatorStore = create<CalculatorStore>((set) => ({
  inputTokens: 1000000,
  outputTokens: 1000000,
  setInputTokens: (value) => set({ inputTokens: value }),
  setOutputTokens: (value) => set({ outputTokens: value }),
}));
