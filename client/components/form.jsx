'use strict';

var React = require('react');
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var ControlLabel = require('react-bootstrap').ControlLabel;
var Button = require('react-bootstrap').Button;
var $ = require('jquery');
var hashHistory = require('react-router').hashHistory

var LeftColumnForm = React.createClass({
    render: function() {
        return (
            <div className="left-col-form">
                <img className="img-circle" src="./images/carrot.png" />
                <h3>Let's get you started!</h3>
            </div>
        );
    }
});

var RightColumnForm = React.createClass({
    getInitialState: function() {
        return {
            first: '',
            last: '',
            email: '',
            phone: ''
        };
    },

    validateText: function(e) {
        if (/^[a-zA-Z]*$/g.test(e)) {
            return 'success';
        }

        return 'error';
    },

    getFirstValidationState: function() {
        if (this.state.first.length > 0) {
            return this.validateText(this.state.first);
        }
    },

    getLastValidationState: function() {
        if (this.state.last.length > 0) {
            return this.validateText(this.state.last);
        }
    },

    checkEmail: function(email) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(email)) {
            return 'success';
        }

        return 'error';
    },

    getEmailValidationState: function() {
        if (this.state.email.length > 0) {
            return this.checkEmail(this.state.email);
        }
    },

    checkPhone: function(phone) {
        if (phone.match(/\d/g) && phone.length === 10) {
            return 'success';
        }

        return 'error';
    },

    getPhoneValidationState: function() {
        if (this.state.phone.length > 0) {
            return this.checkPhone(this.state.phone);
        }
     },

    handleFirstChange: function(e) {
        this.setState({ first: e.target.value });
    },

    handleLastChange: function(e) {
        this.setState({ last: e.target.value });
    },

    handleEmailChange: function(e) {
        this.setState({ email: e.target.value });
    },

    handlePhoneChange: function(e) {
        this.setState({ phone: e.target.value });
    },

    allRequiredValuesAreNotEmpty: function() {
        var currentState = this.state;
        if (currentState.first == null || currentState.first.length == 0 ||
            currentState.last == null || currentState.last.length == 0 ||
            currentState.phone == null || currentState.phone.length == 0 ||
            currentState.email == null || currentState.email.length == 0) {
            return false;
        }

        return true;
    },

    handleSubmit: function(event) {
        event.preventDefault();

        var self = this;

        if (!self.allRequiredValuesAreNotEmpty() ||
                self.checkEmail(self.state.email) !== 'success' ||
                self.checkPhone(self.state.phone) !== 'success') {
            alert("Please make sure all the values are correctly filled");
            return;
        }

        $.ajax({
            url: '/api/v1/application',
            type: 'POST',
            data: {
                first: self.state.first,
                last: self.state.last,
                email: self.state.email,
                phone: self.state.phone
            },
            success: function() {
                hashHistory.push('/continue');
            }
        });
    },

    render: function() {
        return (
            <div className="right-col-form">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup
                        controlId="formControlsFirst"
                        validationState={this.getFirstValidationState()}>
                        <ControlLabel>First Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.first}
                            placeholder="Enter first name"
                            onChange={this.handleFirstChange} />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup
                        controlId="formControlsLast"
                        validationState={this.getLastValidationState()}>
                        <ControlLabel>Last Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.last}
                            placeholder="Enter last name"
                            onChange={this.handleLastChange} />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup
                        controlId="formBasicEmail"
                        validationState={this.getEmailValidationState()}>
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.email}
                            placeholder="Enter text"
                            onChange={this.handleEmailChange}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup
                        controlId="formControlsPhone"
                        validationState={this.getPhoneValidationState()}>
                        <ControlLabel>Mobile Phone</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.phone}
                            placeholder="Enter phone number"
                            onChange={this.handlePhoneChange} />
                        <FormControl.Feedback />
                    </FormGroup>

                    <Button type="submit">
                        Continue
                    </Button>
                </form>
            </div>
        );
    }
});

var ShopperForm = React.createClass({
    render: function() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={6} className="text-center form-col">
                            <LeftColumnForm />
                        </Col>
                        <Col md={6} className="text-center form-col">
                            <RightColumnForm />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = ShopperForm;