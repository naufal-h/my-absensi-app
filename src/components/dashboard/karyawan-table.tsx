"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteKaryawan, getAllKaryawan } from "@/lib/karyawan";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import * as React from "react";
import { KaryawanFormModal } from "../form/karyawan-form-modal";
import { Button } from "../ui/button";

type Karyawan = {
  id: number;
  name: string;
  email: string;
  position: string;
  division: string;
};

export function KaryawanTable({
  refresh,
  onRefresh,
}: {
  refresh: boolean;
  onRefresh?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Karyawan | null>(null);
  const [data, setData] = React.useState<Karyawan[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await getAllKaryawan();
        setData(res);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Gagal mengambil data");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [refresh]);

  const columns: ColumnDef<Karyawan>[] = [
    {
      accessorKey: "name",
      header: "Nama",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "position",
      header: "Jabatan",
      cell: ({ row }) => row.getValue("position"),
    },
    {
      accessorKey: "division",
      header: "Departemen",
      cell: ({ row }) => row.getValue("division"),
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: ({ row }) => {
        const karyawan = row.original;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setSelected(karyawan);
                setOpen(true);
              }}
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={() => {
                const confirm = window.confirm(
                  `Yakin ingin menghapus ${karyawan.name}?`
                );
                if (confirm) {
                  deleteKaryawan(karyawan.id)
                    .then(() => {
                      alert("Karyawan berhasil dihapus");
                      onRefresh?.();
                    })
                    .catch((err) => {
                      alert(err.message || "Gagal menghapus karyawan");
                    });
                }
              }}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10"
                >
                  Memuat data...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10 text-red-500"
                >
                  {error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10 text-muted-foreground"
                >
                  Tidak ada hasil ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {selected && (
        <KaryawanFormModal
          open={open}
          onOpenChange={setOpen}
          mode="edit"
          defaultValues={{
            name: selected.name,
            email: selected.email,
            position: selected.position,
            division: selected.division,
          }}
          onSuccess={() => {
            setOpen(false);
            onRefresh?.();
          }}
        />
      )}
    </div>
  );
}
