const testEnv = 'DATABASE_URL\nADMIN_EMAIL\nDEBUG';
const alphanumericThatDoesNotStartWithDigit = /^[A-Z_][0-9A-Z_]*$/;

//PARSING
let envValues = testEnv.split('\n');//split lines based on \n character
if(envValues[envValues.length-1]==='\n'){delete(envValues[envValues.length-1])}
envValues = envValues.filter(element =>{
  if(element.match(alphanumericThatDoesNotStartWithDigit)){//keep valid values
    return element;
  }
  else{
    console.log('Error:Wrong value.')
  }
})

//create HTML output
outputString = "";
envValues.forEach(element =>{
  outputString += `<label for="env_spec_${element.toLowerCase()}">${element}</label>\n`;
  outputString += `<input id="env_spec_${element.toLowerCase()}" name="${element.toLowerCase()}" />\n`;
})
console.log(outputString);
