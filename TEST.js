let greeting = "   Hello world!   ";

console.log(greeting);
// expected output: "   Hello world!   ";

console.log(greeting.trim());
// expected output: "Hello world!";

const testEnv = '    DATABASE_URL\nADMIN_EMAIL  DEBUG\nAD';
let envValues = [];
let temp = testEnv;
temp = temp.trim();
console.log(temp);
