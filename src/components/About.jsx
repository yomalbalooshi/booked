import './About.css'
// import { render } from '@react-email/render'
import axios from 'axios'
import MailSendForm from './MailSendForm'
// import nodemailer from 'nodemailer'
// import TestEmail from './TestMail'
// ----------------

const handleSubmit = (event) => {
  // const messageHtml = renderEmail(
  //   <MyEmail name={this.state.name}>{this.state.feedback}</MyEmail>
  // )

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
      console.log('response is ==> ', response)
    }
  })
}

const About = () => {
  return (
    <div>
      <h2>About Us:</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sint
        fugit culpa officiis? Quia sapiente saepe corporis deserunt aliquid
        rerum tenetur ea dignissimos, ipsa debitis, repellendus exercitationem
        eaque in obcaecati?
      </p>
      <h2>Our Mission:</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sint
        fugit culpa officiis? Quia sapiente saepe corporis deserunt aliquid
        rerum tenetur ea dignissimos, ipsa debitis, repellendus exercitationem
        eaque in obcaecati?
      </p>
      <h2>Whty Choose Book-A-Stay:</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sint
        fugit culpa officiis? Quia sapiente saepe corporis deserunt aliquid
        rerum tenetur ea dignissimos, ipsa debitis, repellendus exercitationem
        eaque in obcaecati?
      </p>
      <h2>Want to Feature your hotels with us?</h2>
      <section>
        <div>Contact Us</div>
        <MailSendForm />
      </section>
    </div>
  )
}

export default About
