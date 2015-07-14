// Setup
var mongoose = require("mongoose");

// what does the next line do?
// connect to the mongo db 
mongoose.connect("mongodb://localhost/mongoRelationships");

var Schema = mongoose.Schema;


// Referenced Data

// what does this code block do?
// set up the food schema (plan)
var foodSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  ingredients: [{
    type: Schema.Types.ObjectId,  // what does this line do?
    ref: 'Ingredient'             // these lines set up list of ingredients referenced by id
  }]
});

// what does this code block do?
// set up ingredient schema
var ingredientSchema = new Schema({
  title: {
    type: String,
    default: ""
  },
  origin: {
    type: String,
    default: ""
  }
})


// what do these next two lines do?
// create food and ingredient models
var Food = mongoose.model("Food", foodSchema);
var Ingredient = mongoose.model("Ingredient", ingredientSchema);

// Embedded Data
// what does this code block do?
// set up tweet schema
var tweetSchema = new Schema({
  body: {
    type: String,
    default: ""
  }
});

// what does this code block do?
// set up user schema
var userSchema = new Schema({
  name: {
    type: String,
    default: ""
  },
  tweets: [tweetSchema]   // what does this line do?
                          // sets up list of tweets embedded in the user
});

// what do these next two lines do?
// create user and tweet models
var User = mongoose.model("User", userSchema);
var Tweet = mongoose.model("Tweet", tweetSchema);


// Export all our models
module.exports.Food = Food;
module.exports.Ingredient = Ingredient;
module.exports.User = User;
module.exports.Tweet = Tweet;

// For the purposes of these console exercises,
// we'll close the database connection when we type
// command + C in the terminal.
// Don't worry about exactly how this works.
// If you're curious feel free to look it up.
process.on('SIGINT', function() {
  console.log('About to exit...');
  mongoose.disconnect(function(){
    console.log("Disconnected DB")
    process.exit(); // now exit the node app
  });
});
