const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

//structure
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
})
//model for crud operation

module.exports = mongoose.model("user", userSchema);