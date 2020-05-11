const router = require('express').Router(); // we need the base router code
let Cookie = require('../models/cookie.model');

router.route('/').get((req, res) => { // route the empty URL to lookup the cookie
    // console.log("get cookies");
    Cookie.find() // .find() is a mongoose method that will return a promise for the results in json format
        .then(cookies => res.json(cookies)) // return the cookie
        .catch(err => res.status(400).json('Error: ' + err)); // return the error
});

router.route('/add').post((req, res) => { // route the /add URL to add a new cookie
    const name = req.body.name; 
    const description = req.body.description;
    const cost = req.body.cost;
    const isFavorite = false;

    const newCookie = new Cookie({name, description, cost, isFavorite}); // create a new Cookie object

    newCookie.save() // save the cookie to the database
        .then(() => res.json('Cookie added!')) // report that the cookie was added
        .catch(err => res.status(400).json('Error: ' + err)); // return an error
});

router.route('/:id').get((req, res) => { // get a specific cookie
    console.log(req.params.id);
    Cookie.findById(req.params.id)
        .then(cookie => res.json(cookie))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { // delete a cookie by ID
    Cookie.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json('Cookie deleted.')
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { // update a cookie
    Cookie.findById(req.params.id)
        .then(cookie => {
            console.log('made it so far');
            cookie.name = req.body.name;
            cookie.description = req.body.description
            cookie.cost = req.body.cost;
            if (req.body.isFavorite != null) { // if this request included an isFavorite value
                cookie.isFavorite = req.body.isFavorite;
            }

            cookie.save()
                .then(() => res.json('Cookie updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; // standard code for router file
