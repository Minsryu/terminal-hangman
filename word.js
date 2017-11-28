var fs = require("fs");


function GetList(filename){

	this.filename = filename;
	this.read = function(callback){
		fs.readFile(this.filename,"utf8", function(err,res){			
			callback(res);
		})
	};
}

function Word(list){

	// this.list = list;
	// this.first = list[0];
	this.list = list.split(",");
	this.selectedWord = function(){
		var randomNum = Math.floor(Math.random()*this.list.length);
		// console.log("list length "+this.list.length);
		var word = this.list[randomNum];
		return word;
	};

}

module.exports = {
	GetList:GetList,
	Word:Word
};


