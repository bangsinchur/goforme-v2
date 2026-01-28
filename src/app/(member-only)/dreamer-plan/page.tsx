"use client";

import DreamerPlanPost from "@/components/post/dreamer/dreamer-plan-post";
import ReceivedEstimate from "@/components/post/dreamer/received-estimate";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function DreamerPlanPage() {
  const [activeTab, setActiveTab] = useState<
    "DREAMER_PLAN_POST" | "RECEIVED_ESTIMATE"
  >("DREAMER_PLAN_POST");

  return (
    <div>
      <div className="flex gap-2 ">
        <Button
          onClick={() => setActiveTab("DREAMER_PLAN_POST")}
          variant={activeTab === "DREAMER_PLAN_POST" ? "default" : "outline"}
          className={`px-4 py-2 rounded-md ${activeTab === "DREAMER_PLAN_POST" ? " border-b-muted-foreground border-b-4" : "bg-background text-foreground"}`}
        >
          드리머 플랜 페이지
        </Button>
        <Button
          onClick={() => setActiveTab("RECEIVED_ESTIMATE")}
          variant={activeTab === "RECEIVED_ESTIMATE" ? "default" : "outline"}
          className={`px-4 py-2 rounded-md ${activeTab === "RECEIVED_ESTIMATE" ? " border-b-muted-foreground border-b-4" : "bg-background text-foreground"}`}
        >
          받은 견적서
        </Button>
      </div>

      <div>
        {activeTab === "DREAMER_PLAN_POST" && <DreamerPlanPost />}
        {activeTab === "RECEIVED_ESTIMATE" && <ReceivedEstimate />}
      </div>
    </div>
  );
}
