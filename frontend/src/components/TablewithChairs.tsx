import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useNavigate } from "react-router";

type tableType = {
	id: string,
	tableNumber: number,
	seats: number,
	isAvailable: boolean,
	restaurantId: string,
	_count: { reservationHistory: number }
}


const TableWithChairs = ({ table, big }: {table: tableType, big: boolean}) => {
  const {id: tableId, seats: seatCount, isAvailable, tableNumber, _count: {reservationHistory: pastReservations}, restaurantId} = table
  const navigate = useNavigate()
  const angleStep = 360 / seatCount;
  const radius = big ? 220 : 70;

  const colors = {
    available: {
      tableBG: "bg-green-600",
      tableBorder: "border-green-300",
      chairBG: "bg-green-400"
    },

    notAvailable: {
      tableBG: "bg-red-400",
      tableBorder: "border-red-300",
      chairBG: "bg-red-400"
    }
  }

  const {tableBG, tableBorder, chairBG} = isAvailable ? colors.available : colors.notAvailable

  return (
    <HoverCard openDelay={100} closeDelay={100} open={big ? false : undefined}>
      <HoverCardTrigger>
        <div className={"relative select-none " + (big ? "w-130 h-130 " : "w-50 h-30 ") + (isAvailable && !big ? "cursor-pointer" : (big ? "" : "cursor-not-allowed"))} onClick={isAvailable && !big ? () => navigate(`/restaurants/${restaurantId}/tables/${tableId}`) : () => {}}>
          {/* Table */}
          <div className={"absolute top-1/2 left-1/2 text-white rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 " +  `${tableBorder} ${tableBG} ` + (big ? "w-80 h-80 border-8" : "w-24 h-24 border-4")}>
            <div className="flex flex-col items-center justify-center">
              <span className={"font-bold " + (big ? "text-5xl" : "text-2xl")}>#{tableNumber}</span>
              <span className={(big ? "text-xl mt-1" : "text-xs")}>Seats - {seatCount}</span>
            </div>
          </div>
          {/* Chairs */}
          {[...Array(seatCount)].map((_, i) => {
            const angle = (angleStep * i * Math.PI) / 180;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            return (
              <div
                key={i}
                className={"absolute rounded-full " + `${chairBG} ` + (big ? "w-13 h-13" : "w-7 h-7")}
                style={{
                  top: `calc(50% + ${y}px - ${big ? "1.6rem" : "0.8rem"})`,
                  left: `calc(50% + ${x}px - ${big ? "1.7rem" : "1rem"})`,
                }}
              ></div>
            );
          })}
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" asChild={true}>
          <div className={"!w-50 font-[Rubik] rounded-xl p-5 border-1 " + (isAvailable ? "border-green-400" : "border-red-300")}>
            <p className="text-xl font-bold">Table #{tableNumber}</p>
            {isAvailable ? <p className="text-sm font-bold text-green-500">Available</p> : <p className="text-sm font-bold text-red-500">Not In Service</p>}
            <div className="text-sm">
              <div className="flex justify-between"><p>Seats: </p>{seatCount}</div>
              <div className="flex justify-between"><p>Past Reservations: </p>{pastReservations}</div>
            </div>
          </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default TableWithChairs