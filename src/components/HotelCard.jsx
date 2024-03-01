import { useNavigate } from 'react-router-dom'

const HotelCard = ({ hotel, priceRange, checkedAmenities }) => {
  let navigate = useNavigate()
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
  const getAmenities = () => {
    let amenities = []
    hotel.amenities &&
      hotel.amenities.length > 0 &&
      hotel.amenities.forEach((amenity) => {
        amenities.push(amenity)
      })
    return amenities
  }
  const amenityFilter = () => {
    if (checkedAmenities.length === 0) {
      return true
    }
    let result = false
    getAmenities().forEach((amenity) => {
      if (checkedAmenities.includes(amenity)) {
        result = true
      }
    })
    return result
  }

  return (
    basePrice() >= priceRange &&
    amenityFilter() && (
      <div>
        <h1>{hotel.name}</h1>
        <p>{hotel.description}</p>
        <p>{hotel.location}</p>
        <img src={hotel.img} alt={hotel.name}></img>
        <h5>Amenities</h5>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <ul>
            {hotel.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        )}
        <p>Price: {basePrice()}</p>
        <button
          onClick={() => {
            navigate(`/hotels/${hotel._id}`)
          }}
        >
          View Details
        </button>
      </div>
    )
  )
}
export default HotelCard
