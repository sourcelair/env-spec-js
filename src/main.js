/** @method checkValidationOfValues
 * @summary Checks if each env entry of .env file is valid.
 * @description Environmental variable name of entry cannot start with a digit and must only contain alphanumeric characters or an underscore.
 *  Type of entry must be valid or null.
 *  Restricted choices and default values of entry have specific syntax or are null.
 *  Uses parsing function {@link parseVarFromType} to get entries.
 * @param {string} envSpecString the whole .env file as a string
 * @returns {Array|null} The array of all valid entries  or null if something was invalid.
 */
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
  //element.defaultValue is the default Value if there was a given one
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

/**
 * Class representing an Entry
 * @class
 */
class Entry {
  /**
   * @param {string} envName environmental variable e.g. DATABASE_URL
   *@param {string|null} envType type of variable e.g. url
   *@param {Array|null} envChoices given restricted choices e.g. [data,info,1]
   *@param {string|null} envDefaultVal given default value e.g. data
   */
  constructor(envName, envType, envChoices, envDefaultVal) {
    this.name = envName;
    this.type = envType;
    this.choices = envChoices;
    this.defaultValue = envDefaultVal;
  }
}

/** @function parseVarFromType
 * @summary Separates the variables' name from their types, their restricted choices and their default values and returns them as an array of {@link Entry} objects.
 * @desc Parses each line according to existing symbols such as : or = and create an entry object for each line.If a feature do not exist,its field will be null.
 * @param {Array} envSpecAsArray  array with the slpitted lines of the .env file based on the \n symbol
 * @returns {Array} An array containing entry objects.
 */
const parseVarFromType = envSpecAsArray => {
  return (envSpecAsArrayParsed = envSpecAsArray.map(element => {
    //in case of typed variable or given restricted choices
    if (element.includes(":")) {
      element = element.split(":");
      //if there is a default value indicated by an existing "="
      if (element[1].includes("=")) {
        element[1] = element[1].split("=");
        return new Entry(
          element[0].trim(),
          element[1][0].trim(),
          null,
          element[1][1].trim()
        );
      }
      //else if there is just a type
      return new Entry(element[0].trim(), element[1].trim(), null, null);
    }
    //in case of untyped variable , give default type
    else {
      return new Entry(element.trim(), "text", null, null);
    }
  }));
};

/** @function renderLabelForEntry
 * @desc Creates the render for the {@link outputHTML} function.
 * @param {string} name the given environmental variable name
 * @returns {string}
 */
const renderLabelForEntry = name => {
  return (labelToPrint = `<label for="env_spec_${name.toLowerCase()}">${name}</label>\n`);
};

/** @function outputHTML
 * @summary Renders an {@link Entry} object array to HTML code as a string.
 * @desc Checks which attributes of the object are null and which they are not , so the proper message is rendered.
 * @param {Array|null} envSpecEntriesArray is an array containing entry objects
 * @returns {string}
 */
const outputHTML = envSpecEntriesArray => {
  //create HTML format if there is not a syntax error
  //in case of syntax error envSpecEntriesArray is null
  if (envSpecEntriesArray) {
    envSpecEntriesToPrint = envSpecEntriesArray.map(element => {
      toPrint = renderLabelForEntry(element.name);
      //if element has valid type
      if (element.type) {
        toPrint +=
          `<input id="env_spec_${element.name.toLowerCase()}" name="${element.name.toLowerCase()}"` +
          ` type="${element.type}"`;
        if (element.defaultValue) {
          toPrint += ` value="${element.defaultValue}"`;
        }
        toPrint += ` />\n`;
        return toPrint;
      } else if (element.choices) {
        //if element is value with restricted choices
        toPrint += `<select id="env_spec_${element.name.toLowerCase()}" name="${element.name.toLowerCase()}">\n`;
        for (choice of element.choices) {
          //print text for every option
          toPrint =
            toPrint + `  <option value="${choice}">${choice}</option>\n`;
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

/** @function envSpecToHTML
 * @desc gives final output using {@link outputHTML} and {@link checkValidationOfValues}
 * @param {string} envSpec the .env file given in string format
 * @returns {string} HTML code
 */
const envSpecToHTML = envSpec => {
  return outputHTML(checkValidationOfValues(envSpec));
};

module.exports = envSpecToHTML;
