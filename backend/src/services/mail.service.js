import nodemailer from "nodemailer"

async function sendMail(to, { username, tableNumber, seats, restaurantName, restaurantLocation, reservationDate, reservationTime, reservationDuration }) {
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
      subject: `Reservation of Table #${tableNumber} Successful at ${restaurantName}`,
      html: ` <p>Hello ${username},</p>
   <p>Your <b>Table #${tableNumber}</b> has been sucessfully reserved at <b>${restaurantName}</b>. <br />Here are your reservation details: </p>
   <table>
      <tr>
         <td><b>Restaurant Name</b></td>
         <td style="padding-left: 50px;">${restaurantName}</td>
      </tr>
      <tr>
         <td><b>Location</b></td>
         <td style="padding-left: 50px;">${restaurantLocation}</td>
      </tr>
      <tr>
         <td><b>Table Number</b></td>
         <td style="padding-left: 50px;">${tableNumber}</td>
      </tr>
      <tr>
         <td><b>Seats</b></td>
         <td style="padding-left: 50px;">${seats}</td>
      </tr>
      <tr>
         <td><b>Reserved Date</b></td>
         <td style="padding-left: 50px;">${reservationDate}</td>
      </tr>
      <tr>
         <td><b>Reserved Time</b></td>
         <td style="padding-left: 50px;">${reservationTime}</td>
      </tr>
      <tr>
         <td><b>Duration</b></td>
         <td style="padding-left: 50px;">${reservationDuration} Hours</td>
      </tr>
   </table>

   <br />
   <p>We look forward to serving you at <b>${restaurantName}</b>. <br/> If you did not make this reservation, please contact our support team immediately.</p>
   <br />
   <p>- Team Plated</p>`
   })

}

export { sendMail }