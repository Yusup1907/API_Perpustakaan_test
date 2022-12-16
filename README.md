#Soal Logaritma

// Soal No. 1

function reverseAlphabet(str) {
  let alphabet = str.match(/[a-zA-Z]/g);
  let numbers = str.match(/\d/g);
  alphabet = alphabet.reverse();
  let result = alphabet.join('') + numbers.join('');
  return result;
}

console.log(reverseAlphabet("NEGIE1"));


// Soal No. 2

function longest(sentence) {
    const words = sentence.split(' ');
    let longestWord = '';
  
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > longestWord.length) {
        longestWord = words[i];
      }
    }
  
    return longestWord;
  }
  
  const sentence = "Saya sangat senang mengerjakan soal algoritma";
  console.log(longest(sentence)); // mengerjakan
  

// Soal No. 3

// Definisikan array INPUT dan QUERY
var INPUT = ['xc', 'dz', 'bbb', 'dz'];
var QUERY = ['bbb', 'ac', 'dz'];

let output = [];

for (let i = 0; i < QUERY.length; i++) {
  let filtered = INPUT.filter(function(input) {
    return input == QUERY[i];
  });
  output.push(filtered.length);
}

console.log(output);

function solve(INPUT, QUERY) {
  const result = QUERY.map(query => INPUT.filter(input => input === query));
  return result.map(arr => arr.length);
}

var INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

console.log(solve(INPUT, QUERY));


// Soal No.4 

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];

let diagonal1 = 0;
let diagonal2 = 0;

for (let i = 0; i < matrix.length; i++) {
  diagonal1 += matrix[i][i];
  
  diagonal2 += matrix[i][matrix.length - i - 1];
}

console.log("Diagonal pertama: " + diagonal1);
console.log("Diagonal kedua: " + diagonal2);

const selisih = diagonal1 - diagonal2;
console.log("Selisih: " + selisih);
