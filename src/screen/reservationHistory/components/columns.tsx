import { ColumnDef, HeaderContext } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Button } from "@/components/ui/button";
import { dataDef } from "./data";
dayjs.extend(customParseFormat);

const header =
  (label: string) =>
  ({ column }: HeaderContext<dataDef, unknown>) =>
    (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    );

export const columns: ColumnDef<dataDef>[] = [
  {
    accessorKey: "id",
    header: header("id"),
    filterFn: "equalsString",
  },
  {
    accessorKey: "customer",
    header: header("customer"),
    cell: ({ row }) => {
      const formatted = `${row.original.customer.firstName} ${row.original.customer.lastName}`;
      return formatted;
    },
    sortingFn: (rowA, rowB) => {
      const rowA_name =
        `${rowA.original.customer.firstName} ${rowA.original.customer.lastName}`.toLowerCase();
      const rowB_name =
        `${rowB.original.customer.firstName} ${rowB.original.customer.lastName}`.toLowerCase();
      return rowA_name > rowB_name ? 1 : -1;
    },
    filterFn: (row, _, filterValue) => {
      const name =
        `${row.original.customer.firstName} ${row.original.customer.lastName}`.toLowerCase();
      return name.includes(filterValue);
    },
  },

  {
    accessorKey: "status",
    header: header("status"),
    filterFn: "equalsString",
  },
  {
    accessorKey: "shift",
    header: header("shift"),
    filterFn: "equalsString",
  },
  {
    accessorKey: "quantity",
    header: header("quantity"),
    filterFn: "equalsString",
  },
  {
    accessorKey: "area",
    header: header("area"),
    filterFn: "equalsString",
  },
  {
    accessorKey: "businessDate",
    header: header("businessDate"),
    cell: ({ row }) => {
      const formatted = `${dayjs(
        row.original.businessDate,
        "DD.MM.YYYY"
      ).format("YYYY/MM/DD")} ${dayjs(row.original.start).format(
        "HH:mm"
      )} - ${dayjs(row.original.end).format("HH:mm")}`;
      return formatted;
    },
    filterFn: (row, _, filterValue) => {
      if (filterValue?.type === "before") {
        const conserned = row.original.start;
        return (
          dayjs(conserned).isBefore(filterValue?.value) ||
          dayjs(conserned).isSame(filterValue?.value)
        );
      } else if (filterValue?.type === "after") {
        const conserned = row.original.end;
        return (
          dayjs(conserned).isAfter(filterValue?.value) ||
          dayjs(conserned).isSame(filterValue?.value)
        );
      }
      return true;
    },
  },
  {
    accessorKey: "guestNotes",
    header: header("guestNotes"),
  },
];
