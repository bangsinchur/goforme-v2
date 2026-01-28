"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@/store/session";
import { useEffect } from "react";
import GlobalLoader from "@/components/ui/global-loader";

export default function GuestOnlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      const role = session.user?.role;

      if (role === "DREAMER") {
        router.replace("/dreamer-plan");
      } else if (role === "MAKER") {
        router.replace("/maker-plan");
      } else {
        router.replace("/");
      }
    }
  }, [session, router]);

  if (session) return <GlobalLoader />;

  return <>{children}</>;
}
