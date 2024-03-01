import { useNavigate } from 'react-router-dom'

const Home = ({ user }) => {
  let navigate = useNavigate()
  return (
    <div>
      {' '}
      Home
      {!user && (
        <button
          onClick={() => {
            navigate('/companylogin')
          }}
        >
          company login
        </button>
      )}
    </div>
  )
}
export default Home
