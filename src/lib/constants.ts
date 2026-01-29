export const API = process.env.NEXT_PUBLIC_API_URL;

export const QUERY_KEYS = {
  plan: {
    all: ["plan"],
    byId: (postId: string) => ["plan", "byId", postId],
  },
  makerPlan: {
    all: ["makerPlan"],
    list: ["makerPlan", "list"],
    userList: (userId: string) => ["makerPlan", "userList", userId],
  },
  dreamerPlan: {
    all: ["dreamerPlan"],
    list: ["dreamerPlan", "list"],
  },
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    userInfo: () => ["profile", "userInfo"], // 내 기본 정보 (/users/me)
    myProfile: () => ["profile", "myProfile"], // 내 프로필 (/profile)
    byId: (userId: string) => ["profile", "byId", userId], // 특정 사용자의 프로필
    maker: (makerId: string) => ["profile", "maker", makerId], // 메이커 프로필
  },
  quotation: {
    all: ["quotation"],
    list: ["quotation", "list"],
    byId: (planId: string) => ["quotation", "byId", planId],
    detail: (quotationId: string) => ["quotation", "detail", quotationId],
  },
};
