import { inject } from "vue";
import EditImageDialog from "../components/EditImageDialog.vue";
import type { HtmlImageNodeProps } from "../core/BlockNode";
export function useEditImageDialog() {
    const dialogRef = inject("EditImageDialogRef") as typeof EditImageDialog;
    
    function openDialog(blockIndex: number, currentProps: HtmlImageNodeProps) {
        dialogRef.value?.open(blockIndex, currentProps);
    }

    return {
        openDialog,
    };
}