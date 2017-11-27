function Letter (word){

	this.word = word;
	this.hidden = function(){
		var hiddenWord = [];

		for(var i = 0;i<this.word.length;i++){	
			if(word[i] === " "){
				hiddenWord.push(" ");
			}
			else {
				hiddenWord.push("_");
			}
		}

		return hiddenWord;
	};
}


module.exports = Letter;