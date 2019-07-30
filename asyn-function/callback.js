 console.log('Start');
getUser(1, (user) => {
    console.log(user);
});
 console.log('Before');

 function getUser(id, callback) {
     setTimeout(()=> {
       console.log('Reading a user from database');
       callback({id: id, name: 'azmul'});
     }, 1000)
 }