import { Button } from "../ui/button";
import { useEditorModal } from "@/store/editor-modal";
import { useEstimate } from "@/hooks/mutations/use-estimate";

export default function Estimate({ planId }: { planId: string }) {

    const { open, reset } = useEditorModal();

    const handleButtonClick = () => {
        reset();
        open('ESTIMATE', planId);
    }
    return (
        <Button className="w-full cursor-pointer" onClick={handleButtonClick}>여행견적 보내기</Button>
    )

}