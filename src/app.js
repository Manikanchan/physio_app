const sendMail = require('./mail.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Data parsing -- form

app.use (express.urlencoded({extended : false}))
app.use (express.json())
app.post('/appointment', (req,res) => {
    //send email here
    const {email, subject, text} = req.body
    console.log('Data: ', req.body)
    sendMail(email, subject, text, (err, data) => {
        if (err) {
            res.status(500).json({message: 'Internal error'})
        } else {
            res.json({message : 'Email sent!!'})
        }
    })
})

app.get('', (req, res) => {
    res.render('index')
})

app.get('/contacts', (req, res) => {
    res.render('contacts' , {
        title : 'Contact info'
    })
})

app.get('/patients_corner', (req, res) => {
    res.render('patientsCorner' , {
        title : 'Informantion to be provided to patient'
    })
})

app.get('/services', (req, res) => {
    res.render('services' , {
        title : 'Services to be provided to patient'
    })
})

app.get('/appointment', (req, res) => {
    res.render('appointment' , {
        title : 'appointment facility'
    })
})



app.get('*', (req, res) => {
    res.render('404' , {
        errorMessage : 'Error 404!'
    })
})



// app.get('/help', (req, res) => {
//     res.send('Help page')
// })

// app.get('/about', (req, res) => {
//     res.send('About')
// })

// app.get('/weather', (req, res) => {
//     res.send('Your weather')
// })

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})