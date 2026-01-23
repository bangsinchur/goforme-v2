export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export interface User {
  id: string;
  role: "DREAMER" | "MAKER";
  nickName: string;
  coconut: number;
}

// 여행 타입
type TripType = "CULTURE" | "SHOPPING" | "FESTIVAL" | "ACTIVITY" | "FOOD_TOUR";

// 여행 상태
export type PlanStatus = "CONFIRMED" | "PENDING" | "COMPLETED";

// 서비스 지역
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

// 그룹별 카운트 타입
interface GroupCount {
  tripType: TripType;
  count: number;
}

// 플랜 아이템 타입
export interface PlanItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  tripDate: string;
  tripType: TripType;
  serviceArea: ServiceArea;
  details: string;
  status: PlanStatus;
  assignees: User[];
  dreamer: User;
}

// 전체 응답 타입
export interface PlanResponse {
  totalCount: number;
  groupByCount: GroupCount[];
  list: PlanItem[];
}

export type OrderBy = "RECENT" | "SCHEDULE_FIRST";

export interface RequestParams {
  isAssigned?: boolean;
  tripType?: string[];
  keyword?: string;
  orderBy?: OrderBy;
  page?: number;
  pageSize?: number;
  id?: string;
}