const express = require('express');
const app = express();
app.get("/", (req, res, next) => {
    res.send("Hello World! This is my first express app");
})
app.get("/about", (req, res, next)=> {
    res.send("This an about page");

})

app.listen(3000, () => {
console.log("Server is running on http://localhost:3000")
});