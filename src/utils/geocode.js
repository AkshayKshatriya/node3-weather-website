const request = require('postman-request')

const geocode = (address, callback) => {
    const mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWtzaGF5LWdhd2FkZSIsImEiOiJja2g3cnd6bHMwbmxxMnBvNTY2dnRhcXYzIn0.lOpKpnd7B3t2Cb312L_nBw&limit=1'
    const mapboxOptions = {
        url: mapboxUrl,
        json: true
    }
    request(mapboxOptions, (error, {body}) => {
        if (error) {
            callback('unable to connect location services!', undefined)
        }
        else if (body.features.length == 0) {
            callback('no matching location', undefined)
        }
        else {
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
}


module.exports = geocode