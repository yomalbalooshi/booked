import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react'

const AllBookingsTable = ({ hotel }) => {
  return (
    <div className="mt-7">
      <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Booking ID
            </th>
            <th scope="col" className="px-6 py-3">
              Customer Contact
            </th>
            <th scope="col" className="px-6 py-3">
              Check In
            </th>
            <th scope="col" className="px-6 py-3">
              Check Out
            </th>
            <th scope="col" className="px-6 py-3">
              No of Rooms
            </th>
            <th scope="col" className="px-6 py-3">
              No of Adults
            </th>
            <th scope="col" className="px-6 py-3">
              No of Children
            </th>
            <th scope="col" className="px-6 py-3">
              Special Request
            </th>
            <th scope="col" className="px-6 py-3">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody>
          {hotel.bookings?.map((booking) => (
            <tr
              key={booking._id}
              className="bg-white border-b hover:bg-gray-100"
            >
              <td className="px-6 py-4">{booking._id}</td>
              <td className="px-6 py-4">{booking.customerId.email}</td>
              <td className="px-6 py-4">{booking.checkIn}</td>
              <td className="px-6 py-4">{booking.checkOut}</td>
              <td className="px-6 py-4">{booking.noOfRooms}</td>
              <td className="px-6 py-4">{booking.adults}</td>
              <td className="px-6 py-4">{booking.children}</td>
              <td className="px-6 py-4">{booking.specialRequest}</td>
              <td className="px-6 py-4 text-green-800">{booking.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default AllBookingsTable
