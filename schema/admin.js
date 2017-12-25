var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
  email:  String,
  passsword: String
});
mongoose.model('Post', adminSchema);