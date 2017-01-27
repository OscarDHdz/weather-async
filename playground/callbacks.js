var getUser = ( id, callback ) => {
  var user = {
    id: 55,
    name: 'Oscar'
  };

  setTimeout( () => {
    callback(user);
  }, 3000);

};

getUser( 11, ( userData ) => {
  console.log(userData);
});
