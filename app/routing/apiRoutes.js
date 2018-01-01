var path = require('path');
var friends = require("../data/friends");

module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {

        var surveyData = req.body
       
        var surveyDataScores = surveyData.scores


        console.log(surveyDataScores);


        var matchName = '';
        var matchImage = '';
        var totalDifference = 100;

        for (var i = 0; i < friends.length; i++) {
            
            var diff = 0;
            for (var j = 0; j < surveyDataScores.length; j++) {
                diff += Math.abs(friends[i].scores[j] - surveyDataScores[j]);
            }
            console.log('diff = ' + diff);

           if (diff < totalDifference) {
                
                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }


        friends.push(surveyData);
        return res.json({ status: 'OK', matchName: matchName, matchImage: matchImage })
       
    });


















};