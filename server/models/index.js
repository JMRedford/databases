var db = require('../db');


var putMessage = function(uId, text, rId){
  console.log(uId);
  var date = new Date();
  db.query('INSERT INTO messages VALUES (' + uId + ', \'' +
                                             text + '\', ' +
                                             rId + ', \'' +
  date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '\')');
};

var getUserId = function(name, callback){
  db.query('SELECT u_id FROM users WHERE name=\''+name+'\'',
  function(err, results, fields){
    if (results.length === 0){
      db.query('INSERT INTO users (name) VALUES (\''+name+'\')', function(){
        db.query('SELECT u_id FROM users WHERE name=\''+name+'\'', function(err2, results2, fields2){
          callback(results2[0].u_id);
        });
      });
    } else {
      callback(results[0].u_id);
    }
  });
};

var getRoomId = function(room, callback){
  db.query('SELECT r_id FROM rooms WHERE name=\''+room+'\'',
  function(err, rows, fields){
    if (rows.length === 0){
      db.query('INSERT INTO rooms (name) VALUES (\''+room+'\')', function(){
        db.query('SELECT r_id FROM rooms WHERE name=\''+room+'\'', function(err2, results2, fields2){
          callback(results2[0].r_id);
        });
      });
    } else {
      callback(rows[0].r_id);
    }
  });
};

module.exports = {
  messages: {
    get: function (req, res) {
      db.query('SELECT * FROM messages',
      function(err, results, fields) {
        res.send(results);
      })

    }, // a function which produces all the messages
    post: function (req, res) {
      getUserId(req.body.username, function(uId){
        getRoomId(req.body.roomname, function(rId){
          putMessage(uId, req.body.message, rId);
        })
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

