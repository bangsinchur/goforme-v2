import Image from "next/image";
import defaultAvatar from "@/assets/icon_default.svg";
import { QuotationDetail } from "@/types";
import { avatarImages } from "@/lib/utils";
import { Button } from "../ui/button";

export default function EstimateInfoItem({
  id,
  content,
  price,
  maker,
  isConfirmed,
  isAssigned,
}: QuotationDetail) {
  const avatarImage = avatarImages.find((image) => image.key === maker.image);

  return (
    <>
      <div className="flex  gap-4 bg-chart-3 rounded-md w-full p-4 text-background">
        <div className="flex flex-col border rounded-md p-2">
          <div className="flex items-center gap-2 w-[25%]">
            <Image
              className="rounded-full cursor-pointer object-cover"
              src={avatarImage?.src || defaultAvatar}
              alt="메이커 프로필 이미지"
              width={35}
              height={35}
            />
            <div className="font-bold">{maker.nickName}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm">🌟평점 {maker.averageRating}</div>/
            <div className="text-sm">리뷰 {maker.totalReviews}개</div>/
            <div className="text-sm">확정 {maker.totalConfirms}개</div>
          </div>
        </div>
        <div className="flex flex-col flex-1 justify-center gap-3">
          <div className="flex gap-4 items-center">
            <div className="bg-muted text-sm text-foreground text-center min-w-16 rounded-md p-1">
              견적금액
            </div>
            <div className="text-sm font-bold">
              {price.toLocaleString("ko-KR")}원
            </div>
          </div>
          <div className="flex gap-2 items-center">
          <div className="bg-muted text-sm text-foreground text-center min-w-16 rounded-md p-1">
              견적내용
            </div>
            <div className="text-sm font-bold line-clamp-1">{content}</div>
          </div>
        </div>
          <div className="flex flex-col w-[25%] gap-2 items-end">
            <Button variant="outline" className="w-full text-foreground">확정하기</Button>
            <Button  className="w-full bg-chart-5 text-foreground">거절하기</Button>
          </div>
      </div>
    </>
  );
}
