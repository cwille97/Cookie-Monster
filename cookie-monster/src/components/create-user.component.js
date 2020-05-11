import React, { Component } from 'react';
import axios from 'axios'; // axios helps us contact the backend

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this); // we need to bind the 'this' keyword so that when we use it in the methods below React knows which this we're referring to
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { // we handle variables like this in react, we wouldn't do let name = "cedric" for example, whenever we update the state it will update the page with new values
                        // the only time we create variables outside of state is if we only need them within a method like we will see below
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({ // always use setState to edit values
            username: e.target.value // the target is the textbox
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevent the default html form submit behavior from taking place, instead do what we define below

        const user = {
            username: this.state.username,
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user) // use axios to access the backend endpoint and then use a promise to get the results and log it to the console
            .then(res => console.log(res.data));


        this.setState({
            username: ''
        })
    }



    render() {
        return (
            <div>
                <h3>Create New User</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}