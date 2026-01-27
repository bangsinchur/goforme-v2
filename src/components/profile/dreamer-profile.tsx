"use client";

import Image from "next/image";
import defaultProfileImage from "@/assets/icon_default_profile.svg";
import { avatarImages } from "@/lib/utils";
import {
  useEditorModal,
  useOpenEditorModal,
} from "@/store/editor-modal";
import Location from "../ui/trip-plan";

export default function DreamerProfile() {
  const openImageSelectModal = useOpenEditorModal();
  const { selectedImage } = useEditorModal();
  const selectedAvatar = avatarImages.find((image) => image.key === selectedImage);
  
  const handleOpenModal = () => {
    openImageSelectModal('IMAGE_SELECT');
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl font-bold mt-1">DREAMER 프로필 등록</p>
      <div className="flex gap-5 justify-between">
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={handleOpenModal}
        >
          <Image
            className="border-3"
            src={selectedAvatar?.src || defaultProfileImage}
            width={100}
            height={100}
            alt="default profile image"
          />
          <span className="text-xs text-muted-foreground">
            (프로필 이미지 선택)
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Location type="DREAMER" />
        </div>
      </div>
    </div>
  );
}
