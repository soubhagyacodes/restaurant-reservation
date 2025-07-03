import TableWithChairs from "@/components/TablewithChairs";

export default function CustomerProfile() {
  return (
    <div className="min-h-screen bg-orange-200 flex flex-col gap-15">
      <div className="flex">
        <TableWithChairs seatCount={10} tableNumber={10} />
        <TableWithChairs seatCount={2} tableNumber={12} />
        <TableWithChairs seatCount={5} tableNumber={13} />
      </div>
        <div className="flex">
          <TableWithChairs seatCount={10} tableNumber={10} />
          <TableWithChairs seatCount={2} tableNumber={12} />
          <TableWithChairs seatCount={2} tableNumber={13} />
        </div>
    </div>
  )
}
