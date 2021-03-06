import React from 'react';
import {IndexGameLog} from './game-log/index.js';

var IndexPage = React.createClass({
    render: function () {
        return (
            <div>
                <div className="hero">
                    <div className="hero-content">
                        <div className="title">SKIP TO THE GOOD PARTS</div>
                        <div className="subtitle">
                            <h3>Tired of watching streamers in queue and not in game?</h3>
                            <h3>Watch the VODs worth watching</h3>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <IndexGameLog />
                </div>
            </div>
        );
    }
});

export {IndexPage}
