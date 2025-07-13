import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { KaryawanForm } from "./karyawan-form";

type KaryawanFormModalProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  mode?: "create" | "edit";
  defaultValues?: {
    name: string;
    email: string;
    position?: string;
    division?: string;
  };
  onSuccess?: () => void;
};

export function KaryawanFormModal({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
  onSuccess = () => {},
}: KaryawanFormModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Tambah Karyawan" : "Edit Karyawan"}
          </DialogTitle>
        </DialogHeader>
        <KaryawanForm
          mode={mode}
          defaultValues={defaultValues}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
