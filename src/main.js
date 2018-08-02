//function that checks if each env entry is valid
//environmental variable of entry cannot start with a digit and must only contain alphanumeric characters or an underscore
//type of entry must be valid
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
  const genericForCheckingRestrChoicesSyntax = /^\[(.*)\]$/;

  let envSpecLines = parseVarFromType(envSpecString.trim().split("\n")); //split lines based on \n character and parse them
  let checkValidation = true;
  //envSpecEntries is an array containing entries with their and type or choices
  //element.name is the variable e.g. ADMIN_EMAIL
  //element.type is the type e.g. test or null
  //element.choices will contain the given options or null
  envSpecEntries = envSpecLines.map(element => {
    if (
      //in case environmental variable is valid and entry has a valid type
      element.name.match(alphanumericThatDoesNotStartWithDigit) &&
      validTypes.includes(element.type)
    ) {
      return element;
    }
    //in case environmental variable is valid and entry has restricted choices (indicated by "[]" ,we should split them
    else if (
      element.name.match(alphanumericThatDoesNotStartWithDigit) &&
      element.type.match(genericForCheckingRestrChoicesSyntax)
    ) {
      element.choices = element.type
        .match(genericForCheckingRestrChoicesSyntax)[1]
        .split(",");
      element.type = null;
      return element;
    }
    //in case of a syntax error in any cases of the above
    else {
      checkValidation = false;
    }
  });

  //in case of one or more invalid variables or types, return error
  if (checkValidation === true) {
    return envSpecEntries;
  } else {
    return null;
  }
};

//function that separates the variables from their types and returns them as an array
const parseVarFromType = envSpecAsArray => {
  return (envSpecAsArrayParsed = envSpecAsArray.map(element => {
    //in case of typed variable or given restricted choices
    if (element.includes(":")) {
      element = element.split(":");
      let entry = {
        name: element[0].trim(),
        type: element[1].trim(),
        choices: null
      };
      return entry;
    }
    //in case of untyped variable , give default type
    else {
      let entry = {
        name: element.trim(),
        type: "text",
        choices: null
      };
      return entry;
    }
  }));
};

//function that creates the render label for the output outputHTML
const renderLabelForEntry = name => {
  return (labelToPrint = `<label for="env_spec_${name.toLowerCase()}">${name}</label>\n`);
};

//function that returns the HTML code as a string
//envSpecEntriesArray is an array containing entries with their variable name and its type or restricted choices
const outputHTML = envSpecEntriesArray => {
  //create HTML format if there is not a syntax error
  //in case of syntax error envSpecEntriesArray is null
  if (envSpecEntriesArray) {
    envSpecEntriesToPrint = envSpecEntriesArray.map(element => {
      toPrint = renderLabelForEntry(element.name);
      //if element has valid type
      if (element.type) {
        toPrint += `<input id="env_spec_${element.name.toLowerCase()}" name="${element.name.toLowerCase()}" type="${
          element.type
        }" />\n`;
        return toPrint;
      } else if (element.choices) {
        //if element is value with restricted choices
        toPrint += `<select id="env_spec_${element.name.toLowerCase()}" name="${element.name.toLowerCase()}">\n`;
        for (let i = 0; i < element.choices.length; i++) {
          //print text for every option
          toPrint =
            toPrint +
            `  <option value="${element.choices[i]}">${
              element.choices[i]
            }</option>\n`;
        }
        toPrint += `</select>\n`;
        return toPrint;
      }
    });
    //return as string value
    return envSpecEntriesToPrint.join("");
  }
  //in case of syntax error , print HTML format
  return "Error:Wrong Syntax";
};

//function for final output
const envSpecToHTML = envSpec => {
  return outputHTML(checkValidationOfValues(envSpec));
};

module.exports = envSpecToHTML;
