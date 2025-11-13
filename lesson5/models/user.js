const mongoose = require('mongoose');

const plm= require("passport-local-mongoose");
const mongooseSchema = mongoose.Schema({
    username: {type: String, require:true, unique:true},
    password: {type: String,}
});
mongooseSchema.plugin(plm);
module.exports = mongoose.model("User", mongooseSchema);