import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";// react router makes it easier to route different urls to different react components
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import EditCookie from "./components/edit-cookie.component";
import CreateCookie from "./components/create-cookie.component";
import Cart from "./components/cart.component";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Navbar />
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/edit/:id" component={EditCookie} />
        <Route path="/create" component={CreateCookie} />
        <Route path="/cart" component={Cart} />
      </div>
    </Router>
    
  );
}

export default App;
