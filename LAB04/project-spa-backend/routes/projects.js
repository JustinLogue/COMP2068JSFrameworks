var express = require('express');
var router = express.Router();
var Project =require("../models/project")

router.get("/", async(req,res,next) => {
    let projects = await Project.find();
    res.status(200).json(projects);
});

router.post('/', (req, res, next) => {
    Project.create(req.body, (err, project)=>{
        if(err){
            return res.status(500).json(err);
        }
        else{
            return res.status(201).json(project);
        }
    });
});
module.exports = router;
