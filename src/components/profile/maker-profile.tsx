"use client";

import Image from "next/image";
import defaultProfileImage from "@/assets/icon_default_profile.svg";
import { avatarImages } from "@/lib/utils";
import {
  useImageSelectModal,
  useOpenImageSelectModal,
} from "@/store/image-select-modal";
import Location from "../ui/trip-plan";

export default function MakerProfile() {
  const openImageSelectModal = useOpenImageSelectModal();
  const { selectedImage } = useImageSelectModal();
  const selectedAvatar = avatarImages.find((image) => image.key === selectedImage);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl font-bold mt-1">MAKER 프로필 등록</p>
      <div className="flex gap-5 justify-between">
        <div
          className="flex justify-center flex-1 items-center gap-2 cursor-pointer"
          onClick={openImageSelectModal}
        >
          <div>
            <Image
              className="border-3 min-w-20 min-h-20"
              src={selectedAvatar?.src || defaultProfileImage}
              width={100}
              height={100}
              alt="default profile image"
            />
            <span className="text-xs text-muted-foreground">
              (프로필 이미지 선택)
            </span>
          </div>

        </div>
        <div className="flex flex-col gap-2">
          <Location type="MAKER" />
        </div>
      </div>
    </div>
  );
}