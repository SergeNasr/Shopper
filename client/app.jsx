'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

    render() {
        return (
            <div>
                Test
            </div>
        );
    }
});

ReactDOM.render(<App/>, document.getElementById('app'));