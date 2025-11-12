var express = require('express');
var router = express.Router();

const Project = require("../models/project");
router.get("/", async (req, res, next)=> {
    let data = await Project.find().sort({dueDate: 1});
    //let projects =await Project.find().sort({dueDate: 1});
    res.render("projects/index",{title: "Projects Tracker", dataset:data});
});

router.get("/add", async (req, res, next)=>{
    res.render("projects/add", {title: "Add a project"})
});
router.post("/add", async (req,res, next) => {
    let newProject = new Project({
        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course,
    })
    await newProject.save();
    res.redirect('/projects');
});
router.get("/delete/:_id", async(req, res, next)=> {
    let projectId = req.params._id;
    await Project.findByIdAndDelete(projectId);
    res.redirect("/projects");
});

router.get('/edit/:_id', async (req,res,next) =>{
    let projectId = req.params._id;
    let projectData = await Project.findById(projectId);
    res.render("projects/edit", {title: "Edit Project", project: projectData})
});

router.post("/edit/:_id", async (req, res, next) =>{
    let projectId =req.params._id;
    await Project.findByIdAndUpdate(
        {_id: projectId},
        {
            name: req.body.name,
            dueDate: req.body.dueDate,
            course: req.body.course,
            status: req.body.status,

        }
    );
    res.redirect("/projects");
}) 

module.exports =router;

