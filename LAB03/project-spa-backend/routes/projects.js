var express = require('express');
var router = express.Router();
var Project =require("../models/project")

router.get("/", async(req,res,next) => {
    let projects = await Project.find();
    res.status(200).json(projects);
});

module.exports = router;
