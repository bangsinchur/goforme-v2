"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DreamerPlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div>
      {/* 네비게이션 */}
      <div className="flex gap-2 my-5">
        <Link href="/dreamer-plan">
          <Button
            variant={pathname === "/dreamer-plan" ? "default" : "outline"}
            className="px-4 py-2 rounded-md"
          >
            드리머 플랜 페이지
          </Button>
        </Link>
        <Link href="/dreamer-plan/estimates">
          <Button
            variant={
              pathname === "/dreamer-plan/estimates" ? "default" : "outline"
            }
            className="px-4 py-2 rounded-md"
          >
            받은 견적서
          </Button>
        </Link>
      </div>
      <div>{children}</div>
    </div>
  );
}
