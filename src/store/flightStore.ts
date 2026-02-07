import { create } from 'zustand';
import { experiences } from '../data/experiences';

interface FlightState {
  currentIndex: number;
  previousIndex: number | null;
  isPlaying: boolean;
  isTransitioning: boolean;
  showCard: boolean;
  hasStarted: boolean;

  // Actions
  play: () => void;
  pause: () => void;
  nextLocation: () => void;
  previousLocation: () => void;
  goToLocation: (index: number) => void;
  setTransitioning: (value: boolean) => void;
  setShowCard: (value: boolean) => void;
  startTour: () => void;
}

export const useFlightStore = create<FlightState>((set) => ({
  currentIndex: 0,
  previousIndex: null,
  isPlaying: false,
  isTransitioning: false,
  showCard: false,
  hasStarted: false,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),

  nextLocation: () =>
    set((state) => ({
      currentIndex: (state.currentIndex + 1) % experiences.length,
      showCard: false,
      isPlaying: true,
    })),

  previousLocation: () =>
    set((state) => ({
      currentIndex:
        state.currentIndex === 0
          ? experiences.length - 1
          : state.currentIndex - 1,
      showCard: false,
      isPlaying: true,
    })),

  goToLocation: (index: number) => {
    // Validate index bounds
    if (index < 0 || index >= experiences.length) {
      console.error(
        `Invalid location index: ${index}. Valid range: 0-${experiences.length - 1}`
      );
      return;
    }

    set({
      currentIndex: index,
      showCard: false,
      isPlaying: true,
    });
  },

  setTransitioning: (value: boolean) => set({ isTransitioning: value }),
  setShowCard: (value: boolean) => set({ showCard: value }),
  startTour: () => set({
    hasStarted: true,
    isPlaying: false,
    showCard: true,
    previousIndex: 0
  }),
}));
