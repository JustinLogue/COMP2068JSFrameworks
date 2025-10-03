const fs=require("fs");
fs.readFile("food.txt", "utf8", (error, data) => {
    console.log(data);

});
console.log("food.txt read successfully");

fs.readFile("drinks.txt", "utf8", (error, data) => {
    console.log(data);

});
console.log("drinks.txt read successfully");