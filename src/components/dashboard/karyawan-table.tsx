"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  id: string;
  nama: string;
  email: string;
  jabatan: string;
  departemen: string;
};

const karyawanData: Karyawan[] = [
  {
    id: "K001",
    nama: "Budi Santoso",
    email: "budi@example.com",
    jabatan: "Frontend Developer",
    departemen: "Corp IT",
  },
  {
    id: "K002",
    nama: "Ani Rahmawati",
    email: "ani@example.com",
    jabatan: "Backend Developer",
    departemen: "Corp IT",
  },
  {
    id: "K003",
    nama: "Dian Prasetyo",
    email: "dian@example.com",
    jabatan: "UI/UX Designer",
    departemen: "Product Design",
  },
  {
    id: "K004",
    nama: "Rina Lestari",
    email: "rina@example.com",
    jabatan: "QA Engineer",
    departemen: "Quality Assurance",
  },
];

export function KaryawanTable() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Karyawan | null>(null);

  const columns: ColumnDef<Karyawan>[] = [
    {
      accessorKey: "nama",
      header: "Nama",
      cell: ({ row }) => row.getValue("nama"),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.getValue("email"),
    },
    {
      accessorKey: "jabatan",
      header: "Jabatan",
      cell: ({ row }) => row.getValue("jabatan"),
    },
    {
      accessorKey: "departemen",
      header: "Departemen",
      cell: ({ row }) => row.getValue("departemen"),
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
            <Button size="icon" onClick={() => alert(`Hapus ${karyawan.nama}`)}>
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: karyawanData,
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
            {table.getRowModel().rows.length ? (
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
                  className="text-center py-10"
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
            nama: selected.nama,
            email: selected.email,
            jabatan: selected.jabatan,
            departemen: selected.departemen,
          }}
        />
      )}
    </div>
  );
}
