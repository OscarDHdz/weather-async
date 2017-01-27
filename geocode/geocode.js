const request = require('request');


var geocodeAddress = ( address, callback ) => {
  request( {
    url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent( address )}`,
    json: true
   }, ( error, response, body ) => {
    //console.log(JSON.stringify(body, undefined, 2));
    debugger;
    if ( error ) {
      callback('Unable to connect to Google Servers.');
    } else if ( body.status === 'ZERO_RESULTS' ) {
      callback('Unable to find that address.');
    }
    else if ( body.status === 'OK' ){
      callback( undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }

  });

};
var miFuncion = function ( a , b ) {
  hola = 5;
  asd = 0;
};
var miFuncion = ( a , b ) => {
  hola = 5;
  asd = 0;
};
var miFuncion =  ( a , b ) =>  asd === 0 ;





module.exports = {
  geocodeAddress,
}
