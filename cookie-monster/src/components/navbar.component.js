import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">🍪 Cookie Monster</Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/cart" className="nav-link">Cart</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">New Cookie</Link>
                        </li>
                    </ul>
            </nav>
        );
    }
}