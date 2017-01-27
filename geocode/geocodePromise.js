const request = require('request');



var geocodeAddress = ( address ) => {
  return new Promise((resolve, reject) => {
    request( {
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent( address )}`,
      json: true
     }, ( error, response, body ) => {
      //console.log(JSON.stringify(body, undefined, 2));
      debugger;
      if ( error ) {
        reject('Unable to connect to Google Servers.');
      } else if ( body.status === 'ZERO_RESULTS' ) {
        reject('Unable to find that address.');
      }
      else if ( body.status === 'OK' ){
        resolve(  {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }

    });

  });
}

/* Sample example
geocodeAddress( '708 Emilio Carranza N.L.' )
  .then((res) => {
    console.log(res);
  })
  .catch((errorMessage) => {
    console.log(errorMessage);
  });
*/

  module.exports = {
    geocodeAddress,
  }
