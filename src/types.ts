export type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export interface User {
  id: string;
  role: "MAKER" | "DREAMER";
  nickName: string;
  email: string;
  phoneNumber: string;
  coconut: number;
}


type TripType = "CULTURE" | "SHOPPING" | "FESTIVAL" | "ACTIVITY" | "FOOD_TOUR";

export type PlanStatus = "CONFIRMED" | "PENDING" | "COMPLETED";

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

interface GroupCount {
  tripType: TripType;
  count: number;
}

export interface MakerPlanResponse {
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

export type EstimateVariables = {
  planId: string;
  quoteData: {
    price: number;
    content: string;
  };
};

export interface UserProfile {
  userId: string;
  id?: string;
  nickName?: string;
  image: string;
  serviceArea: string[];
  averageRating?: number;
  totalReviews?: number;
  totalConfirms?: number;
  tripTypes?: string[];
  serviceTypes?: string[];
  gallery?: string;
  description?: string;
  detailDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MakerProfileResponse {
  nickName: string;
  image: string;
  gallery: string;
  serviceTypes: string[];
  serviceArea: string[];
  description: string;
  detailDescription: string;
  isFollowed: boolean;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}

export interface quoteInfo {
  id: string;
  price: number;
  maker: {
    id: string;
    nickName: string;
    image: string;
  };
}

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

export type DreamerPlan = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  tripDate: string;
  tripType: any;
  serviceArea: ServiceArea;
  details: string;
  address?: string;
  status: string;
  assignees: [];
  dreamer: {
    id: string;
    nickName: string;
  };
  quotes?: quoteInfo[];
};

export interface DreamerPlanResponse {
  totalCount: number;
  list: DreamerPlan[];
}

export type DreamerPlanRequestParams = {
  status?: string[];
  page?: number;
  pageSize?: number;
};

interface MakerInfo {
  nickName: string;
  image: string;
  gallery: string;
  serviceTypes: string[];
  isFollowed: boolean;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}
export interface QuotationDetail {
  id: string;
  createdAt: string;
  updatedAt: string;
  price: number;
  content: string;
  maker: MakerInfo;
  plan?: DreamerPlan;
  isConfirmed: boolean;
  isAssigned: boolean;
}

export interface QuotationResponse {
  totalCount: number;
  list: QuotationDetail[];
}


export interface QuotationParams {
  isSent?: boolean;
  page?: number;
  pageSize?: number;
  planId?: string;
}

export interface QuotationItem extends PlanItem {
  id: string;
  price: number;
  content: string;
  plan: PlanItem;
  maker: User;
  isConfirmed: boolean;
  isAssigned: boolean;
}

