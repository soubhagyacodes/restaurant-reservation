/*
  Warnings:

  - A unique constraint covering the columns `[reservationTime,duration,tableId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Reservation_reservationTime_duration_tableId_key" ON "Reservation"("reservationTime", "duration", "tableId");
