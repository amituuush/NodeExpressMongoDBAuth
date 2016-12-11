const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schemas are used to tell mongoose about the particlar fields that our model is going to have

// define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});



// create the model class
// loads schema into mongoose. First string defines the name of the collection
const ModelClass = mongoose.model('user', userSchema);


// export the model
module.exports = ModelClass;
