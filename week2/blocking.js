const fs = require("fs");

var food = fs.readFileSync("food.txt", "utf8");
console.log(food);
console.log("food.txt read successfully");
var drinks = fs.readFileSync("drinks.txt", "utf8");
console.log(drinks);
console.log("drinks.txt read successfully");