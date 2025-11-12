var express = require('express');
var router = express.Router();

const Project = require("../models/project");
router.get("/", async (req, res, next)=> {
    let projects =await Project.find().sort({dueDate: 1});
    res.render("projects/index",{title: "Projects", projects:projects});
});
module.exports =router;