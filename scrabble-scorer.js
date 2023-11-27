// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");



const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let newPointStructure = transform(oldPointStructure);

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   
   let word = input.question();
                               
   return word  
};

let simpleScorer = function(word) {
   let simpleScore = 0;          
   for (let i =0; i < word.length; i++) {
      simpleScore += 1;
   }
   return simpleScore
};

let vowelBonusScorer = function (word) {
   let vowelBonus = 0;
   let vowels = ["A", "E", "I", "O", "U"];
   word = word.toUpperCase();
   
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         vowelBonus += 3;
      } else {
         vowelBonus +=1;
      }
   }
   return vowelBonus
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let score = 0
   
   for (let i = 0; i < word.length; i++) {
      score += newPointStructure[word[i]] 
    }

    return score
}

const scoringAlgorithms = [
   {  name: "Simple Score",
      description: "Each letter is worth 1 point",
      scoringFunction: simpleScorer
},
{     name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scoringFunction: vowelBonusScorer
},
{     name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scoringFunction: scrabbleScorer
   }
]

function scorerPrompt() {
   //console.log(scoringAlgorithms[i]);              //give user info on the scoring methods
   
   for (let i = 0; i < scoringAlgorithms.length; i++) {      
      let userAlgorithm = input.question(`Please enter 0 for Simple Score, 1 for Bonus Vowels, or 2 for Scrabble :`); //ask question
   return scoringAlgorithms[userAlgorithm];
   }
}

function transform(oldPointStructure) {
   const newPointStructure = {};

   for (const pointValue in oldPointStructure) {         //could change pointvalue to something more intuitive if you want
      const letters = oldPointStructure[pointValue];

      for (let i = 0; i < letters.length; i++) {
         const letter = letters[i].toLowerCase();
         newPointStructure[letter] = Number(pointValue);
      }
   }

   return newPointStructure;


};



function runProgram() {
   let word = initialPrompt();
   // console.log(word);
   let score = scrabbleScorer(word);
   // console.log(score + " Is the old score");
   //let simpleScore = simpleScorer(word);
   // console.log(simpleScore + " Is the simple score")
   //let vowelBonus = vowelBonusScorer(word);
   //console.log(vowelBonus);
   let selectedAlgorithm = scorerPrompt();
   console.log(`The score for ${word} is : ${selectedAlgorithm.scoringFunction(word)}`)
   
   //console.log(newPointStructure)

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
