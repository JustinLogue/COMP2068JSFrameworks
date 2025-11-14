const mongoose = require('mongoose');

const plm= require("passport-local-mongoose");
const mongooseSchema = mongoose.Schema({
    username: {type: String, require:true, unique:true},
    password: {type: String,},
    oauthId: {type:String},
    oauthPRovider: {type: String},
    created: {type:Date, default:Date.now},
});
mongooseSchema.plugin(plm);
module.exports = mongoose.model("User", mongooseSchema);