"use client";

import { decodeJwtPayload, isTokenExpired } from "@/lib/token-exp";
import { refreshToken } from "@/api/auth";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type Session = {
  accessToken: string;
  refreshToken?: string;
  
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
        setSession: (session: Session | null) => set({ session, isLoaded: true }),
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
                set({ session: { accessToken: payload.accessToken }, isLoaded: true });
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
    { name: "sessionStore" },
  ),
);

export const useSession = () => {
  const session = useSessionStore((state) => state.session);
  return session;
};

export const useSetSession = () => {
  const setSession = useSessionStore((state) => state.actions.setSession);
  return setSession;
};

export const useIsSessionLoaded = () =>{
  const isLoaded = useSessionStore((state) => state.isLoaded);
  return isLoaded;
}

export const useSessionActions = () => {
const {session,actions:{setSession,ensureValidToken}} = useSessionStore();
return {session,setSession,ensureValidToken};
}