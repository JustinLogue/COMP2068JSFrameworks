const mongoose = require('mongoose');
const schemaObj = {
    name: {type: String, require:true},
    hingeActivity: {type: String, require:true},
    pushActivity: {type: String, require:true},
    squatActivity: {type: String, require:true},
    pullActivity: {type: String, require:true},
    cardioActivity: {type: String, require:true},
    hingeWeights: {type: Number},
    pushWeights: {type: Number},
    squatWeights: {type: Number},
    pullWeights: {type: Number},
    cardioMinutes: {type: Number, require:true},
    hingeSets: {type: Number, require:true},
    pushSets: {type: Number, require:true},
    squatSets: {type: Number, require:true},
    pullSets: {type: Number, require:true},
    hingeReps: {type: Number, require:true},
    pushReps: {type: Number, require:true},
    squatReps: {type: Number, require:true},
    pullReps: {type: Number, require:true},

    
};
const mongooseSchema = new mongoose.Schema(schemaObj)
module.exports =mongoose.model("Routine", mongooseSchema)