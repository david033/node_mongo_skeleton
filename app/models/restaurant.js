var mongoose = require('moongose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
    address:  {
        building: String,
        coord: [Number, Number],
        street: String,
        zipcode: String
    },
    borough: String,
    cuisine: String,
    grades: [
      date:
    ]

});
