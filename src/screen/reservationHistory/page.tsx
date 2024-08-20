import { DataTable } from "@/components/ui/data-table";
import { getData } from "./components/data";
import { columns } from "./components/columns";
import Filter from "./components/Filter";

export default function ReservationHistory() {
  const data = getData();
  return (
    <>
      <h1 className=" text-3xl font-bold py-6	">Reservations History</h1>
      <DataTable
        data={data}
        columns={columns}
        FilterComponent={Filter}
        defaultSorting={[{ id: "id", desc: false }]}
      />
    </>
  );
}
