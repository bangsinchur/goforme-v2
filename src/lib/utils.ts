import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import DEFAULT_1 from '@/assets/img_avatar1.svg'
import DEFAULT_2 from '@/assets/img_avatar2.svg'
import DEFAULT_3 from '@/assets/img_avatar3.svg'
import DEFAULT_4 from '@/assets/img_avatar4.svg'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ServiceArea =
  | "SEOUL"
  | "BUSAN"
  | "INCHEON"
  | "DAEGU"
  | "DAEJEON"
  | "GWANGJU"
  | "ULSAN"
  | "SEJONG"
  | "GYEONGGI"
  | "GANGWON"
  | "CHUNGBUK"
  | "CHUNGNAM"
  | "JEONBUK"
  | "JEONNAM"
  | "GYEONGBUK"
  | "GYEONGNAM"
  | "JEJU";

export const convertRegionToKorean = (region: ServiceArea): string => {
  const regionMap: Record<ServiceArea, string> = {
    SEOUL: "서울",
    BUSAN: "부산",
    INCHEON: "인천",
    DAEGU: "대구",
    DAEJEON: "대전",
    GWANGJU: "광주",
    ULSAN: "울산",
    SEJONG: "세종",
    GYEONGGI: "경기",
    GANGWON: "강원",
    CHUNGBUK: "충북",
    CHUNGNAM: "충남",
    JEONBUK: "전북",
    JEONNAM: "전남",
    GYEONGBUK: "경북",
    GYEONGNAM: "경남",
    JEJU: "제주",
  };

  return regionMap[region];
};

export type TripType =
  | "SHOPPING"
  | "FOOD_TOUR"
  | "ACTIVITY"
  | "CULTURE"
  | "FESTIVAL"
  | "RELAXATION";

export const formatTripType = (tripType: TripType | undefined): string => {
  if (!tripType) return "";

  const tripTypeMap: Record<TripType, string> = {
    SHOPPING: "기념품/쇼핑형",
    FOOD_TOUR: "맛집 탐방형",
    ACTIVITY: "액티비티/탐험형",
    CULTURE: "문화/역사탐방형",
    FESTIVAL: "축제참여형",
    RELAXATION: "휴양형",
  };

  return tripTypeMap[tripType] || "";
};



const avatarImages = [
  { key: "DEFAULT_1", src: DEFAULT_1 },
  { key: "DEFAULT_2", src: DEFAULT_2 },
  { key: "DEFAULT_3", src: DEFAULT_3 },
  { key: "DEFAULT_4", src: DEFAULT_4 },
];

export default avatarImages;
