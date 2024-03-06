import { useState, useEffect } from 'react'
import { getAllCompanyHotels } from '../services/company'
import HotelCharts from './HotelCharts'

const Dashboard = ({ user }) => {
  const [hotels, setHotels] = useState([])
  // const dummyData = [
  //   {
  //     Hotel: 'Hotel1',
  //     January: 100,
  //     February: 90,
  //     March: 100,
  //     April: 23,
  //     June: 100,
  //     July: 12,
  //     August: 123,
  //     September: 823,
  //     October: 244,
  //     November: 495,
  //     December: 33
  //   },
  //   {
  //     Hotel: 'Hotel2',
  //     January: 100,
  //     February: 90,
  //     March: 100,
  //     April: 203,
  //     June: 100,
  //     July: 102,
  //     August: 123,
  //     September: 23,
  //     October: 244,
  //     November: 495,
  //     December: 333
  //   },
  //   {
  //     Hotel: 'Hotel3',
  //     January: 100,
  //     February: 90,
  //     March: 100,
  //     April: 203,
  //     June: 100,
  //     July: 102,
  //     August: 123,
  //     September: 23,
  //     October: 244,
  //     November: 495,
  //     December: 333
  //   },
  //   {
  //     Hotel: 'Hotel4',
  //     January: 100,
  //     February: 90,
  //     March: 100,
  //     April: 203,
  //     June: 100,
  //     July: 102,
  //     August: 123,
  //     September: 23,
  //     October: 244,
  //     November: 495,
  //     December: 333
  //   },
  //   {
  //     Hotel: 'Hotel5',
  //     January: 100,
  //     February: 90,
  //     March: 100,
  //     April: 203,
  //     June: 100,
  //     July: 102,
  //     August: 123,
  //     September: 23,
  //     October: 244,
  //     November: 495,
  //     December: 333
  //   },
  //   {
  //     Hotel: 'Hotel6',
  //     January: 100,
  //     February: 90,
  //     March: 100,
  //     April: 203,
  //     June: 100,
  //     July: 102,
  //     August: 123,
  //     September: 23,
  //     October: 244,
  //     November: 495,
  //     December: 333
  //   },
  //   {
  //     Hotel: 'Hotel7',
  //     January: 100,
  //     February: 90,
  //     March: 100,
  //     April: 203,
  //     June: 100,
  //     July: 102,
  //     August: 123,
  //     September: 23,
  //     October: 244,
  //     November: 495,
  //     December: 333
  //   }
  // ]
  const dummyData = [
    {
      Hotel: 'Hotel1',
      Bookings: 2
    },
    {
      Hotel: 'Hotel2',
      Bookings: 5
    },
    {
      Hotel: 'Hotel3',
      Bookings: 8
    },
    {
      Hotel: 'Hotel4',
      Bookings: 2
    },
    {
      Hotel: 'Hotel5',
      Bookings: 10
    },
    {
      Hotel: 'Hotel6',
      Bookings: 20
    },
    {
      Hotel: 'Hotel7',
      Bookings: 24
    },
    {
      Hotel: 'Hotel8',
      Bookings: 16
    }
  ]
  useEffect(() => {
    const allHotels = async () => {
      let data = await getAllCompanyHotels(user.id)
      setHotels(data)
    }
    allHotels()
  }, [])
  return (
    user &&
    user.type === 'company' && (
      <div>
        <h1>Dashboard</h1>
        <div className="CompanyProfileHotelsListDiv">
          {hotels?.map((hotel) => (
            <button className="companyhotelcardname" key={hotel._id}>
              {hotel.name}
            </button>
          ))}
        </div>
        <div>
          <HotelCharts data={dummyData} />
        </div>
      </div>
    )
  )
}
export default Dashboard
