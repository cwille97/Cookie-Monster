import React, { Component } from 'react';
import axios from 'axios';

const Cookie = props => ( // functional component doen't have a constructor
    <tr>
        <td>{props.cookie.name}</td>
        <td>{props.cookie.description}</td>
        <td>${props.cookie.cost}</td>
        <td>
            <a href="#" onClick={() => { props.removeItem(props.cookie._id) }}>Remove</a>
        </td>
    </tr>
)

export default class Cart extends Component {

    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this);
        this.getTotal = this.getTotal.bind(this);
        

        this.state = {cart: [], cookies: []}
    }

    componentDidMount() { // get our cookie data when the page is loading
        axios.get('http://localhost:5000/cart/get')
            .then(response => {
                this.setState({ cart: response.data["cart"] })
                console.log(this.state);
                this.populateCookies();
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    populateCookies() {
         this.state.cart.forEach(item => {
             if (item != "") {
                axios.get('http://localhost:5000/cookies/' + item)
                    .then(res => {
                        let tempData = this.state.cookies;
                        tempData.push(res);
                        this.setState({ cookies: tempData });
                    })
                    .catch(err => console.log(err));
             }
         });
    }

    getTotal() {
        let total = 0;
        this.state.cookies.forEach(cookie => {
            total += parseFloat(cookie.data.cost); // sum the costs
        })
        return <p>Total: ${Math.round(total * 100) / 100}</p> // formatting for money
    }

    removeItem(cookie_id) { // remove item from the cart
        const body = {
            id: cookie_id
        }

        axios.post('http://localhost:5000/cart/remove', body)
            .then(res => console.log(res.data));
        window.location.reload();
    }

    cookieList() {
        return this.state.cookies.map(currentcookie => {
            // console.log("current cookie: " + currentcookie.data.name);
            return <Cookie cookie={currentcookie.data} removeItem={this.removeItem} key={Math.random()}/>; // create a custom cookie 
        }); 
    } 
    

    render() {
        return ( 
            <div>
                <h3>Cookies</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                    { this.cookieList() }
                    </tbody>
                </table>
                { this.getTotal() }
            </div>
        );
    }
}