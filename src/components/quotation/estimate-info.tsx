import Image from "next/image";
import defaultAvatar from "@/assets/icon_default.svg";
import { quoteInfo } from "@/types";
import { Button } from "../ui/button";

interface EstimateInfoProps {
  quoteInfo: quoteInfo;
}

export default function EstimateInfo({ quoteInfo }: EstimateInfoProps) {
  const { maker, price } = quoteInfo;

  return (
    <div className="flex flex-col gap-2 bg-chart-3 rounded-md w-70 p-4 text-background">
      <div className="flex flex-col border rounded-md p-2">
        <div className="flex items-center gap-2">
          <Image
            src={defaultAvatar}
            alt="메이커 프로필 이미지"
            width={35}
            height={35}
          />
          <div>{maker.nickName}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm">🌟평가 준비중</div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <div className="bg-muted text-sm text-foreground text-center min-w-16 rounded-md p-1">
            견적금액
          </div>
          <div className="text-sm font-bold">
            {price.toLocaleString("ko-KR")}원
          </div>
        </div>
        <Button variant="secondary" className="w-full mt-2 cursor-pointer">
          견적 상세보기
        </Button>
      </div>
    </div>
  );
}
