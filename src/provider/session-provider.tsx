'use client';

import { getAccessToken } from "@/lib/utils";
import { useIsSessionLoaded, useSetSession } from "@/store/session";
import { useEffect } from "react";
import GlobalLoader from "@/components/ui/global-loader";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
    const setSession = useSetSession()
    const isSessionLoaded = useIsSessionLoaded()

    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken) {
            setSession({ accessToken })
        } else {
            setSession(null)
        }
    }, [setSession])

    if (!isSessionLoaded) return <GlobalLoader />

    return <>{children}</>;
}