import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

// 모달 타입 정의
export type ModalType = 'IMAGE_SELECT' | 'ESTIMATE' | null;

type State = {
  isOpen: boolean;
  modalType: ModalType;
  selectedImage?: string;
  planId?: string; 
}

const initialState:State = {
  isOpen: false,
  modalType: null,
};

const useEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (type: ModalType, planId?: string) => set({ isOpen: true, modalType: type, planId }),
        close: () => set({ isOpen: false, modalType: null, planId: undefined }),
        setSelectedImage: (image: string) => set({ selectedImage: image }),
        reset: () => set({ selectedImage: undefined }),
      },
    })),
    {
      name: "editorModalStore",
    }
  )
);

export const useOpenEditorModal = () => {
  const open = useEditorModalStore((state) => state.actions.open);
  return open;
};

export const useEditorModal = () => {
  const {
    isOpen,
    modalType,
    selectedImage,
    planId,
    actions: { open, close, setSelectedImage, reset },
  } = useEditorModalStore();
  return { isOpen, modalType, selectedImage, planId, open, close, setSelectedImage, reset };
};
