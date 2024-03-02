import { useNavigate } from 'react-router-dom'

const HotelCard = ({ hotel }) => {
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

  return (
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
}
export default HotelCard
