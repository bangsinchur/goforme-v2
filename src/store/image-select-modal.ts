import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  isOpen: false,
  selectedImage: "",
};

const useImageSelectModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => set({ isOpen: true }),
        close: () => set({ isOpen: false }),
        setSelectedImage: (image: string) => set({ selectedImage: image }),
      },
    })),
    {
      name: "imageSelectModalStore",
    }
  )
);

export const useOpenImageSelectModal = () => {
  const open = useImageSelectModalStore((state) => state.actions.open);
  return open;
};

export const useImageSelectModal = () => {
  const {
    isOpen,
    selectedImage,
    actions: { open, close, setSelectedImage },
  } = useImageSelectModalStore();
  return { isOpen, selectedImage, open, close, setSelectedImage };
};
