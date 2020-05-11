const router = require('express').Router(); // we need the base router code
let Cart = require('../models/cart.model');
let ObjectId = require('mongoose').Types.ObjectId;

router.route('/get').get((req, res) => { // route the empty URL to show the shopping cart
    console.log("call to get method");
    const cartId = new ObjectId("5eb47a530e692ec48acaddbc");
    Cart.findById(cartId) // .find() is a mongoose method that will return a promise for the results in json format
        .then(cart => {
            // console.log(cart);
            res.json(cart);
        }) // return the cart object
        .catch(err => res.status(400).json('Error: ' + err)); // return the error
});

router.route('/add').post((req, res) => { // route the /add URL to add a new ID to the cart
    const id = req.body.id; // get the ID from the body
    // Cart.exists()
    //     .then(response => {console.log(response)})
    //     .catch(err => { console.log(err) });
    const cartId = new ObjectId("5eb47a530e692ec48acaddbc");
    Cart.findById(cartId) // get the cart reference
        .then(cartRef => {
            // console.log(cartRef);
            let cartArr = cartRef["cart"];
            cartArr.push(id.toString()); // append the ID to the list of cookies in our cart
            cartRef["cart"] = cartArr;
            // console.log(cartRef);
            cartRef.save() // save to the database
                .then(() => {
                    console.log("successful save")
                    // res.json('Cart updated!')
                })
                .catch(err => {
                    console.log("error saving")
                    res.status(400).json('Error saving: ' + err)
                });
            res.send();
        })
        .catch(err => {
            console.log("error finding: " + err);
            res.status(400).json('Error finding: ' + err);
            res.send();
        });
});

router.route('/remove').post((req, res) => {
    const id = req.body.id;
    const cartId = new ObjectId("5eb47a530e692ec48acaddbc");

    Cart.findById(cartId)
        .then(cartRef => {
            const indexToRemove = cartRef["cart"].indexOf(id); // get the first occurance of the item in the cart we should remove
            cartRef["cart"].splice(indexToRemove, 1); // remove one element at the indexToRemove
            cartRef.save() // save to the database
                .then(() => res.json('Cart Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; // standard code for router file
