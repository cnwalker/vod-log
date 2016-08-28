import React from 'react';
import db from '../../database/database.js';
import champions from '../../champions';
import GameLogHead from './head';
import GameLogBody from './body';
import GameLogLoad from './load';

var GameLog = React.createClass({
    getInitialState: function () {
        var logType = this.props.logType || {};
        var name = logType.channel || logType.champion || logType.role || logType.name;
        return {
            matches: [],
            headData: {name: name},
            loading: false,
            noMore: false
        }
    },
    componentDidMount: function() {
        this.loadMatches(this.props.logType);
        this.loadHead(this.props.logType);
    },
    componentWillReceiveProps: function(nextProps) {
        var logType = nextProps.logType || {};
        this.setState({
            matches: [],
            headData: {name: logType.channel || logType.champion || logType.role || logType.name},
            loading: false,
            noMore: false
        });
        this.loadMatches(nextProps.logType, true);
        this.loadHead(nextProps.logType);
    },
    addMatches: function (newMatches) {
        var matches = this.state.matches;
        if (newMatches.length === 0) {
            return this.setState({
                loading: false,
                noMore: true
            });
        }

        matches = matches.concat(newMatches)
        this.setState({
            matches: matches,
            loading: false,
            noMore: false
        });

        this.lastMatchTime = matches[matches.length - 1].creation;
    },
    loadMatches: function (dbParam, force) {
        if (this.state.loading && !force) return;
        this.setState({loading: true});
        var dbParam = dbParam || this.props.logType;
        if (dbParam) {
            dbParam.next = this.lastMatchTime;
            if (dbParam.channel || dbParam.champion || dbParam.role || dbParam.all) {
                return db.getMatchesPage(dbParam).then(function (newMatches) {
                    this.addMatches(newMatches);
                    return newMatches;
                }.bind(this)).catch(function (error) {
                    console.error(error.stack);
                });
            }
        }
    },
    loadHead: function (logType) {
        if (logType) {
            if (logType.channel) {
                db.getChannelHead(logType.channel).then(function (channel) {
                    this.setState({headData: channel});
                }.bind(this));
            } else if (logType.champion) {
                champions.getChampionHead(logType.champion).then(function (champion) {
                    if (champion) {
                        this.setState({headData: champion});
                    }
                }.bind(this));
            } else if (logType.role) {

            }
        }
    },
    render: function() {
        var logType = this.props.logType || {};
        var type;
        if (logType.channel) {
            type = "channel";
        } else if (logType.champion) {
            type = "champion"
        } else if (logType.role) {
            type = "role"
        }

        return (
            <div className="game-log">
                <div className="game-log-main">
                    <GameLogHead type={type} headData={this.state.headData} empty={!this.state.matches.length}/>
                    <GameLogBody type={type} data={this.state.matches} loadMore={this.loadMatches}/>
                </div>
                <GameLogLoad loading={this.state.loading} noMore={this.state.noMore} onClick={() => this.loadMatches()}/>
            </div>
        );
    }
});

// GameLog Wrappers
var IndexGameLog = React.createClass({
    render: function () {
        var logType = { all: true };
        return (
            <GameLog logType={logType} />
        )
    }
});

var ChannelGameLog = React.createClass({
    render: function () {
        var logType = {
            channel: this.props.params.channelID
        };
        return (
            <GameLog logType={logType} />
        )
    }
});

var ChampionGameLog = React.createClass({
    getInitialState: function () {
        return {
            logType: { name: this.props.params.championKey }
        };
    },
    componentDidMount: function () {
        champions.get(this.props.params.championKey).then(function (champion) {
            this.setState({
                logType: { champion: champion.id }
            });
        }.bind(this));
    },
    componentWillReceiveProps: function (newProps) {
        this.setState({
            logType: { name: newProps.params.championKey }
        });
        champions.get(newProps.params.championKey).then(function (champion) {
            this.setState({
                logType: { champion: champion.id }
            });
        }.bind(this));
    },
    render: function () {
        return (
            <GameLog logType={this.state.logType} />
        );
    }
});

var RoleGameLog = React.createClass({
    render: function () {
        var logType = {
            role: this.props.params.role.toUpperCase()
        };
        return (
            <GameLog logType={logType} />
        )
    }
});

export {IndexGameLog, ChannelGameLog, ChampionGameLog, RoleGameLog}
