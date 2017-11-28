var Methods = require("./word.js");
var GetList = Methods.GetList;
var Word = Methods.Word;
var Letter = require("./letter.js")
var inquirer = require('inquirer');

var list = new GetList("list.txt");

var alreadyTried = [];
var guessWord;
var hiddenWord;
var tries;


list.read(function(data){

	
	var initialize = function(data){
		var randomObj = new Word(data);
		guessWord = randomObj.selectedWord();
		var wordObj = new Letter(guessWord);
		hiddenWord = wordObj.hidden();
		tries = 8;
		alreadyTried = [];
		console.log("/////////////////////////////////");
		console.log("You have "+ tries+" tries left.\n");
		console.log(hiddenWord.join(" "));
		askLetter();
		
	}
	
	var askLetter = function (){

		if(guessWord===hiddenWord.join("")){
			console.log("/////////////////////////////////");
			console.log("You got it right! Guess the Next Word");
			initialize(data);
		}
		else if(tries > 0){
			inquirer.prompt([
				{
					type:"input",
					message:"Guess a letter",
					name:"guess",
					validate: function(value) {
			          if ( typeof value === "string" && value.length === 1 && alreadyTried.indexOf(value)===-1) {
			            return true;
			          }
			          return false;
			        }
				}
			]).then(function(data){
				var x = data.guess;
				alreadyTried.push(x);

				if(guessWord.indexOf(x)===-1){
					tries--;
					console.log("/////////////////////////////////");
					console.log("Incorrect!!")
					console.log("You have "+ tries+" tries left.\n");
					console.log(hiddenWord.join(" "));
					askLetter();
				}
				else if (guessWord.indexOf(x)!==-1){
					for(var i=0;i<guessWord.length;i++ ){
						if(guessWord[i]===x){
							hiddenWord[i] = x; 
						}

					}
					console.log("/////////////////////////////////");
					console.log("Correct!!");
					console.log("You have "+ tries+" tries left.\n");
					console.log(hiddenWord.join(" "));
					askLetter();
				}
			});
		}
		else{
			console.log("/////////////////////////////////");
			console.log("\nYou have failed! Let's try that again");
			initialize(data);
		}
	}
	initialize(data);
	
});



// var hiddenWord = Letter("guessWord");
// hiddenWord.

