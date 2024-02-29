import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()
  return (
    <div>
      {' '}
      Home
      <button
        onClick={() => {
          navigate('/companylogin')
        }}
      >
        company login
      </button>
    </div>
  )
}
export default Home
