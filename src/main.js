const testEnv = "DATABASE_URL: turl\n2ADMIN_EMAIL:email\nDEBUG\n";

//function that checks if the env value is valid
//value cannot start with a digit and must only contain alphanumeric characters or an underscore
const checkValidationOfValues = envSpecString => {
  const validValues = ['color','date','datetime-local','email','month','number','password','tel','text','time','url','week','default'];
  const alphanumericThatDoesNotStartWithDigit = /^[A-Z_][0-9A-Z_]*$/;
  let envValArray = envSpecString.split("\n"); //split lines based on \n character

  tempArray = parseVarFromVal(envValArray);
  let envVariablesCheck = tempArray[0];
  let envValuesCheck = tempArray[1];
  for(let i=0 ; i<=envVariablesCheck.length-1; i++){
    if((!envVariablesCheck[i].match(alphanumericThatDoesNotStartWithDigit)) || (!validValues.includes(envValuesCheck[i]))){
      envVariablesCheck.splice(i,1);
      envValuesCheck.splice(i,1);
      i--;
    }
  }
  return [envVariablesCheck,envValuesCheck];
};

const parseVarFromVal = envSpecAsArray => {
  let envValues = [];
  let envVariables = [];
  let parsPos = -1;
  envSpecAsArray.forEach( element =>{
    parsPos = element.indexOf(":");
    if(parsPos<0){
      parsPos=element.length
      envVariables.push(element.substring(0,parsPos).trim());
      envValues.push('default');
    }
    else{
      envVariables.push(element.substring(0,parsPos).trim());
      envValues.push(element.substring(parsPos+1,).trim());
    }
  })
  return [envVariables,envValues];
};


//function that returns the HTML code as a string
const outputHTML = envValues => {
  //create HTML format
  envValues = envValues[0].map(
    element =>
      `<label for="env_spec_${element.toLowerCase()}">${element}</label>\n` +
      `<input id="env_spec_${element.toLowerCase()}" name="${element.toLowerCase()}" />\n`
  );
  //return as string value
  return envValues.join("");
};


//function that calls functions for final output
const envSpecToHTML = envSpec => {
  return outputHTML(checkValidationOfValues(envSpec));
};

//console.log(envSpecToHTML(testEnv));
envSpecToHTML(testEnv)
