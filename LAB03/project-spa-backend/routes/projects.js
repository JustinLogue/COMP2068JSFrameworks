
const express = require('express');
const router = express.Router();
const Project = require('../models/project'); // adjust path if needed

// GET /projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects', details: err.message });
  }
});

module.exports = router;
//var express = require('express');
//var router = express.Router();
//router.get('/', (req, res) => {
  //res.send('Projects route working!');
  //const dummy={
    //name: "Justin's Project",

    //course: "JavascriptFramewokrs",


  //};
   //res.status(200).json(dummyData);
//});

//module.exports = router;