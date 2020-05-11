const router = require('express').Router(); // we need the base router code
let User = require('../models/user.model');

router.route('/').get((req, res) => { // route the empty URL to lookup the user
    User.find() // .find() is a mongoose method that will return a promise for the results in json format
        .then(users => res.json(users)) // return the user
        .catch(err => res.status(400).json('Error: ' + err)); // return the error
});

router.route('/add').post((req, res) => { // route the /add URL to add a new user
    const username = req.body.username; // username for the new user

    const newUser = new User({username}); // create a new User object

    newUser.save() // save the user to the database
        .then(() => res.json('User added!')) // report that the user was added
        .catch(err => res.status(400).json('Error: ' + err)); // return an error
});

module.exports = router; // standard code for router file

// video timestamp 26:04