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
    nama: string;
    email: string;
    jabatan?: string;
    departemen?: string;
  };
};

export function KaryawanFormModal({
  open,
  onOpenChange,
  mode = "create",
  defaultValues,
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
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
