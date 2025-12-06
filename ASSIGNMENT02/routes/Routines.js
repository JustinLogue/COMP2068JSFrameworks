var express = require('express');
var router = express.Router();

const Routine = require("../models/routine");

const authenticateMiddleware = require("../extensions/authentication");
router.get("/", async (req, res, next)=> {
    // show routines not projects
    let data = await Routine.find().sort([["routineName", "ascending"]]);
    res.render("routines/index",{title: "Routines", dataset:data, user: req.user });
});

router.get("/add", authenticateMiddleware, async (req, res, next)=>{
    let routinesList = await Routine.find().sort([["routineName", "ascending"]]);
    res.render("routines/add", {title: "Add a routine", routines: routinesList, user: req.user })
});
router.post("/add", authenticateMiddleware, async (req,res, next) => {
    let newRoutine = new Routine({
        routineName: req.body.routineName,
        hingeActivity: req.body.hingeActivity,
        pushActivity: req.body.pushActivity,
        squatActivity: req.body.squatActivity,
        pullActivity: req.body.pullActivity,
        cardioActivity: req.body.cardioActivity,
        hingeWeights: req.body.hingeWeights,
        pushWeights: req.body.pushWeights,    
        squatWeights: req.body.squatWeights,
        pullWeights: req.body.pullWeights,
        cardioMinutes: req.body.cardioMinutes,
        hingeSets: req.body.hingeSets,
        pushSets: req.body.pushSets,
        squatSets: req.body.squatSets,
        pullSets: req.body.pullSets,
        hingeReps: req.body.hingeReps,
        pushReps: req.body.pushReps,
        squatReps: req.body.squatReps,
        pullReps: req.body.pullReps,
    })
    await newRoutine.save();
    res.redirect('/routines');
});
router.get("/delete/:_id", authenticateMiddleware, async(req, res, next)=> {
    let routineId = req.params._id;
    await Routine.findByIdAndDelete(routineId);
    res.redirect("/routines");
});

router.get('/edit/:_id', authenticateMiddleware, async (req,res,next) =>{
    let routineId = req.params._id;
    let routineData = await Routine.findById(routineId); // fixed name
    res.render("routines/edit", {title: "Edit Routines", routine: routineData, user: req.user})
});

router.post("/edit/:_id", authenticateMiddleware, async (req, res, next) =>{
    let routineId =req.params._id;
    await Routine.findByIdAndUpdate(
        {_id: routineId},
        {
            routineName: req.body.routineName,
            hingeActivity: req.body.hingeActivity,
            pushActivity: req.body.pushActivity,
            squatActivity: req.body.squatActivity,
            pullActivity: req.body.pullActivity,
            cardioActivity: req.body.cardioActivity,
            hingeWeights: req.body.hingeWeights,
            pushWeights: req.body.pushWeights, // fixed mapping
            squatWeights: req.body.squatWeights,
            pullWeights: req.body.pullWeights,
            cardioMinutes: req.body.cardioMinutes,
            hingeSets: req.body.hingeSets,
            pushSets: req.body.pushSets,
            squatSets: req.body.squatSets,
            pullSets: req.body.pullSets,
            hingeReps: req.body.hingeReps,
            pushReps: req.body.pushReps,
            squatReps: req.body.squatReps,
            pullReps: req.body.pullReps,
        }
    );
    res.redirect("/routines");
}) 

module.exports =router;