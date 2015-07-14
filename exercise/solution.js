// Embedded data: Users and Tweets

// 1) Create a user
var sam = new db.User({name: "samantha"});
sam.save();


// 2) Build two tweets
var tweet1 = new db.Tweet({body: "shmeeshmeeshmoo"});
var tweet2 = new db.Tweet({body: "blahblahbloo"});


// 3) Save the tweets as embedded data in a user
sam.tweets.push(tweet1, tweet2);
sam.save();


// 4) List all the users
db.User.find({}, function(err, users){
  console.log(users);
});


// 5) List all tweets of a specific user
db.User.findOne({name: "samantha"}, function(err, user){
  console.log(user.tweets);
});



// Referenced data: Foods and Ingredients

// 1) Create several ingredients
var sauce = new db.Ingredient({title: "Tomato Sauce", origin: "Napoli"});
sauce.save();
var cheese = new db.Ingredient({title: "Parmigiano Regianno", origin: "Parma"});
cheese.save();
var sausage = new db.Ingredient({title: "Sweet Italian sausage", origion: "???"});
sausage.save();


// 2) Create a food that references those ingredients
var pizza = new db.Food({name: "Pizza"});
pizza.ingredients.push(sauce._id, cheese._id);
pizza.save();


// 3) List all the Foods
db.Food.find({}, function(err, foods){
  console.log(foods);
});


// 4) List all the ingredients in a Food

//http://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
db.Ingredient.find(
  {
    _id: {$in: pizza.ingredients}
  },
  function(err, ingredients){
    console.log(ingredients);
  }
);

// or 

// http://mongoosejs.com/docs/populate.html
db.Food.findOne({}).populate('ingredients').exec(function (err, foundFood) {
  console.log(foundFood.ingredients);
});

















