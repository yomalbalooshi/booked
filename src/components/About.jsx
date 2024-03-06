import './About.css'
import axios from 'axios'
import MailSendForm from './MailSendForm'

const handleSubmit = (event) => {
  const messageHtml = 'test message html'

  axios({
    method: 'POST',
    url: 'http://localhost:3000/mail/send',
    data: {
      name: 'Amir',
      email: 'aamir@mail.com',
      messageHtml: messageHtml
    }
  }).then((response) => {
    if (response) {
    }
  })
}

const About = () => {
  return (
    <div>
      <div className="shadow-md">
        <h2 className="mt-10 font-normal text-4xl ml-5">About Us:</h2>
        <p className="mt-5 font-light text-xl ml-5 leading-loose p-6 ">
          Welcome to Booked, your gateway to seamless and unforgettable travel
          experiences. We understand that every journey begins with a perfect
          stay, and that's why we've crafted a hotel booking platform that
          prioritizes simplicity, variety, and unmatched convenience.
        </p>
      </div>
      <div className="shadow-md">
        <h2 className="mt-10 font-normal text-4xl ml-5">Our Story:</h2>
        <p className="mt-5 font-light text-xl ml-5 leading-loose p-6 ">
          At Booked, we believe in the transformative power of travel. Whether
          you're embarking on a business trip, a romantic getaway, or a family
          vacation, the right accommodation sets the tone for a remarkable
          experience. Our journey began with a passion for making travel
          accessible to everyone, and we've since evolved into a trusted
          platform that connects travelers with their ideal lodgings.
        </p>
      </div>
      <div className="shadow-md">
        <h2 className="mt-10 font-normal text-4xl ml-5">What Sets Us Apart?</h2>
        <p className="mt-5 font-light text-xl ml-5 leading-loose pl-6 pr-6 ">
          1. User-Friendly Interface: Navigating through Booked is a breeze. Our
          intuitive interface ensures that booking your perfect stay is a
          stress-free and enjoyable process.
        </p>
        <p className="mt-1 font-light text-xl ml-5 leading-loose pl-6 pr-6 ">
          2. Wide Range of Options: We understand that each traveler is unique,
          and so are their accommodation preferences. With Booked, you gain
          access to an extensive selection of hotels, ranging from
          budget-friendly to luxurious, ensuring there's something for every
          taste and budget.
        </p>
        <p className="mt-1 font-light text-xl ml-5 leading-loose pl-6 pr-6 pb-6 ">
          3. Secure Booking Process: Your privacy and security are our top
          priorities. Rest easy knowing that your personal information is
          handled with the utmost care through our secure booking process.
        </p>
      </div>
      <div className="shadow-md">
        <h2 className="mt-10 font-normal text-4xl ml-5">Our Vision:</h2>
        <p className="mt-5 font-light text-xl ml-5 leading-loose p-6 ">
          Booked envisions a world where travel is not just a journey but an
          enriching experience. We strive to be the go-to platform for travelers
          seeking not just a place to stay, but a home away from home. With a
          commitment to innovation and customer satisfaction, we aim to redefine
          the way you plan and book your accommodations.
        </p>
      </div>
      <div className="shadow-md">
        <h2 className="mt-10 font-normal text-4xl ml-5">
          Join Us on Your Next Adventure:
        </h2>
        <p className="mt-5 font-light text-xl ml-5 leading-loose p-6 ">
          Embark on your next adventure with Booked and discover a world of
          possibilities. Whether you're exploring a new city, relaxing by the
          beach, or immersing yourself in cultural wonders, we're here to ensure
          that your accommodation is as extraordinary as your journey.
        </p>
      </div>
      <div className="shadow-md">
        <h2 className="mt-10 font-normal text-4xl ml-5">
          Want to Feature your hotels with us?
        </h2>
        <section>
          <MailSendForm />
        </section>
      </div>
    </div>
  )
}

export default About
