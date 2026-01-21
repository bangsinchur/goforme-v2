import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type State = {
  selectedLocation: string[];
  selectedService: string[];
  gallery?: string;
  description?: string;
  detailDescription?: string;
}


const initialState: State = {
  selectedLocation: [] ,
  selectedService: [] ,
  gallery: "",
  description: "",
  detailDescription: "",

}

const useTripPlanSelectStore = create(
  devtools(
    combine(initialState, (set) => ({
      setSelectedLocation: (Location: string[]) =>
        set({ selectedLocation: Location }),
      setSelectedService: (Service: string[]) =>
        set({ selectedService: Service }),
      setGallery: (Gallery: string) =>
        set({ gallery: Gallery }),
      setDescription: (Description: string) =>
        set({ description: Description }),
      setDetailDescription: (DetailDescription: string) =>
        set({ detailDescription: DetailDescription }),
    })),
    { name: "LocationSelectStore" }
  )
);

export const useSelectedLocation = () => {
  const selectedLocation = useTripPlanSelectStore(
    (state) => state.selectedLocation
  );
  return selectedLocation;
};
export const useSelectedService = () => {
  const selectedService = useTripPlanSelectStore(
    (state) => state.selectedService
  );
  return selectedService;
};

export const useTripPlanSelect = () => {
  const {
    gallery,
    description,
    detailDescription,
    selectedLocation,
    selectedService,
    setSelectedLocation,
    setSelectedService,
    setGallery,
    setDescription,
    setDetailDescription,
  } = useTripPlanSelectStore();
  return {
    gallery,
    description,
    detailDescription,
    selectedLocation,
    selectedService,
    setGallery,
    setDescription,
    setDetailDescription,
    setSelectedLocation,
    setSelectedService,
  };
};
