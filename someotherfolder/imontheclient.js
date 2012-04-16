function imontheclient() {
    var bob = "i am on the client";
}

if (Meteor.is_server) {
  var bob = "even though I'm in this file, I'm not running on the client";
}

