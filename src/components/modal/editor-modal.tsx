
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useEditorModal } from "@/store/editor-modal";

//공용 모달 컴포넌트
export default function EditorModal({ children, title }: { children: React.ReactNode, title: string }) {
    const { isOpen, close } = useEditorModal();

    const handleCloseModal = () => {
        close();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleCloseModal}>
            <DialogContent className="flex flex-col max-h-[90vh] gap-7">
                <DialogTitle className="text-xl">{title}</DialogTitle>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
}