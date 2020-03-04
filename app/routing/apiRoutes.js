var express = require('express');
var friends = require("../data/friends.js");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        console.log(friends)
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;
        // console.log(newFriend);

        var friendName = newFriend.name
        var friendScores = newFriend.scores

        for (var i = 0; i < newFriend.scores.length; i++) {
            newFriend.scores[i] = parseInt(newFriend.scores[i]);
        }


        newFriend = {
            "name": friendName,
            "photo": req.body.photo,
            "scores": friendScores
        }
        console.log(newFriend);

        // default friend match is the first friend but result will be whoever has the minimum difference in scores
        var bestFriendIndex = 0;
        var minimumDifference = 40;

        // in this for-loop, start off with a zero difference and compare the user and the ith friend scores, one set at a time
        //  whatever the difference is, add to the total difference
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(newFriend.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        friends.push(newFriend);
        console.log(newFriend);
        console.log("A new friend has been added!");

        console.log("my best friend is" + JSON.stringify(friends[bestFriendIndex]))

        // send back to browser the best friend match
        res.json(friends[bestFriendIndex]);

        // res.json(bestFriend);
    })
}