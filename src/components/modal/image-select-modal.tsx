import { avatarImages } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useImageSelectModal } from "@/store/image-select-modal";
import Image from "next/image";

export default function ImageSelectModal() {
  const { isOpen, close, setSelectedImage } = useImageSelectModal();

  const handleCloseModal = () => {
    close();
  };

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="flex flex-col max-h-[90vh] gap-7">
        <DialogTitle className="text-xl">프로필 이미지 선택</DialogTitle>
        <div className="grid grid-cols-4 gap-4 mb-5">
          {avatarImages.map((image) => (
            <Image
              onClick={() => handleSelectImage(image.key)}
              key={image.key}
              src={image.src}
              width={100}
              height={100}
              alt={image.key}
              className="cursor-pointer"
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
