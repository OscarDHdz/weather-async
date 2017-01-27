const request = require('request');

var getTemperature = ( latitude, longitude ) => {
  return new Promise( ( resolve, reject ) => {

    request({
      url: `https://api.darksky.net/forecast/4c8c1e6f271731cde663bd691663a8e0/${latitude},${longitude}`,
      json: true
    }, (error, response, body ) => {
      if ( !error && response.statusCode === 200 ){
        resolve( {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
      else {
        reject('Unable to fecth weather');
      }
    });

  });
}

/* Sample Example
getTemperature( 25.6812464, -100.3107045 )
  .then((res) => {
    console.log(res);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });
*/

module.exports = {
  getTemperature
}
