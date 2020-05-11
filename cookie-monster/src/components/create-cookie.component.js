import React, { Component } from 'react';
import axios from 'axios'; // axios helps us contact the backend
import { Redirect } from "react-router-dom";

export default class CreateCookie extends Component {

    constructor(props) {
        super(props);

        this.onChangeName = this.onChangeName.bind(this); // we need to bind the 'this' keyword so that when we use it in the methods below React knows which this we're referring to
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeCost = this.onChangeCost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = { // we handle variables like this in react, we wouldn't do let name = "cedric" for example, whenever we update the state it will update the page with new values
                        // the only time we create variables outside of state is if we only need them within a method like we will see below
            name: '',
            description: '',
            cost: '',
        }
    }

    onChangeName(e) {
        this.setState({ // always use setState to edit values
            name: e.target.value // the target is the textbox
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeCost(e) {
        this.setState({
            cost: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault(); // prevent the default html form submit behavior from taking place, instead do what we define below

        const cookie = {
            name: this.state.name,
            description: this.state.description,
            cost: this.state.cost,
        }

        console.log(cookie);

        axios.post('http://localhost:5000/cookies/add', cookie) // use axios to access the backend endpoint and then use a promise to get the results and log it to the console
            .then(res => console.log(res.data));


        this.setState({
            redirect: true
        });

    }



    render() {
        const {redirect} = this.state;
        if(redirect) {
            return <Redirect push to="/"/>
        }
        return (
            <div>
                <h3>Create New Cookie</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Cost (ex: 1.99): </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.cost}
                            onChange={this.onChangeCost}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Cookie" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}