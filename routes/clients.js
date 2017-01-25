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

module.exports = router
