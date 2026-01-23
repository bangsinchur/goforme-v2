import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ServiceArea } from "@/types";

import DEFAULT_1 from "@/assets/img_avatar1.svg";
import DEFAULT_2 from "@/assets/img_avatar2.svg";
import DEFAULT_3 from "@/assets/img_avatar3.svg";
import DEFAULT_4 from "@/assets/img_avatar4.svg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const avatarImages = [
  { key: "DEFAULT_1", src: DEFAULT_1 },
  { key: "DEFAULT_2", src: DEFAULT_2 },
  { key: "DEFAULT_3", src: DEFAULT_3 },
  { key: "DEFAULT_4", src: DEFAULT_4 },
];

export { avatarImages };

export type Service = {
  label: string;
  value: string;
};

export type Location = {
  label: string;
  value: string;
};

export type Data = {
  services: Service[];
  locations: Location[];
};

export const planData: Data = {
  services: [
    { label: "맛집 탐방형", value: "FOOD_TOUR" },
    { label: "기념품/쇼핑형", value: "SHOPPING" },
    { label: "휴양형", value: "RELAXATION" },
    { label: "문화/역사탐방형", value: "CULTURE" },
    { label: "액티비티/탐험형", value: "ACTIVITY" },
    { label: "축제참여형", value: "FESTIVAL" },
  ],
  locations: [
    { label: "서울", value: "SEOUL" },
    { label: "부산", value: "BUSAN" },
    { label: "인천", value: "INCHEON" },
    { label: "대구", value: "DAEGU" },
    { label: "대전", value: "DAEJEON" },
    { label: "광주", value: "GWANGJU" },
    { label: "울산", value: "ULSAN" },
    { label: "세종", value: "SEJONG" },
    { label: "경기", value: "GYEONGGI" },
    { label: "강원", value: "GANGWON" },
    { label: "충북", value: "CHUNGBUK" },
    { label: "충남", value: "CHUNGNAM" },
    { label: "전북", value: "JEONBUK" },
    { label: "전남", value: "JEONNAM" },
    { label: "경북", value: "GYEONGBUK" },
    { label: "경남", value: "GYEONGNAM" },
    { label: "제주", value: "JEJU" },
  ],
};


const ACCESS_TOKEN_KEY = "accessToken";

export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }
};
export const getAccessToken = () => {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(ACCESS_TOKEN_KEY) ?? "";
};

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
