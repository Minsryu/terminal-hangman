var Methods = require("./word.js");
var GetList = Methods.GetList;
var Word = Methods.Word;
var Letter = require("./letter.js")
var inquirer = require('inquirer');

var list = new GetList("list.txt");

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
		console.log("/////////////////////////////////");
		console.log("You have "+ tries+" tries left.\n");
		console.log(hiddenWord.join(" "));
		
	}
	
	var askLetter = function (){

		if(guessWord===hiddenWord.join("")){
			console.log("/////////////////////////////////");
			console.log("You got it right! Guess the Next Word");
			initialize(data);
			askLetter();
		}
		else if(tries > 0){

			inquirer.prompt([
				{
					type:"input",
					message:"Guess a letter",
					name:"guess",
					validate: function(value) {
			          if ( typeof value === "string" && value.length === 1) {
			            return true;
			          }
			          return false;
			        }
				}
			]).then(function(data){
				var x = data.guess;


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
			console.log("\nYou have failed!");
		}
	
	}

	initialize(data);
	askLetter();
	
});



// var hiddenWord = Letter("guessWord");
// hiddenWord.

