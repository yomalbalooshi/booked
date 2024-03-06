import { useNavigate } from 'react-router-dom'
// import Carousel from 'react-material-ui-carousel'
import Button from '@mui/material/Button'
import { Player } from 'video-react'
const Home = ({ user }) => {
  let navigate = useNavigate()

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={
          ({ maxHeight: '100vh' },
          { maxWidth: '100vw' },
          { backgroundColor: 'Black' })
        }
      >
        <video
          className="videoTag"
          autoPlay
          loop
          muted
          style={({ height: '100%' }, { width: '100%' }, { opacity: 0.3 })}
        >
          <source
            src={'https://booking-pictures.s3.amazonaws.com/landingpageVid.mp4'}
            type="video/mp4"
          />
        </video>
      </div>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          zIndex: 3,
          top: 0,
          background: 'transparent',
          border: 'none',
          padding: '10%'
        }}
      >
        <p className="font-normal tracking-wider leading-loose text-stone-300 text-center">
          <span className="text-8xl mb-56">Booked</span>
          <br />
          <span className="text-2xl font-thin">
            Get Hooked on Booked – Turning Your Stays into Unforgettable
            Excitement!
          </span>
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}
        >
          <button className="text-stone-200 hover:text-white border border-stone-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-thin rounded-lg text-2xl px-10 py-2.5 text-center me-2 mb-2 dark:border-stone-200 dark:text-stone-200 dark:hover:text-white dark:hover:bg-slate-950 dark:focus:ring-slate-950 mr-40">
            Book Now
          </button>
          <button className="text-stone-200 hover:text-white border border-stone-300 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-thin rounded-lg text-2xl px-10 py-2.5 text-center me-2 mb-2 dark:border-stone-200 dark:text-stone-200 dark:hover:text-white dark:hover:bg-slate-950 dark:focus:ring-slate-950">
            Discover
          </button>
        </div>
        {!user && (
          <div style={{ textAlign: 'center' }}>
            <Button
              onClick={() => {
                navigate('/companylogin')
              }}
              variant="outlined"
              color="success"
            >
              Company Log In
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home
