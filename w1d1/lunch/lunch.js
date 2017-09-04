function whatToDoForLunch(hungry, availableTime) {
  var advice = '';
  if(hungry) {
    switch(true) {
      case (availableTime >= 0 && availableTime < 20):
       advice = "Pick up something to eat in the Lab";
        break;
      case (availableTime >= 20 && availableTime < 45):
        advice = "Try a place in Gastown";
        break;
      case (availableTime > 45):
        advice = "This is a bootcamp, you should reconsider";
        break;
      default:
        advice = "Plan your day better, eating is important!";
    }
  } else {
    advice = "Keep working";
  }
  console.log(advice);
}


///////////////////////////////////////////////////////////////////

console.log("I'm hungry and I have 20 minutes for lunch.");
whatToDoForLunch(true, 20);
console.log("---");

console.log("I'm hungry and I have 50 minutes for lunch.");
whatToDoForLunch(true, 50);
console.log("---");

console.log("I'm not hungry and I have 30 minutes for lunch.");
whatToDoForLunch(false, 30);
console.log("---");

console.log("I'm hungry and I have 15 minutes for lunch.");
whatToDoForLunch(true, 15);
console.log("---");

console.log("I'm hungry and I have -5 minutes for lunch.");
whatToDoForLunch(true, -5);
