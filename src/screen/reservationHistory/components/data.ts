import data from "../../../../data.json";

export type dataDef = {
  id: number;
  businessDate: string;
  status: string;
  shift: string;
  start: string;
  end: string;
  quantity: number;
  customer: {
    firstName: string;
    lastName: string;
  };
  area: string;
  guestNotes: string;
};

export function getData(): dataDef[] {
  return data.reservations;
}
// this cache will be used to mimic react query
const cache = new Map();
function getAll(field: keyof dataDef) {
  const cached = cache.get(field);
  if (cached) {
    return cached;
  }
  const filter = new Set();
  getData().forEach((row) => {
    filter.add(row[field]);
  });
  cache.set(field, [...filter]);
  return [...filter] as dataDef[keyof dataDef][];
}

export function getAllAvailableStatus() {
  return getAll("status") as string[];
}
export function getAllAvailableShift() {
  return getAll("shift") as string[];
}
export function getAllAvailableArea() {
  return getAll("area") as string[];
}
