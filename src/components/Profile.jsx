import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button
        onClick={() => {
          navigate('/updateprofile')
        }}
      >
        Update Profile
      </button>
    </div>
  )
}
export default Profile
