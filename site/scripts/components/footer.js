import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
    render: function() {
        var year = new Date().getFullYear();
        return (
            <div className="footer">
                <p>Email | Twitter | Github</p>
                <p>&#169; {year} vodlog</p>
            </div>
        );
    }
});
