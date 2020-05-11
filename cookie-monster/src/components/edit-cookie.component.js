import React, { Component } from 'react';
import axios from 'axios';

export default class EditCookie extends Component {
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

    componentDidMount() { // This is a React lifecycle method (remember the Android lifecycle?)
        // this method will automatically be called right before anything displays on the page

        axios.get('http://localhost:5000/cookies/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                    cost: response.data.cost,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onChangeName(e) {
        this.setState({ // always use setState to edit values
            name: e.target.value // the target is the textbox
        });
    }

    onChangeDescription(e) {
        this.setState({ // always use setState to edit values
            description: e.target.value // the target is the textbox
        });
    }

    onChangeCost(e) {
        this.setState({ // always use setState to edit values
            cost: e.target.value // the target is the textbox
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

        axios.post('http://localhost:5000/cookies/update/' + this.props.match.params.id, cookie)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Edit Cookie</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}/>
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
                        <input type="submit" value="Edit Cookie" className="btn btn-primary"></input>
                    </div>
                </form>
            </div>
        );
    }
}