"use client";

import { decodeJwtPayload, isTokenExpired } from "@/lib/token-exp";
import { refreshToken } from "@/api/auth";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type Session = {
  accessToken: string;
  refreshToken?: string;
  user?: {
    userId: string;
    role?: string; // 토큰에서 가져온 역할 (DREAMER, MAKER 등)
  };
};

type State = {
  isLoaded: boolean;
  session: Session | null;
};

const initalState = {
  isLoaded: false,
  session: null,
} as State;

const useSessionStore = create(
  devtools(
    combine(initalState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          if (session?.accessToken) {
            const decoded = decodeJwtPayload(session.accessToken);
            if (decoded) {
              // 토큰에서 userId와 role만 추출 (실제 토큰에 있는 정보만)
              const user = {
                userId: decoded.userId || decoded.sub || decoded.id,
                role: decoded.role,
              };
              set({ session: { ...session, user }, isLoaded: true });
              return;
            }
          }

          set({ session, isLoaded: true });
        },
        async ensureValidToken(onInvalid?: () => void) {
          const token = localStorage.getItem("accessToken");
          if (!token) {
            onInvalid?.();
            return;
          }

          if (isTokenExpired(token)) {
            try {
              const payload = await refreshToken();
              if (payload?.accessToken) {
                // 갱신된 토큰도 userId와 role만 저장
                const decoded = decodeJwtPayload(payload.accessToken);
                const user = decoded
                  ? {
                      userId: decoded.userId || decoded.sub || decoded.id,
                      role: decoded.role,
                    }
                  : undefined;

                set({
                  session: { accessToken: payload.accessToken, user },
                  isLoaded: true,
                });
                localStorage.setItem("accessToken", payload.accessToken);
                return;
              }
            } catch {
              onInvalid?.();
              return;
            }
          }

          const decoded = decodeJwtPayload(token);
          if (!decoded) {
            onInvalid?.();
          }
        },
      },
    })),
    { name: "sessionStore" }
  )
);

export const useSession = () => {
  const session = useSessionStore((state) => state.session);
  return session;
};

export const useSetSession = () => {
  const setSession = useSessionStore((state) => state.actions.setSession);
  return setSession;
};

export const useIsSessionLoaded = () => {
  const isLoaded = useSessionStore((state) => state.isLoaded);
  return isLoaded;
};

export const useSessionActions = () => {
  const {
    session,
    actions: { setSession, ensureValidToken },
  } = useSessionStore();
  return { session, setSession, ensureValidToken };
};

// 사용자 정보(userId, role)에 쉽게 접근하기 위한 훅
export const useUser = () => {
  const session = useSessionStore((state) => state.session);
  const user = session?.user;
  return {user, userId: user?.userId, role: user?.role};
};
