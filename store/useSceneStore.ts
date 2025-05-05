import { create } from "zustand";

interface SceneState {
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
}

const useSceneStore = create<SceneState>((set) => ({
  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));

export default useSceneStore;
