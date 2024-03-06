import { useNavigate } from 'react-router-dom'

const HotelCard = ({
  hotel,
  user,
  hotelId,
  handleDeleteHotel,
  handleUpdateHotel
}) => {
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
  console.log(user)
  return (
    Object.keys(hotel).length !== 0 && (
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
              {' '}
              {(basePrice() && `${basePrice()} BHD`) || 'Unspecified price'}
            </p>

            <button
              className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block max-w-full absolute bottom-10"
              type="button"
              onClick={() => {
                navigate(`/hotels/${hotel._id}`)
              }}
            >
              View Hotel Details
            </button>
            {user && user.type === 'company' && (
              <div>
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block max-w-full absolute bottom-10 right-40 mr-12"
                  type="button"
                  onClick={(e) => handleDeleteHotel(e, hotelId)}
                >
                  Delete
                </button>
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block max-w-full absolute bottom-10 right-60 mr-20"
                  type="button"
                  onClick={(e) => handleUpdateHotel(e, hotel)}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )
}
export default HotelCard
