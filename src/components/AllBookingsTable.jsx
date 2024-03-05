import { Table } from '@mui/material'
const AllBookingsTable = ({ hotel }) => {
  return (
    <div>
      {/* {hotel.bookings?.map((booking) => (
        <p>{booking._id}</p>
      ))} */}
      <Table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Customer Contact</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>No of Rooms</th>
            <th>No of Adults</th>
            <th>No of Children</th>
            <th>Special Request</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {hotel.bookings?.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.customerId.email}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.noOfRooms}</td>
              <td>{booking.adults}</td>
              <td>{booking.children}</td>
              <td>{booking.specialRequest}</td>
              <td>{booking.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default AllBookingsTable
