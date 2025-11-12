const mongoose = require('mongoose');
const schemaObj = {
    name: {type: String, require:true},
    dueDate: {type: Date},
    course: {type: String, require:true},
    status: {type: String, enum:["TODO", "IN-PROGRESS","DONE"], default: "TODO"}
};
const mongooseSchema = new mongoose.Schema(schemaObj)
module.exports =mongoose.model("Project", mongooseSchema)