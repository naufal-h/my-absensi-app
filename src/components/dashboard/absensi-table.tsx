"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format, isWithinInterval, parseISO } from "date-fns";
import { CalendarIcon, Eye } from "lucide-react";
import * as React from "react";
import { DateRange } from "react-day-picker";

type Absensi = {
  id: string;
  nama: string;
  email: string;
  waktuAbsensi: string;
  foto: string;
};

const absensiData: Absensi[] = [
  {
    id: "1",
    nama: "Budi Santoso",
    email: "budi@example.com",
    waktuAbsensi: "2025-07-09T08:12:00",
    foto: "/images/bukti/budi-0907.jpg",
  },
  {
    id: "2",
    nama: "Ani Rahmawati",
    email: "ani@example.com",
    waktuAbsensi: "2025-07-10T08:05:00",
    foto: "/images/bukti/ani-1007.jpg",
  },
  {
    id: "1",
    nama: "Budi Santoso",
    email: "budi@example.com",
    waktuAbsensi: "2025-07-09T08:12:00",
    foto: "/images/bukti/budi-0907.jpg",
  },
  {
    id: "2",
    nama: "Ani Rahmawati",
    email: "ani@example.com",
    waktuAbsensi: "2025-07-10T08:05:00",
    foto: "/images/bukti/ani-1007.jpg",
  },
  {
    id: "1",
    nama: "Budi Santoso",
    email: "budi@example.com",
    waktuAbsensi: "2025-07-09T08:12:00",
    foto: "/images/bukti/budi-0907.jpg",
  },
  {
    id: "2",
    nama: "Ani Rahmawati",
    email: "ani@example.com",
    waktuAbsensi: "2025-07-10T08:05:00",
    foto: "/images/bukti/ani-1007.jpg",
  },
  {
    id: "1",
    nama: "Budi Santoso",
    email: "budi@example.com",
    waktuAbsensi: "2025-07-09T08:12:00",
    foto: "/images/bukti/budi-0907.jpg",
  },
  {
    id: "2",
    nama: "Ani Rahmawati",
    email: "ani@example.com",
    waktuAbsensi: "2025-07-10T08:05:00",
    foto: "/images/bukti/ani-1007.jpg",
  },
  {
    id: "1",
    nama: "Budi Santoso",
    email: "budi@example.com",
    waktuAbsensi: "2025-07-09T08:12:00",
    foto: "/images/bukti/budi-0907.jpg",
  },
  {
    id: "2",
    nama: "Ani Rahmawati",
    email: "ani@example.com",
    waktuAbsensi: "2025-07-10T08:05:00",
    foto: "/images/bukti/ani-1007.jpg",
  },
  {
    id: "1",
    nama: "Budi Santoso",
    email: "budi@example.com",
    waktuAbsensi: "2025-07-09T08:12:00",
    foto: "/images/bukti/budi-0907.jpg",
  },
  {
    id: "2",
    nama: "Ani Rahmawati",
    email: "ani@example.com",
    waktuAbsensi: "2025-07-10T08:05:00",
    foto: "/images/bukti/ani-1007.jpg",
  },
];

export const columns: ColumnDef<Absensi>[] = [
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
    accessorKey: "waktuAbsensi",
    header: "Waktu Absensi",
    cell: ({ row }) =>
      format(parseISO(row.getValue("waktuAbsensi")), "dd/MM/yyyy HH:mm"),
  },
  {
    id: "bukti",
    header: "Bukti",
    cell: ({ row }) => {
      const foto = row.original.foto;
      return (
        <Button
          size="icon"
          variant="ghost"
          onClick={() => window.open(foto, "_blank")}
        >
          <Eye className="w-4 h-4" />
        </Button>
      );
    },
  },
];

export function AbsensiTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>();

  const filteredData = React.useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return absensiData;
    return absensiData.filter((item) =>
      isWithinInterval(parseISO(item.waktuAbsensi), {
        start: dateRange.from!,
        end: dateRange.to!,
      })
    );
  }, [dateRange]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 py-4">
        <Input
          placeholder="Filter nama atau email..."
          value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
          onChange={(e) => {
            table.getColumn("nama")?.setFilterValue(e.target.value);
            table.getColumn("email")?.setFilterValue(e.target.value);
          }}
          className="max-w-sm"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                <>
                  {format(dateRange.from, "dd/MM/yyyy")} -{" "}
                  {dateRange.to ? format(dateRange.to, "dd/MM/yyyy") : "…"}
                </>
              ) : (
                "Pilih Rentang Tanggal"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="sm:ml-2">
              Kolom
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(v) => col.toggleVisibility(!!v)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
    </div>
  );
}
