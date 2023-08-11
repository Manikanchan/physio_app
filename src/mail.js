const nodemailer = require('nodemailer')
const mailGun = require('nodemailer-mailgun-transport')

const auth = {
  auth: {
    api_key: '114b8a35109f9e5083b2bd4037f20881-75cd784d-8362158d',
    domain: 'sandboxd59ac7c77ce8457fa9627b1689f4ee38.mailgun.org'
  }
}

const transporter = nodemailer.createTransport(mailGun(auth))

const sendMail = (email, subject, text, cb) => {

  const mailOptions = {
    from: email,
    to: 'avancephysiotherapy@gmail.com',
    subject,
    text
  }
  
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      cb(err, null)
    } else {
      cb(null, data)
    }
  
  })

}

module.exports = sendMail;

