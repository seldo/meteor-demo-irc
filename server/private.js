// this doesn't need to be on the server
// this is just to show how you can use RPC to keep private server-only logic
Meteor.methods({
    addUser: function(name) {
        var existingUser = People.findOne({username:name});
        if (_.isEmpty(existingUser)) {
            People.insert({username:name});
        }
        return name;
    }
})