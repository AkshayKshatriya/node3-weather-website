const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    // console.log('latitude ' +latitude+ ' longitude ' + longitude)
    const url = 'http://api.weatherstack.com/current?access_key=ca284476eb583573bd3452ad1dc76437&query='+latitude+','+longitude+'&units=f'
    const options = {
        url,//object property shorthand
        json: true
    }
    //object desuction response.body -> {body}
    request(options, (error, {body}) => {
        if (error) {
            callback('unable to connect weather service', undefined)
        }
        else if (body.error) {
            callback('unable to find location', undefined)
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0] + 'It is currently ' +
             body.current.temperature + ' kelvin feels like ' + body.current.feelslike + ' kelvin')
        }
    })
}

module.exports = forecast



