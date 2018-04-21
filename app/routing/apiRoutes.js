//links routes to data sources
var friends = require("../data/friends");
module.exports = function(app) {
    // shows when user visits page, theyre shown json data
    app.get("/api/firneds", function(req, res) {
        res.json(friends);
    });

    //handles the json data and gets pushed to the right jvscpt array
    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: infinity
        };

        //parse the user survey post
        var userData = req.body;
        varuserScores = userData['scores[]'];

        //calculates difference in each users score
        var totalDifference;
        //makes for loop to go through all possibilities
        for (var a = 0; a < friends.length; a++) {
            var currentFriend = friends[a];
            totalDifference = 0;
            console.log(currentFriend.name);

            //loop through all scores of each person
            for (var b = 0; b < currentFriend.scores.length; b++) {
                var currentFriendScore = currentFriend.scores[b];
                var currentUserScore = userScores[b];

                // calculate the differnece in scores 
                totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDifference <= bestMatch.friendDifference) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo = currentFriend.photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
        // saves user data to db
        friends.push(userData);
        // returns a json with users match
        res.json(bestMatch);
    });
};