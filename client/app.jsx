'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var ShopperForm = require('./components/form.jsx');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var AppContinue = require('./components/AppContinue.jsx');
var hashHistory = require('react-router').hashHistory;

var Main = React.createClass({

    render: function() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Carrot</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav bsStyle="pills" activeKey={1} pullRight>
                        <NavItem eventKey={1} href="https://www.instacart.com">Get groceries delivered!</NavItem>
                    </Nav>
                    <Navbar.Text pullRight>Not interested in being a shopper? </Navbar.Text>
                </Navbar>

                <ShopperForm />
            </div>
        );
    }
});

var CarrotApp = React.createClass({
    render: function() {
        return (
            <Router history={hashHistory}>
                <Route path='/' component={Main} />
                <Route path='/continue' component={AppContinue} />
            </Router>
        );
    }
});

ReactDOM.render(<CarrotApp/>, document.getElementById('app'));