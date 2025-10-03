console.log("lab 2");
var prompt = require('prompt');
const schema = {
  properties: {
    userSelection: {
      description: "Choose ROCK, PAPER, or SCISSORS",
      pattern: /^(rock|paper|scissors)$/i,
      message: "Input must be ROCK, PAPER, or SCISSORS",
      required: true
    }
  }
};
function RPS(){
    //console.log("function test");
    let computerSelection= ""
    
    
    prompt.start();
    prompt.get(schema, function (err, result) {
          if (err) {
    console.error(err);
    return;
  }

    console.log('Command-line input received:');

    console.log('  hand: ' + result.userSelection);
    let userSelection2 =result.userSelection.toUpperCase();

    compHandNum = Math.random();
    console.log(compHandNum);
    let compHandStr = "";
    if(compHandNum <=0.34){
        compHandStr = "PAPER";
    }
    else if(0.35 <=compHandNum <=0.66){
        compHandStr = "SCISSORS";
    }
    else if(0.67 <=compHandNum){
        compHandStr = "ROCK";
    }
    console.log("Random num is: " +compHandNum)
    console.log("Your Hand is :"+userSelection2);
    console.log("The computers had is: "+compHandStr);

    if(compHandStr === userSelection2){
        console.log("It's a tie.");
    }
    else if(
        (compHandStr == "PAPER" && userSelection2 == "SCISSORS")||
        (compHandStr == "SCISSORS" && userSelection2 == "ROCK")||
        (compHandStr == "ROCK" && userSelection2 == "PAPER")
    ){
        console.log("User Wins");
    }
        else if(
        (compHandStr == "SCISSORS" && userSelection2 == "PAPER")||
        (compHandStr == "PAPER" && userSelection2 == "ROCK")||
        (compHandStr == "ROCK" && userSelection2 == "SCISSORS")
    ){
        console.log("Computer Wins");
    }
    


  });

}

RPS();