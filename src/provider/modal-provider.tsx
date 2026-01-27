"use client";

import ImageSelectModal from "@/components/modal/image-select-modal";
import EstimateModal from "@/components/modal/estimate-modal";
import { useEditorModal } from "@/store/editor-modal";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [mount, setMount] = useState(false);
  const { modalType } = useEditorModal();

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return <>{children}</>;

  // modalType에 따라 렌더링할 모달 결정
  const renderModal = () => {
    if (modalType === 'IMAGE_SELECT') return <ImageSelectModal />;
    if (modalType === 'ESTIMATE') return <EstimateModal />;
    return null;
  };

  return (
    <>
      {mount && modalType && 
        createPortal(
          renderModal(),
          document.getElementById("modal-root")!
        )}
      {children}
    </>
  );
}
