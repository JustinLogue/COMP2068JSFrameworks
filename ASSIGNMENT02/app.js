const express = require('express');
const app = express();
app.get("/", (req, res, next)=>{
    res.send("Hello, World! This is justin");
});
app.listen (3000, () => {
    console.log('Server is running on http://localhostn3000');
});