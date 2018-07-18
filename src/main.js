const testEnv = 'DATABASE_URL\nADMIN_EMAIL\nDEBUG';
const alphanumericThatDoesNotStartWithDigit = /^[A-Z_][0-9A-Z_]*$/;

//function that checks if the env value is valid
//value cannot start with a digit and must only contain alphanumeric characters or an underscore
function checkValidationOfValues(envSpecString){
  let envValues = envSpecString.split('\n');//split lines based on \n character
  envValues = envValues.filter(element =>{
    if(element.match(alphanumericThatDoesNotStartWithDigit)){//keep valid values
      return element;
    }
  })
  return envValues;
}

//function that returns the HTML code as a string
function outputHTML(envValues){
  let outputString = "";
  envValues.forEach(element =>{
    outputString += `<label for="env_spec_${element.toLowerCase()}">${element}</label>\n`;
    outputString += `<input id="env_spec_${element.toLowerCase()}" name="${element.toLowerCase()}" />\n`;
  })
  return outputString
}

let outputString = outputHTML(checkValidationOfValues(testEnv));
console.log(outputString);
