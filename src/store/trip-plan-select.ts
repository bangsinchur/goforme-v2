import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  selectedLocation: [] as string[],
  selectedService: [] as string[],
};

const useLocationSelectStore = create(
  devtools(
    combine(initialState, (set) => ({
      setSelectedLocation: (Location: string[]) =>
        set({ selectedLocation: Location }),
      setSelectedService: (Service: string[]) =>
        set({ selectedService: Service }),
    })),
    { name: "LocationSelectStore" }
  )
);

export const useSelectedLocation = () => {
  const selectedLocation = useLocationSelectStore(
    (state) => state.selectedLocation
  );
  return selectedLocation;
};
export const useSelectedService = () => {
  const selectedService = useLocationSelectStore(
    (state) => state.selectedService
  );
  return selectedService;
};

export const useSetSelectedLocation = () => {
  const {
    selectedLocation,
    selectedService,
    setSelectedLocation,
    setSelectedService,
  } = useLocationSelectStore();
  return {
    selectedLocation,
    selectedService,
    setSelectedLocation,
    setSelectedService,
  };
};
