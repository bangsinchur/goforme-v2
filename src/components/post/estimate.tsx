import { Button } from "../ui/button";
import { useEditorModal } from "@/store/editor-modal";

import { useUser } from "@/store/session";
import Link from "next/link";

export default function Estimate({ planId }: { planId: string }) {
  const { role } = useUser();
  const { open, reset } = useEditorModal();

  const handleButtonClick = () => {
    reset();
    open("ESTIMATE", planId);
  };
  return (
    <>
      {role === "DREAMER" ? (
        <>
        <Link href={`/dreamer-plan/estimates/${planId}`}>
          <Button className="w-full cursor-pointer">여행 상세 보기</Button>
        </Link>
        </>
      ) : (
        <Button className="w-full cursor-pointer" onClick={handleButtonClick}>
          여행견적 보내기
        </Button>
      )}
    </>
  );
}
