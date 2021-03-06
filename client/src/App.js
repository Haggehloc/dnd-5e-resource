import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import homepage from "./components/homepage/Homepage";
import Footer from "./components/layout/footer";
import Header from "./components/layout/homepageHeader";

import "./App.css";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <div className="container">
                            <Header />
                            <Route exact path="/" component={homepage} className='homepage' />
                            <Footer />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;