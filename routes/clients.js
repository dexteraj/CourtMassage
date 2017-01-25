var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://andy:andy@ds023694.mlab.com:23694/massageclients',['clients'])


router.get('/clients', function (req, res, next) {
    db.clients.find(function (err,clients) {
        if(err){
            res.send(err)
        }
        res.json(clients);
    });
});

//Get single Tasks
router.get('/client/:id', function (req, res, next) {
    db.clients.findOne({_id: mongojs.ObjectId(req.params.id)},function (err,client) {
        if(err){
            res.send(err)
        }
        res.json(client);
    });
});

//Save Tasks
router.post('/client', function(req,res,next){
  var client = req.body;
  if(!client.fName){
    res.status(400);
    res.json({
      "error": "Bad Data"
    });
  } else{
    db.clients.save(client, function(err, client){
      if(err){
          res.send(err)
      }
      res.json(client);
    })
  }
});


//Delete client
router.delete('/client/:id', function(req,res,next){
  db.clients.remove({_id: mongojs.ObjectId(req.params.id)},function (err,client) {
    if(err){
      res.send(err);
    }
    res.json(client);
  })
});

//Update client
router.put('/client/:id', function(req,res,next){
  var client = req.body;
  var updTask = {};

if(client.fName){
  updTask.fName = client.fName;
}

if(client.lName){
  updTask.lName = client.lName;
}

if(!updTask){
  res.status(400);
  res.json({
    "error": "Bad Data"
  })
 } else {
    db.clients.update({_id: mongojs.ObjectId(req.params.id)},updTask, {},function (err,client) {
      if(err){
        res.send(err);
      }
      res.json(client);
    });
}
});


module.exports = router
