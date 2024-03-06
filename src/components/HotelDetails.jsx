import { useParams, useNavigate } from 'react-router-dom'
import { ShowHotel } from '../services/Hotels'
import { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Carousel from 'react-material-ui-carousel'

const HotelDetails = ({ user }) => {
  let navigate = useNavigate()
  let { id } = useParams()
  let [hotel, setHotel] = useState({})

  useEffect(() => {
    const getHotelDetails = async () => {
      let response = await ShowHotel(id)
      setHotel(response)
    }
    getHotelDetails()
  }, [])
  const basePrice = () => {
    if (hotel.rooms.length > 0) {
      let minPrice = hotel.rooms[0].price
      hotel.rooms.forEach((room) => {
        if (room.price < minPrice) {
          minPrice = room.price
        }
      })
      return minPrice
    } else {
      return 0
    }
  }
  return (
    Object.keys(hotel).length !== 0 && (
      <div>
        <div className="relative flex spa bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-full max-h-96 flex-row mb-8 mr-10">
          <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0 ">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6 grow grid grid-cols-2">
            <div>
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {hotel.name}
              </h4>
              <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                {hotel.location.city}, {hotel.location.country}
              </h6>

              <p className="block text-xl/loose mb-8 font-sans  antialiased font-normal leading-relaxed text-gray-700">
                {hotel.description}
              </p>
              <div>
                <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                  Amenities
                </h6>
                <ul className="list-disc pl-6">
                  {hotel.amenities.map((amenity, index) => (
                    <li key={index} className="mb-2">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-end">
              <p className="font-bold text-lg">
                {(basePrice() && `${basePrice()} BHD`) || 'Unspecified price'}
              </p>
            </div>
          </div>
        </div>
        <h4 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal  text-gray-700 text-center">
          Rooms
        </h4>
        <div className="room flex justify-center">
          {hotel.rooms.map((room) => (
            <div className="relative flex spa bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-7xl max-h-fit flex-row mb-8 mr-10">
              <div className="p-6 grow grid grid-cols-2">
                <div>
                  <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                    {room.roomType}
                  </h4>
                  <p className="font-bold text-lg mb-6">
                    {room.price} BHD / per night
                  </p>
                  <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                    Max Children: {room.maxChildren}
                  </h6>
                  <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                    Max Adults: {room.maxAdults}
                  </h6>

                  <div>
                    <h6 className="block mb-2 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                      Amenities
                    </h6>
                    <ul className="list-disc pl-6">
                      {room.amenities.map((amenity, index) => (
                        <li key={index} className="mb-2">
                          {amenity}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative  m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border  shrink-0 ">
                  {room.images && room.images.length > 0 && (
                    <Carousel>
                      {room.images.map((image, index) => (
                        <img
                          className="object-contain rounded-xl "
                          key={index}
                          src={image}
                        ></img>
                      ))}
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      // <div>
      //   <div id="hotel-details">
      //     <h1>{hotel.name}</h1>
      //     <p>{hotel.description}</p>
      //     <p>
      //       {hotel.location.city},{hotel.location.country}
      //     </p>

      //     <img src={hotel.image} alt={hotel.name}></img>
      //     <h5>Amenities</h5>
      //     {hotel.amenities && hotel.amenities.length > 0 && (
      //       <ul>
      //         {hotel.amenities.map((amenity, index) => (
      //           <li key={index}>{amenity}</li>
      //         ))}
      //       </ul>
      //     )}
      //   </div>
      //   <div id="rooms">
      //     <h2>Rooms</h2>
      //     {hotel.rooms &&
      //       hotel.rooms.length > 0 &&
      //       hotel.rooms.map((room) => (
      //         <div id="room" key={room._id}>
      //           <p>Room Type: {room.roomType}</p>
      //           <p>Max Guests: {room.maxGuests}</p>
      //           <p>Price: {room.price} $</p>
      //           <h5>Amenities</h5>
      //           {room.amenities && room.amenities.length > 0 && (
      //             <ul>
      //               {room.amenities.map((amenity, index) => (
      //                 <li key={index}>{amenity}</li>
      //               ))}
      //             </ul>
      //           )}
      //           {room.images && room.images.length > 0 && (
      //             <div>
      //               {room.images.map((image, index) => (
      //                 <img key={index} src={image}></img>
      //               ))}
      //             </div>
      //           )}
      //         </div>
      //       ))}
      //   </div>
      //   <div id="reviews">
      //     <h2>Reviews</h2>
      //     {hotel.reviews &&
      //       hotel.reviews.length > 0 &&
      //       hotel.reviews.map((review) => (
      //         <div key={review._id}>
      //           <p>{review.feedback}</p>
      //           <p>{review.creationDate}</p>
      //           <p>{review.rating}</p>
      //         </div>
      //       ))}
      //   </div>
      //   <div id="book">
      //     <button onClick={() => navigate(`/booking/${hotel._id}`)}>
      //       Booking
      //     </button>
      //   </div>
      // </div>
    )
  )
}

export default HotelDetails
