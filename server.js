var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Vehicle = require('./app/models/vehicle');

// Configure app for bodyParser
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//  Set up port for server to listen on
var port = process.env.PORT || 3000;

//Connect to DB
mongoose.connect('mongodb://localhost:27017/vehicles', { useMongoClient: true });

// API Routes
var router = express.Router();

// Routes will al be prefixed With /api
app.use('/api', router);

// MIDDLEWARE
router.get(function(req,res,next){
    console.log('There is some processing...');
    next();
});

router.route('/vehicles')
    .post(function(req, res){
        var vehicle = new Vehicle();
        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;
        vehicle.save(function(err) {
            if (err){
                res.send(err);
            }
            res.json({message: 'Vehicle was sucessfully saved'});
        });
    })
    .get(function(req, res){
        Vehicle.find(function(err, vehicles){
            if (err){
                res.send(err);
            }
            res.json(vehicles);
        });
    });

router.route('/vehicle/:vehicle:id')
    .get(function(req, res){
        Vehicle.findById(req.params.vehicle_id, function(err, vehicle){
            if (err){
                res.send(err);
            }
            res.json(vehicle);
        });
    });

// Test Route
router.get('/', function(req, res) {
    res.json({message: 'Welcome to our API'});
});

// Fire up server
app.listen(port);
console.log('Server listening on port ' + port);
