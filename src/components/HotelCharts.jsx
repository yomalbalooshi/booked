// import { ResponsiveBar } from '@nivo/bar'
import { AreaChart, BarChart, DonutChart } from '@tremor/react'
import '../Dashboard.css'
import './test.module.css'
import { useEffect, useState } from 'react'
const HotelCharts = ({ user, selectedHotel }) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const [dataPerMonth, setDataPerMonth] = useState([])
  const [totalBookingsPerMonth, setTotalBookingsPerMonth] = useState({})
  const [totalRevenuePerMonth, setTotalRevenuePerMonth] = useState({})
  const [totalBookingsPerGender, setTotalBookingsPerGender] = useState({})
  const [totalBookingsPerNationality, setTotalBookingsPerNationality] =
    useState({})
  const [totalRevenuePerMonthPerGender, settotalRevenuePerMonthPerGender] =
    useState({})

  const getTotals = (hotel) => {
    const bookingsPerMonth = {}
    const revenuePerMonth = {}
    const bookingsPerGender = {}
    const bookingsPerNationality = {}

    if (hotel && hotel.bookings) {
      months.forEach((month) => {
        bookingsPerMonth[month] = 0
        revenuePerMonth[month] = 0
      })

      hotel.bookings.forEach((booking) => {
        if (booking.checkIn && booking.totalCost) {
          const checkInDate = new Date(booking.checkIn)
          const checkInMonth = months[checkInDate.getMonth()]
          bookingsPerMonth[checkInMonth]++
          revenuePerMonth[checkInMonth] += booking.totalCost
          const gender = booking.customerId.gender || 'unknown'
          bookingsPerGender[gender] = (bookingsPerGender[gender] || 0) + 1
          const nationality = booking.customerId.nationality || 'unknown'
          bookingsPerNationality[nationality] =
            (bookingsPerNationality[nationality] || 0) + 1
        }
      })

      const uniqueGenders = [
        ...new Set(hotel.bookings.map((booking) => booking.customerId.gender))
      ]
      const totalBookingsPerGenderArray = uniqueGenders.map((gender) => ({
        name: gender || 'Unknown',
        value: bookingsPerGender[gender] || 0
      }))
      const uniqueNationalities = [
        ...new Set(
          hotel.bookings.map((booking) => booking.customerId.nationality)
        )
      ]
      const totalBookingsPerNationalityArray = uniqueNationalities.map(
        (nationality) => ({
          name: nationality || 'Unknown',
          value: bookingsPerNationality[nationality] || 0
        })
      )

      const totalRevenuePerMonthPerGenderArray = months.map((month) => {
        const genderRevenue = {}
        uniqueGenders.forEach((gender) => {
          genderRevenue[gender || 'Unknown'] = bookingsPerGender[gender]
            ? revenuePerMonth[month]
            : 0
        })

        return {
          Month: month,
          ...genderRevenue
        }
      })

      const formattedData = months.map((month) => ({
        Month: month,
        Bookings: bookingsPerMonth[month],
        Revenue: revenuePerMonth[month]
      }))
      setDataPerMonth(formattedData)
      setTotalBookingsPerGender(totalBookingsPerGenderArray)
      setTotalBookingsPerNationality(totalBookingsPerNationalityArray)
      settotalRevenuePerMonthPerGender(totalRevenuePerMonthPerGenderArray)
    }
    return {
      bookingsPerGender,
      bookingsPerNationality
    }
  }

  useEffect(() => {
    const { bookingsPerGender, bookingsPerNationality } =
      getTotals(selectedHotel)
  }, [selectedHotel])
  const chartdata = [
    {
      name: 'January',
      'Hotel 1': 890,
      'Hotel 2': 338,
      'Hotel 3': 538,
      'Hotel 4': 396,
      'Hotel 5': 138,
      'Hotel 6': 436
    },
    {
      name: 'February',
      'Hotel 1': 289,
      'Hotel 2': 233,
      'Hotel 3': 253,
      'Hotel 4': 333,
      'Hotel 5': 133,
      'Hotel 6': 533
    },
    {
      name: 'March',
      'Hotel 1': 380,
      'Hotel 2': 535,
      'Hotel 3': 352,
      'Hotel 4': 718,
      'Hotel 5': 539,
      'Hotel 6': 234
    },
    {
      name: 'April',
      'Hotel 1': 90,
      'Hotel 2': 98,
      'Hotel 3': 28,
      'Hotel 4': 33,
      'Hotel 5': 61,
      'Hotel 6': 53
    }
  ]
  return (
    <div id="hotel">
      {selectedHotel && <h1>Dashboard</h1>}
      <h1>{selectedHotel._id}</h1>

      <h2>Revenue Per Month</h2>
      <div style={{ height: '80%', width: '90%' }}>
        {dataPerMonth && Object.keys(dataPerMonth).length > 0 && (
          <AreaChart
            className="mt-4"
            data={dataPerMonth}
            index="Month"
            categories={['Revenue']}
            colors={['indigo']}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        )}
      </div>
      <h2>Bookings Per Month</h2>
      <div style={{ height: '80%', width: '90%' }}>
        {dataPerMonth && Object.keys(dataPerMonth).length > 0 && (
          <AreaChart
            className="mt-4"
            data={dataPerMonth}
            index="Month"
            categories={['Bookings']}
            colors={['rose']}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />
        )}
      </div>
      <h2>Revenue Per Month Per Gender</h2>
      <div style={{ height: '80%', width: '90%' }}>
        {totalRevenuePerMonthPerGender &&
          Object.keys(totalRevenuePerMonthPerGender).length > 0 && (
            <BarChart
              className="mt-6"
              data={totalRevenuePerMonthPerGender}
              index="Month"
              categories={['Female', 'Male', 'Unknown']}
              colors={['rose', 'indigo', 'amber']}
              yAxisWidth={48}
            />
          )}
      </div>

      <h2>Total of Each Gender for Bookings</h2>
      <div style={{ height: '80%', width: '90%' }}>
        {totalBookingsPerGender &&
          Object.keys(totalBookingsPerGender).length > 0 && (
            <DonutChart
              data={totalBookingsPerGender}
              variant="donut"
              onValueChange={(v) => console.log(v)}
            />
          )}
      </div>

      <h2>Total of Each Gender for Bookings</h2>
      <div style={{ height: '80%', width: '90%' }}>
        {totalBookingsPerNationality &&
          Object.keys(totalBookingsPerNationality).length > 0 && (
            <DonutChart
              data={totalBookingsPerNationality}
              variant="pie"
              onValueChange={(v) => console.log(v)}
            />
          )}
      </div>
    </div>
  )
}
export default HotelCharts
