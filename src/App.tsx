import ReservationHistory from "./screen/reservationHistory/page.tsx";

// entry point for page css setup and routing
export default function App() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className=" max-w-7xl m-auto p-2 bg-white min-h-screen">
        {/* my route simulator */}
        <ReservationHistory />
      </div>
    </div>
  );
}
