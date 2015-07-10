var models = require('../models');
var bluebird = require('bluebird');

var Sequelize = require("sequelize");
var sequelize = new Sequelize("chat", "root", "");

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  message: Sequelize.STRING,
  roomname: Sequelize.STRING
})
//Create associations
Message.belongsTo(User)
User.hasMany(Message)
//Create database table
User.sync()
Message.sync()


module.exports = {
  messages: {
    get: function (req, res) {
      Message.findAll({}).then(function(messages){
        res.send(messages);
      })
    },
    post: function (req, res) {
      var args = [req.body.username, req.body.message, req.body.roomname]
      User.find({where: {username:req.body.username}}).then(function(user){
        if (user === null) {
          var newUser = User.build({username:req.body.username})
          newUser.save().then(function(){
            User.find({username: args[0]}).then(function(user){
              var newMessage = Message.build({userid:user.id, message: args[1], roomname: args[2]})
              newMessage.save().then(function(){
                res.end();
              })
            })
          })
        } else {
          User.find({username: args[0]}).then(function(user){
            var newMessage = Message.build({message: args[1], roomname: args[2]})
            newMessage.save().then(function(){
              res.end();
            })
          })
        }
      })
    }
  },

  users: {
    get: function (req, res) {
      User.findAll({}).then(function(users){
        res.send(users);
      })
    },
    post: function (req, res) {
      User.count({username: req.body.username}).then(function(number){
        if (number === 0) {
          var newUser = User.build({username:req.body.username})
          newUser.save().then(function(){
            res.end()
          })
        }
      })
    }
  }
};




// module.exports = {
//   messages: {
//     get: function (req, res) {
//       models.messages.get(req,res);
//     }, // a function which handles a get request for all messages
//     post: function (req, res) {
//       models.messages.post(req,res);

//     } // a function which handles posting a message to the database
//   },

//   users: {
//     // Ditto as above
//     get: function (req, res) {
//       models.users.get(req, res);
//     },
//     post: function (req, res) {
//       models.users.get(req, res);
//       res.end();
//     }
//   }
// };

