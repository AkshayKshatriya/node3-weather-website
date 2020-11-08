const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const request = require('postman-request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname, '../public'))

//for html in public folder
// app.get('/help', (req, res) => {
//     res.send([{
//         name : 'akshay'
//     }])
// })

//define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Spiderman',
        name: "Peter Parker"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Peter Parker'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Peter Parker",
        helptext: 'some help'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide address!'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Peter Parker',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Peter Parker',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})