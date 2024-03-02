import './About.css'
import { render } from '@react-email/render'
import axios from 'axios'
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

//  ---------------------
// handleSubmit(event)
// const About = () => {
//   const sendTestMail = async () => {
//     var transport = nodemailer.createTransport({
//       host: 'sandbox.smtp.mailtrap.io',
//       port: 2525,
//       auth: {
//         user: 'bb03a9478dca66',
//         pass: 'dbb6b2a1be929d'
//       }
//     })

//     const emailHtml = render(<TestEmail url="https://example.com" />)

//     const options = {
//       from: 'you@example.com',
//       to: 'user@gmail.com',
//       subject: 'hello world',
//       html: emailHtml
//     }

//     await transport.sendMail(options)
// }
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
        <div>
          <label htmlFor="name">Company Name</label>
          <input type="text" id="name" name="name" placeholder="company name" />
          <label htmlFor="name">Emai</label>
          <input type="text" id="email" name="email" placeholder="Email" />
          <label htmlFor="messsage">Message</label>
          <textarea
            type="text"
            id="message"
            name="message"
            placeholder="Message"
          ></textarea>
          <button onClick={() => handleSubmit()}>Send</button>
        </div>
      </section>
    </div>
  )
}

export default About
