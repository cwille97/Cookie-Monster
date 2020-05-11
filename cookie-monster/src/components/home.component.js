import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdFavoriteBorder } from 'react-icons/md';
import  { MdFavorite } from 'react-icons/md';

const Cookie = props => ( // functional component doen't have a constructor
    <tr>
        <td>{props.cookie.name}</td>
        <td>{props.cookie.description}</td>
        <td>${props.cookie.cost}</td>
        <td><a href="" id="favorite" onClick={() => props.favoriteChange(props.cookie)}>{(props.cookie.isFavorite) ? <MdFavorite/> : <MdFavoriteBorder/>}</a></td>
        <td>
            <Link to={"/edit/" + props.cookie._id}>edit</Link> | <a href="#" onClick={() => props.deleteCookie(props.cookie._id) }>delete</a> | <a href="#" onClick={() => { props.addToCart(props.cookie._id) }}>Add To Cart</a>
        </td>
    </tr>
)

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.favoriteChange = this.favoriteChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.deleteCookie = this.deleteCookie.bind(this);
        
        
        

        this.state = {cookies: []}
    }

    componentDidMount() { // get our cookie data when the page is loading
        axios.get('http://localhost:5000/cookies/')
            .then(response => {
                this.setState({ cookies: response.data })
                console.log(this.state);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    addToCart(cookie_id) {
        const body = {
            id: cookie_id
        }
        axios.post('http://localhost:5000/cart/add', body)
            .then(response => {
                window.alert("Added to cart!");
            })
            .catch((error) => {
                console.log(error);
                window.alert("error adding to cart!");
            });
    }

    deleteCookie(cookie_id) {
        const verify = window.confirm("Are you sure you want to delete this?");
        if (verify) {
            axios.delete('http://localhost:5000/cookies/' + cookie_id)
            .then(res => console.log(res.data));

        const body = {
            id: cookie_id
        }
        // also delete the cookie from the cart so we don't get any errors over there
        axios.post('http://localhost:5000/cart/remove/', body)
            .then(res => console.log(res.data));
            
        this.setState({ // when a cookie is deleted we should remove it from our cookies home page
            cookies: this.state.cookies.filter(el => el._id !== cookie_id) // filter for every element el where the id !== id and return just those ones
        }) // so basically we filter to get only the cookies we want and set those as the state; the reason we have _id is because mongoDB uses _id in the database
        }
        
    }

    favoriteChange(cookie) {
        const newCookie = {
            name: cookie.name,
            description: cookie.description,
            cost: cookie.cost,
            isFavorite: !cookie.isFavorite,
        }


        axios.post('http://localhost:5000/cookies/update/' + cookie._id, newCookie)
            .then(res => console.log(res.data));
    }

    cookieList() {
        return this.state.cookies.map(currentcookie => {
            return <Cookie cookie={currentcookie} favoriteChange={this.favoriteChange} deleteCookie={this.deleteCookie} addToCart={this.addToCart} key={currentcookie._id}/>; // create a custom cookie 
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
                            <th>Favorite?</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.cookieList() }
                    </tbody>
                </table>
            </div>
        );
    }
}