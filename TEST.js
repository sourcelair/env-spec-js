/*let greeting = "   Hello world!   ";

console.log(greeting);
// expected output: "   Hello world!   ";

console.log(greeting.trim());
// expected output: "Hello world!";

const testEnv = '    DATABASE_URL\nADMIN_EMAIL  DEBUG\nAD';
let envValues = [];
let temp = testEnv;
temp = temp.trim();
console.log(temp);
*/
/*
console.log('start');
let regExpA = /ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/;
parsedValue = 'DEMssON';
checkValid = false;
firstChar = parsedValue.charAt(0);
for(let j=0; j<=parsedValue.length; j++){
  if (!(parsedValue.charAt(j).match(regExpA))){
    console.log(parsedValue.charAt(j))
    checkValid=true;
    break;
  }
}
if(checkValid===true){console.log('ERROR:Values cannot contain number or lowercase letters');}
else if ('0123456789'.indexOf(firstChar) !== -1) {console.log('ERROR:Value cannot start with a number');}



*/


regExp = /ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_/;
string = "a";
check = string.match(regExp);
for (let i =0;i<=string.length;i++){

  temp=string[i];
  console.log(temp);
  if(temp.match(regExp)){
    console.log('wrong');
  }
}
