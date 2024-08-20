import { ColumnFiltersState, Table } from "@tanstack/react-table";
import {
  dataDef,
  getAllAvailableArea,
  getAllAvailableShift,
  getAllAvailableStatus,
} from "./data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";

type props = {
  table: Table<dataDef>;
  columnFilters: ColumnFiltersState;
};

// we could refactor each filter since the only difference is the columns label
// and we could integrate the filter at the header of each columns inside a popover
// but this would take some time to change everything
export default function Filter({ table, columnFilters }: props) {
  const [hide, setHide] = React.useState(true);
  const status = getAllAvailableStatus();
  const shift = getAllAvailableShift();
  const area = getAllAvailableArea();

  return (
    <>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            setHide((curr) => !curr);
          }}
        >
          Filters
        </Button>
        <Button
          disabled={!columnFilters.length}
          onClick={() => {
            table.resetColumnFilters();
          }}
        >
          Reset Filters
        </Button>
      </div>
      {!hide && (
        <div className="grid grid-cols-3 gap-2 items-center py-4">
          <Input
            placeholder="Filter id..."
            value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("id")?.setFilterValue(event.target.value)
            }
            type="number"
            className="max-w-sm"
          />

          <Input
            placeholder="Filter customer..."
            value={
              (table.getColumn("customer")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("customer")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <Select
            onValueChange={(value) =>
              table
                .getColumn("status")
                ?.setFilterValue(value === " " ? "" : value)
            }
            value={
              (table.getColumn("status")?.getFilterValue() as string) ?? ""
            }
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter status..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">Tous</SelectItem>
              {status.map((row: string) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) =>
              table
                .getColumn("shift")
                ?.setFilterValue(value === " " ? "" : value)
            }
            value={(table.getColumn("shift")?.getFilterValue() as string) ?? ""}
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter shift..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">Tous</SelectItem>
              {shift.map((row: string) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Filter quantity..."
            value={
              (table.getColumn("quantity")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("quantity")?.setFilterValue(event.target.value)
            }
            type="number"
            className="max-w-sm"
          />

          <Select
            onValueChange={(value) =>
              table
                .getColumn("area")
                ?.setFilterValue(value === " " ? "" : value)
            }
            value={(table.getColumn("area")?.getFilterValue() as string) ?? ""}
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter area..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=" ">Tous</SelectItem>
              {area.map((row: string) => (
                <SelectItem key={row} value={row}>
                  {row}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Filter guestNotes..."
            value={
              (table.getColumn("guestNotes")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("guestNotes")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          <div />
          <div />
          <div>
            <p className="text-gray-400">
              This Date and all date after it (min date)
            </p>
            <Input
              placeholder="Filter date..."
              onChange={(event) => {
                table.getColumn("businessDate")?.setFilterValue({
                  value: event.target.value,
                  type: "after",
                });
              }}
              type="datetime-local"
            />
          </div>
          <div>
            <p className="text-gray-400">
              This Date and all date before it (max date)
            </p>
            <Input
              placeholder="Filter date..."
              onChange={(event) => {
                table.getColumn("businessDate")?.setFilterValue({
                  value: event.target.value,
                  type: "before",
                });
              }}
              type="datetime-local"
            />
          </div>
        </div>
      )}
    </>
  );
}
