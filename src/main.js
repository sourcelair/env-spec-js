//function that checks if the env value is valid
//value cannot start with a digit and must only contain alphanumeric characters or an underscore
const checkValidationOfValues = envSpecString => {
  const validValues = ['color','date','datetime-local','email','month','number','password','tel','text','time','url','week','default'];
  const alphanumericThatDoesNotStartWithDigit = /^[A-Z_][0-9A-Z_]*$/;
  let envValArray = parseVarFromVal(envSpecString.split("\n")); //split lines based on \n character and parse them

  return envValArray = envValArray.filter( element =>{ //check for valid variables AND values
    if(element[0].match(alphanumericThatDoesNotStartWithDigit)&&(validValues.includes(element[1]))){
      return element;
    }
  })
};

//function that separates the variables from their values and returns them as separated arrays
const parseVarFromVal = envSpecAsArray => {
  let envArrayParsed = [];
  let parsPos = -1;
  return envArrayParsed = envSpecAsArray.map( element =>{
    parsPos = element.indexOf(":");
    if(parsPos<0){
      parsPos=element.length
      return [element.substring(0,parsPos).trim(),'default'];
    }
    else{
      return [element.substring(0,parsPos).trim(),element.substring(parsPos+1,).trim()];
    }
  })
};


//function that returns the HTML code as a string
const outputHTML = envValues => {
  //create HTML format
  envValues = envValues.map(
    element =>
      `<label for="env_spec_${element[0].toLowerCase()}">${element[0]}</label>\n` +
      `<input id="env_spec_${element[0].toLowerCase()}" name="${element[0].toLowerCase()}" />\n`
  );
  //return as string value
  return envValues.join("");
};


//function that calls functions for final output
const envSpecToHTML = envSpec => {
  return outputHTML(checkValidationOfValues(envSpec));
};

console.log(envSpecToHTML("DATABASE_URL: notgood\nADMIN_EMAIL\nDEBUG :   text"));
module.exports = envSpecToHTML;
