'use client'

import { useRouter } from "next/navigation";
import { useSession } from "@/store/session";
import { useEffect } from "react";
export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = useSession();
    const router = useRouter()

    useEffect(() => {
        if (session) {
            router.replace("/")
        }
    }, [session, router])

    if (session) return null

    return <>{children}</>;
}