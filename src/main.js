const testEnv = 'DATABASE_URL\nADMIN_EMAIL\nDEBUG\n';
let tempStringToParse = testEnv; //string for parsing
let regExpA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';  //valid chars

console.log(' TURNING \n');
console.log(testEnv);
console.log('\n  TO  \n');

//PARSING
let envValues = testEnv.split('\n');//split lines based on \n character
envValues = envValues.filter(element =>{
  tempStringToParse = element.trim(); //remove whitespace
  checkValid = false;
  firstChar = element.charAt(0); //check that every character is valid
  for(let j=0; j<=element.length; j++){
    if (regExpA.indexOf(element.charAt(j))<0){
      checkValid=true;
      break;
    }
  }

  if(checkValid===true){
    console.log('ERROR:Values cannot contain number or lowercase letters');}
  else if ('0123456789'.indexOf(firstChar) !== -1) {
    if(firstChar!=''){console.log('ERROR:Value cannot start with a number');}
  }
  else if(element===''){
    console.log('ERROR:Empty space');
  }
  else{
    return element;
  }
})

//create HTML output
outputString = "";
envValues.forEach(element =>{
  outputString += `<label for=\"env_spec_${element.toLowerCase()}\">${element}</label>\n`;
  outputString += `<input id=\"env_spec_${element.toLowerCase()}\" name=\"${element.toLowerCase()}\" />\n`;
})
console.log(outputString);
