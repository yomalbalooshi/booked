import { useNavigate } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel'
import Button from '@mui/material/Button'

const Home = ({ user }) => {
  let navigate = useNavigate()
  const images = [
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ]
  return (
    <div>
      {/* <Carousel>
        {images.map((image, index) => (
          <img className="home-image" key={index} src={image}></img>
        ))}
      </Carousel> */}
      {!user && (
        // <button
        //   onClick={() => {
        //     navigate('/companylogin')
        //   }}
        // >
        //   company login
        // </button>
        <div style={{ textAlign: 'center', marginTop: 15 }}>
          <Button
            onClick={() => {
              navigate('/companylogin')
            }}
            variant="contained"
            color="success"
          >
            Company Log In
          </Button>
        </div>
      )}
    </div>
  )
}
export default Home
