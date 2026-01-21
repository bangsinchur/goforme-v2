'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSessionActions } from "@/store/session";

export default function MemberOnlyLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { ensureValidToken } = useSessionActions();

    useEffect(() => {
        ensureValidToken(() => {
            router.replace("/login");
        });
    }, [ensureValidToken, router]);

    return <>{children}</>;
}