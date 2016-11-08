var React = require('react');
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Tabs = require('react-bootstrap').Tabs;
var Tab = require('react-bootstrap').Tab;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var FormGroup = require('react-bootstrap').FormGroup;
var Checkbox = require('react-bootstrap').Checkbox;
var Button = require('react-bootstrap').Button;
var Radio = require('react-bootstrap').Radio;
var ControlLabel = require('react-bootstrap').ControlLabel;
var $ = require('jquery');

var ApplicationDialog = React.createClass({

    getInitialState: function() {
        return {
            key: "first",
            legalAge: false,
            youLift: false,
            workPermit: false,
            carOwner: false,
            currentTab: ''
        };
    },

    nextState: function() {
        var current = this.state.key;

        switch (current) {
            case "first":
                this.setState({key: "second"});
                return;

            case "second":
                this.setState({key: "third"});
                return;

            default:
                return;

        }
    },

    handleOnSelect: function() {
        this.setState({currentTab: this.state.key});
    },

    updateApplication: function() {
        var self = this;
        var url = '/api/v1/application/' + self.props.applicationId;
        $.ajax({
            url: url,
            type: 'PUT',
            data: {
                legalAge: self.state.legalAge,
                youLift: self.state.youLift,
                workPermit: self.state.workPermit,
                carOwner: self.state.carOwner,
                workflowState: "2"
            },
            success: function() {
                self.nextState();
            }
        });
    },

    handleAgeBox: function() {
        this.setState({legalAge: !this.state.legalAge});
    },

    handleLiftBox: function() {
        this.setState({youLift: !this.state.youLift});
    },

    handlePermitBox: function() {
        this.setState({workPermit: !this.state.workPermit});
    },

    isCarOwner: function() {
        this.setState({carOwner: true});
    },

    isNotCarOwner: function() {
        this.setState({carOwner: false});
    },

    render: function() {
        return (
            <div id="continue-form">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first" activeKey={this.state.key} onSelect={this.handleOnSelect}>
                    <Row className="clearfix">
                        <Col sm={4}>
                            <Nav bsStyle="pills" stacked>
                                <NavItem eventKey="first" disabled={this.state.key != "first"}>
                                    Eligibility
                                </NavItem>
                                <NavItem eventKey="second" disabled={this.state.key != "second"}>
                                    Other Criteria
                                </NavItem>
                                <NavItem eventKey="third" disabled={this.state.key != "third"}>
                                    Follow Up!
                                </NavItem>
                            </Nav>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content animation>
                                <Tab.Pane eventKey="first">
                                    <FormGroup>
                                        <Checkbox onChange={this.handleAgeBox}>
                                            You are 18 or over
                                        </Checkbox>
                                        {' '}
                                        <Checkbox onChange={this.handleLiftBox}>
                                            You are able to bench press 225 lbs without a spotter
                                        </Checkbox>
                                        {' '}
                                        <Checkbox onChange={this.handlePermitBox}>
                                            You are eligible to work in the United States
                                        </Checkbox>
                                    </FormGroup>
                                    <Button onClick={this.nextState}>Next</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <FormGroup>
                                        <ControlLabel>Do you own a car?</ControlLabel>
                                        {' '}
                                        <Radio name="gender" inline onClick={this.isCarOwner}>
                                            Yes
                                        </Radio>
                                        {' '}
                                        <Radio name="gender" inline>
                                            No
                                        </Radio>
                                        {' '}
                                    </FormGroup>
                                    <Button onClick={this.updateApplication}>Submit Application!</Button>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    Thank you for taking the time to apply to Carrot!

                                    One of our representatives will contact you regarding the next steps of your application!
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        );
    }
});

var AppContinue = React.createClass({

    render: function() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Carrot</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="/">Sign out</NavItem>
                    </Nav>
                </Navbar>

                <ApplicationDialog applicationId={this.props.applicationId}/>
            </div>
        );
    }
});

module.exports = AppContinue;