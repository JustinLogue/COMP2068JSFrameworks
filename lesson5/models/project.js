const mongoose = require('mongoose');
const mongooseSchema = mongoose.Schema({
    name: {type: String, require:true},
    dueDate: {type: Date},
    course: {type: String, require:true},
    status: {type: String, enum:["TODO", "IN-PROGRESS","DONE"], default: "TODO"}
});
module.exports =mongoose.model("Project", mongooseSchema)