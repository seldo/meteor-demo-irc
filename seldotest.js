if (Meteor.is_client) {
    
  Messages = new Meteor.Collection("messages");
  People = new Meteor.Collection("people");
    
  /*
  Template.you.greeting = function () {
    var firstname = Session.get('firstname');
    if (_.isEmpty(firstname)) firstname = 'new user';
    console.log("name=" + firstname);
    return "Hi, " + firstname + "!";
  };
  */
  
  //// you
  
  Template.you.firstname = function() {
    //var firstname = Session.get('firstname');
    //if (_.isEmpty(firstname)) firstname = 'new user';
    //return firstname;
    return Session.get('firstname');
  }

  Template.you.events = {
    'click input' : function () {
      //console.log("You clicked an input");
    },
    'click input[value="set"]' : function(a,b,c) {
        console.log("You clicked the set button");
        var name = document.getElementById('namebox').value;
        Meteor.call('addUser',name,userAdded)
    }
  };  
  
  //// them
  
  Template.them.users = function() {
      return People.find({});
  }
  
  //// chat
  
  Template.chat.messages = function() {
      var messages = Messages.find({},{
         sort: ["created","desc"]
      }).fetch();
      
      var msgSlice = messages.slice(-10);
      //messages.reverse();
      return msgSlice;
      //return messages;
  }
  
  Template.chat.events = {
    'submit form[name="msgform"]': function(e) {
        e.preventDefault();
        if (_.isEmpty(Session.get('firstname'))) {
            return;   
        }
        var msgInput = document.getElementById('msg');
        var msg = msgInput.value;
        var created = (new Date()).getTime();
        console.log("message: " + msg);
        console.log("created: " + created);
        Messages.insert({
           "created": created,
           "message": msg,
           "username": Session.get('firstname')
        });
        msgInput.value = null;
    }
  }
  
  // nuke (resets everything)
  Template.nuke.events = {
      'click input': function(e) {
          console.log('nuking all messages');
          Messages.remove({});
          People.remove({});
      }
  }
  
}

function userAdded(error,result) {
   console.log("User created: " + result);
   Session.set('firstname',result);
}

if (Meteor.is_server) {
  Meteor.startup(function () {
      
    // code to run on server at startup
    People = new Meteor.Collection("people");
    Messages = new Meteor.Collection("messages");

    /*
    Meteor.publish("msglist", function() {
        return Messages.find({},{
            sort: ["created","desc"]
        });
    });
    */
    
  });
}