var express = require('express');
var router = express.Router();

const Project = require("../models/project");
const Course = require("../models/course");

const authenticateMiddleware = require("../extensions/authentication");
router.get("/", async (req, res, next)=> {
    let data = await Project.find().sort({dueDate: 1});
    //let projects =await Project.find().sort({dueDate: 1});
    res.render("projects/index",{title: "Projects Tracker", dataset:data, user: req.user });
});

router.get("/add", authenticateMiddleware, async (req, res, next)=>{
    let courseList = await Course.find().sort([["name", "ascending"]]);
    res.render("projects/add", {title: "Add a project", courses: courseList, user: req.user })
});
router.post("/add", authenticateMiddleware, async (req,res, next) => {
    let newProject = new Project({
        name: req.body.name,
        dueDate: req.body.dueDate,
        course: req.body.course,
    })
    await newProject.save();
    res.redirect('/projects');
});
router.get("/delete/:_id", authenticateMiddleware, async(req, res, next)=> {
    let projectId = req.params._id;
    await Project.findByIdAndDelete(projectId);
    res.redirect("/projects");
});

router.get('/edit/:_id', authenticateMiddleware, async (req,res,next) =>{
    let projectId = req.params._id;
    let projectData = await Project.findById(projectId);
    let courseList = await Course.find().sort([["name","ascending"]]);
    res.render("projects/edit", {title: "Edit Project", project: projectData, courses: courseList, user: req.user})
});

router.post("/edit/:_id", authenticateMiddleware, async (req, res, next) =>{
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

