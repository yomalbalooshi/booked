import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { GetHotels, ShowHotel } from '../services/Hotels'

import { latLng } from 'leaflet'

const Map = () => {
  const [hotels, setHotels] = useState([])
  // const [hotelId, setHotelId] = useState('')
  const [hotelDetails, setHotelDetails] = useState({})

  useEffect(() => {
    const handleHotels = async () => {
      const data = await GetHotels()
      setHotels(data)
    }

    handleHotels()
  }, [])

  const handleClick = (hotel, e) => {
    const getHotelDetails = async () => {
      let response = await ShowHotel(hotel._id)
      setHotelDetails(response)
    }
    getHotelDetails()
  }
  console.log(hotels)
  console.log('details: ', hotelDetails)
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
              position={[hotel.location.lat, hotel.location.lng]}
            >
              <Popup>
                <p>{hotel.name}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {Object.keys(hotelDetails).length !== 0 && (
        <div>
          <div id="hotelDetails-details">
            <h1>{hotelDetails.name}</h1>
            <p>{hotelDetails.description}</p>
            <p>
              {hotelDetails.location.city},{hotelDetails.location.country}
            </p>

            <img src={hotelDetails.image} alt={hotelDetails.name}></img>
            <h5>Amenities</h5>
            {hotelDetails.amenities && hotelDetails.amenities.length > 0 && (
              <ul>
                {hotelDetails.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            )}
          </div>
          <div id="rooms">
            <h2>Rooms</h2>
            {hotelDetails.rooms &&
              hotelDetails.rooms.length > 0 &&
              hotelDetails.rooms.map((room) => (
                <div id="room" key={room._id}>
                  <p>Room Type: {room.roomType}</p>
                  <p>Max Guests: {room.maxGuests}</p>
                  <p>Price: {room.price} $</p>
                  <h5>Amenities</h5>
                  {room.amenities && room.amenities.length > 0 && (
                    <ul>
                      {room.amenities.map((amenity, index) => (
                        <li key={index}>{amenity}</li>
                      ))}
                    </ul>
                  )}
                  {room.images && room.images.length > 0 && (
                    <div>
                      {room.images.map((image, index) => (
                        <img key={index} src={image}></img>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div id="reviews">
            <h2>Reviews</h2>
            {hotelDetails.reviews &&
              hotelDetails.reviews.length > 0 &&
              hotelDetails.reviews.map((review) => (
                <div key={review._id}>
                  <p>{review.feedback}</p>
                  <p>{review.creationDate}</p>
                  <p>{review.rating}</p>
                </div>
              ))}
          </div>
          <div id="book">
            <button onClick={() => navigate(`/booking/${hotelDetails._id}`)}>
              Booking
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Map
