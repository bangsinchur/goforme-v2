"use client";

import ImageSelectModal from "@/components/modal/image-select-modal";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  return (
    <>
      {mount &&
        createPortal(
          <ImageSelectModal />,
          document.getElementById("modal-root")!
        )}
      {children}
    </>
  );
}
