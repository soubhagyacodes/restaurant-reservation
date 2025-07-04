import nodemailer from "nodemailer"

async function sendMail(to, {tableNumber, seats, restaurantName, restaurantLocation, reservationDate, reservationTime, reservationDuration}) {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: "plated0001@gmail.com",
         pass: process.env.GOOGLE_APP_PASSWORD,
      },
   });

   transporter.sendMail({
      from: '"Plated" <plated0001@gmail.com>',
      to,
      subject: `Plated - Reservation of Table #${tableNumber} Successful at ${restaurantName}`,
      html: `<p> Table Reserved Successfully with ${tableNumber}</p>`
   })

}

export {sendMail}