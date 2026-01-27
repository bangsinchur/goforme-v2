import { avatarImages } from "@/lib/utils";
import { useEditorModal } from "@/store/editor-modal";
import Image from "next/image";
import EditorModal from "./editor-modal";

//프로필 이미지 선택 모달 컴포넌트
export default function ImageSelectModal() {
  const { close, setSelectedImage } = useEditorModal();

  const handleSelectImage = (image: string) => {
    setSelectedImage(image);
    close();
  };

  return (
    <EditorModal title="프로필 이미지 선택">
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
    </EditorModal>
  );
}
