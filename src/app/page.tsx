"use client";

import { useSession } from "@/store/session";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalLoader from "@/components/ui/global-loader";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // 로그인 안 됨 → 로그인 페이지
    if (!session) {
      router.replace("/login");
      return;
    }

    // 로그인 됨 → role에 따라 리다이렉트
    const role = session.user?.role;

    if (role === "DREAMER") {
      router.replace("/dreamer-plan");
    } else if (role === "MAKER") {
      router.replace("/maker-plan");
    } else {
      // role이 없거나 알 수 없는 경우 → 로그인 페이지
      router.replace("/login");
    }
  }, [session, router]);

  // 리다이렉트 중 로딩 화면 표시
  return <GlobalLoader />;
}
