var ChampionImage = React.createClass({
    render: function () {
        return (
            <img className="champion-image" src={this.props.image}></img>
        )
    }
});
var SummonerSpells = React.createClass({
    render: function () {
        return (
            <div className="summoner-spells">
                <div className={this.props.spell1}/>
                <div className={this.props.spell2}/>
            </div>
        )
    }
});

var GameSummary = React.createClass({
    onClick: function () {
        var url = this.props.data.video_url;

        // Open in new tab
        var win = window.open(url, '_blank');
        win.focus();
    },
    render: function() {
        var match_data = this.props.data.match_data;
        var player_data = match_data.player_data;

        var duration = Math.floor(match_data.duration / 60);
        var creation = moment(match_data.creation).fromNow();
        var patch = /^[0-9]+\.[0-9]+/.exec(match_data.matchVersion);

        var outcome = match_data.win ? 'win' : 'loss';
        var classes = `game-summary ${outcome}`;
        return (
            <div onClick={this.onClick} className={classes}>
                <div className="summary-image">
                    <ChampionImage image={player_data.champion.image}/>
                </div>
                <SummonerSpells spell1={player_data.spell1} spell2={player_data.spell2}/>
                <div className="summary-detail">
                    <p>Duration: {duration}m</p>
                    <p>Creation: {creation}</p>
                    <p>Patch: {patch}</p>
                </div>
            </div>
        );
    }
});

var GameLogHead = React.createClass({
    render: function() {
        return (
            <div className="game-log-head">
                Log head
            </div>
        );
    }
});

var GameLog = React.createClass({
    render: function() {
        var data = this.props.data;
        var log = Object.keys(data).map(function (matchID) {
            var summary = data[matchID]
            return (
                <GameSummary key={summary.id} data={summary}/>
            )
        })
        return (
            <div className="game-log">
                <GameLogHead />
                <div className="game-log-body">
                    {log}
                </div>
            </div>
        );
    }
});
