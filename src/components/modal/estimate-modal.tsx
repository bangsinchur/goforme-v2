import { useEditorModal } from "@/store/editor-modal";
import EditorModal from "./editor-modal";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useEstimate } from "@/hooks/mutations/use-estimate";
import { useState } from "react";
import { toast } from "sonner";


export default function EstimateModal() {
  const { close, planId } = useEditorModal();
  const [price, setPrice] = useState<number>(0);
  const [content, setContent] = useState<string>("");

  const { mutate, isPending } = useEstimate({
    onSuccess: () => {
      toast.success("견적이 성공적으로 전송되었습니다!");
      close();
    },
    onError: (error) => {
      toast.error(error.message || "견적 전송에 실패했습니다.");
    },
  });

  const handleSubmit = () => {
    if (!planId) {
      toast.error("여행 ID가 없습니다.");
      return;
    }
    if (!price || price <= 0) {
      toast.error("견적금액을 입력해주세요.");
      return;
    }
    if (!content.trim()) {
      toast.error("견적 내용을 입력해주세요.");
      return;
    }

    mutate({ planId, quoteData: { price, content } });
  };

  return (
    <EditorModal title="여행 견적 보내기">
      <div className="flex flex-col gap-4">
        <div className="font-bold">견적금액을 입력해주세요.</div>
        <Input 
          type="number" 
          placeholder="견적금액(원)" 
          className="w-full" 
          value={price || ""}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <div className="font-bold">견적 상세 내용</div>
        <Textarea 
          placeholder="견적 상세 내용" 
          className="w-full h-40" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "전송 중..." : "견적 보내기"}
        </Button>
      </div>
    </EditorModal>
  );
}
