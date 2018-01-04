var path = require('path');
var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var surveyData = req.body
        console.log(req.body);
       
        var surveyDataScores = surveyData.scores

        var matchName = '';
        var matchImage = '';
        var totalDifference = 100;

        for (var i = 0; i < friends.length; i++) {
            
            var diff = 0;
            for (var d = 0; d < surveyDataScores.length; d++) {
                diff += Math.abs(friends[i].scores[d] - surveyDataScores[d]);
            }
            console.log('diff = ' + diff);

           if (diff < totalDifference) {
                
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        friends.push(surveyData);
        return res.json({ matchName: matchName, matchImage: matchImage })
    });

    app.post("/api/random", function(req, res) {
       
        var random = Math.floor(Math.random() * (friends.length))
        var matchName = friends[random].name;
        var matchImage = friends[random].photo;
       
        return res.json({ matchName: matchName, matchImage: matchImage })
       
    });

};