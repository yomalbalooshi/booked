import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { GetHotels, ShowHotel } from '../services/Hotels'
import Carousel from 'react-material-ui-carousel'

import Rating from '@mui/material/Rating'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

const Map = ({ user }) => {
  const [hotels, setHotels] = useState([])

  const [hotel, setHotel] = useState({})

  const randomnizeLatLng = (hotels) => {
    return hotels.map((hotel) => {
      return {
        ...hotel,
        location: {
          lat: Number(hotel.location.lat) + Math.random(),
          lng: Number(hotel.location.lng) + Math.random()
        }
      }
    })
  }
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

  useEffect(() => {
    const handleHotels = async () => {
      const data = await GetHotels()
      setHotels(randomnizeLatLng(data))
    }

    handleHotels()
  }, [])
  useEffect(() => {
    const handleHotels = async () => {
      const data = await GetHotels()
      setHotels(randomnizeLatLng(data))
    }

    handleHotels()
  }, [])

  const handleClick = (hotel, e) => {
    const getHotelDetails = async () => {
      let response = await ShowHotel(hotel._id)
      setHotel(response)
    }
    getHotelDetails()
  }

  return (
    <div id="map-hotel-container">
      <div>
        <MapContainer
          center={[26.0667, 50.5577]}
          zoom={3}
          scrollWheelZoom={true}
          minZoom={2.5}
          maxZoom={18}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {hotels.map((hotel) => (
            <Marker
              key={hotel._id}
              eventHandlers={{
                click: (e) => handleClick(hotel, e)
              }}
              position={[
                Number(hotel.location.lat),
                Number(hotel.location.lng)
              ]}
            >
              <Popup>
                <p>{hotel.name}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {Object.keys(hotel).length !== 0 ? (
        <div>
          <div className="relative flex spa bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm w-full max-w-full  flex-row mb-8 mr-10">
            <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0 hotel-card ">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6 grow grid grid-cols-2">
              <div>
                <h4 className="block mb-2 font-sans text-5xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {hotel.name}
                </h4>
                <h6 className="block mb-4 font-sans text-3xl antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                  {hotel.location.city}, {hotel.location.country}
                </h6>

                <p className="block text-2xl/loose mb-8 font-sans  antialiased font-normal leading-relaxed text-gray-700">
                  {hotel.description}
                </p>
                <div>
                  <h6 className="block mb-2 font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                    Amenities
                  </h6>
                  <ul className="list-disc pl-7 text-xl">
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
              {user && user.type === 'customer' && (
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-2xl py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block max-w-full absolute bottom-10 right-5"
                  type="button"
                  onClick={() => navigate(`/booking/${hotel._id}`)}
                >
                  Make Booking
                </button>
              )}
            </div>
          </div>
          {hotel.rooms && hotel.rooms.length > 0 ? (
            <h4 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal  text-gray-700 text-center">
              Rooms
            </h4>
          ) : (
            <h4 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-snug tracking-normal  text-gray-700 text-center">
              This hotel currently has no rooms available
            </h4>
          )}

          <div>
            {hotel.rooms.map((room, index) => (
              <div
                key={index}
                className="relative flex spa bg-clip-border rounded-xl bg-white text-gray-700 shadow w-full max-w-full max-h-fit flex-row mb-8 mr-10"
              >
                <div className="p-6 grow grid grid-cols-4">
                  <div className="col-span-3">
                    <h4 className="block mb-2 font-sans text-5xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {room.roomType}
                    </h4>
                    <p className="font-bold text-xl mb-6">
                      {room.price} BHD / per night
                    </p>
                    <h6 className="block mb-4 font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                      Max Children: {room.maxChildren}
                    </h6>
                    <h6 className="block mb-4 font-sans text-xl antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                      Max Adults: {room.maxAdults}
                    </h6>

                    <div>
                      <h6 className="block mb-2 font-sans text-3xl antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                        Amenities
                      </h6>
                      <ul className="list-disc pl-8 text-xl">
                        {room.amenities.map((amenity, index) => (
                          <li key={index} className="mb-2">
                            {amenity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className=" col-span-1 relative  m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border  shrink-0 max-w-fit  ">
                    {room.images && room.images.length > 0 && (
                      <Carousel
                        sx={{ width: 650, paddingRight: 10, marginBottom: 10 }}
                      >
                        {room.images.map((image, index) => (
                          <div className="flex">
                            <img
                              className="object-contain rounded-xl "
                              key={index}
                              src={image}
                            ></img>
                          </div>
                        ))}
                      </Carousel>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {hotel.reviews && hotel.reviews.length > 0 && (
            <div id="reviews">
              <div className="relative flex-column spa bg-clip-border rounded-xl bg-white text-gray-700 shadow-xl  max-w-3xl max-h-96 flex-row mt-10 mb-8 m-auto ">
                <Carousel
                  navButtonsAlwaysVisible={true}
                  navButtonsProps={{
                    style: {
                      backgroundColor: '#d1ded7',
                      opacity: 0.4
                    }
                  }}
                >
                  {hotel.reviews.map((review) => (
                    <div key={review._id} className="text-center pb-10">
                      <p className="text-3xl font-semibold mb-2 mt-6">
                        {review.customerId.name}
                      </p>
                      <div className="mb-2">
                        <Rating value={review.rating} readOnly />
                      </div>
                      <p className="text-lg mb-10">{review.feedback}</p>

                      {isUserReview(review.customerId._id) && (
                        <button onClick={() => deleteReview(review._id)}>
                          <IconButton aria-label="delete">
                            <DeleteIcon style={{ color: '#C70039' }} />
                          </IconButton>
                        </button>
                      )}
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h1 className="text-center text-5xl mt-20 text-lime-600">
            Select a marker to see hotel details
          </h1>
        </div>
      )}
    </div>
  )
}

export default Map
