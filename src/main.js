//function that checks if the env value is valid
//value cannot start with a digit and must only contain alphanumeric characters or an underscore
const checkValidationOfValues = envSpecString => {
  const validTypes = [
    "color",
    "date",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "tel",
    "text",
    "time",
    "url",
    "week"
  ];
  const alphanumericThatDoesNotStartWithDigit = /^[A-Z_][0-9A-Z_]*$/;
  let envValArray = parseVarFromType(envSpecString.trim().split("\n")); //split lines based on \n character and parse them
  let checkValidation = true;
  //envValArray is a two-dimensional array containing only the types and variables
  //element[0] is the variable e.g. ADMIN_EMAIL
  //element[1] is the type e.g. test
  envValArray = envValArray.filter(element => {
    //check for valid variables AND types or restricted choices
    if (
      element[0].match(alphanumericThatDoesNotStartWithDigit) &&
      validTypes.includes(element[1])
    ) {
      //in case value has valid type
      element[2] = 0; //0 constant that declares what should be printed for an element with type
      return element;
    }
    // in case value has restricted choices (indicated by "[]" ,we should split them
    else if (
      element[0].match(alphanumericThatDoesNotStartWithDigit) &&
      element[1][0] === "[" &&
      element[1][element[1].length - 1] === "]"
    ) {
      element[1] = element[1].substring(1, element[1].length - 1).split(",");
      element[2] = 1; //1 constant that declares what should be printed for an element with restricted choices
      return element;
    } else {
      checkValidation = false;
    }
  });

  //in case of one or more invalid variables or types, return error
  if (checkValidation === true) {
    return envValArray;
  } else {
    return null;
  }
};

//function that separates the variables from their types and returns them as a two-dimensional array
const parseVarFromType = envSpecAsArray => {
  return (envSpecAsArray = envSpecAsArray.map(element => {
    if (element.includes(":")) {
      element = element.split(":");
      return [element[0].trim(), element[1].trim()];
    } else {
      //if untyped environmental variable set default as text
      return [element.trim(), "text"];
    }
  }));
};

//function that returns the HTML code as a string
//envValues is a two-dimensional array containing the variable name and its type
const outputHTML = envValues => {
  //create HTML format
  if (envValues) {
    envValues = envValues.map(element => {
      switch (element[2]) {
        case 0: //if element is value with type
          toPrint =
            `<label for="env_spec_${element[0].toLowerCase()}">${
              element[0]
            }</label>\n` +
            `<input id="env_spec_${element[0].toLowerCase()}" name="${element[0].toLowerCase()}" type="${
              element[1]
            }" />\n`;
          return toPrint;

        case 1:
          //if element is value with restricted choices
          toPrint =
            `<label for="env_spec_admin_${element[0].toLowerCase()}">${
              element[0]
            }</label>\n` +
            `<select id="env_spec_admin_${element[0].toLowerCase()}" name="admin_${element[0].toLowerCase()}">\n`;
          for (let i = 0; i < element[1].length; i++) {
            //print text for every option
            toPrint =
              toPrint +
              `  <option value="${element[1][i]}">${element[1][i]}</option>\n`;
          }
          toPrint += `</select>\n`;
          return toPrint;
      }
    });
    //return as string value
    return envValues.join("");
  }
  //in case of syntax error , print HTML format
  return "Error:Wrong Syntax";
};

//function for final output
const envSpecToHTML = envSpec => {
  return outputHTML(checkValidationOfValues(envSpec));
};

module.exports = envSpecToHTML;
