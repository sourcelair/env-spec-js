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
  const allowedTypes = validTypes.map(validType => `"${validType}"`).join(",");

  let envSpecLines = parseVarFromType(envSpecString.trim().split("\n")); //split lines based on \n character and parse them
  //envSpecEntries is an array containing entries with their and type or choices
  //element.name is the variable e.g. ADMIN_EMAIL
  //element.type is the type e.g. test or null
  //element.choices will contain the given options or null
  //element.defaultValue is the default Value if there was a given one
  envSpecEntries = envSpecLines.map(element => {
    if (element.defaultValue === "") {
      //this would happen in case input is "DATA: number = " or "DATA :[4,2] = "
      throw new EnvSpecSyntaxError(
        "Expected default value after =",
        element.name
      );
    } else if (!element.name.match(alphanumericThatDoesNotStartWithDigit)) {
      throw new EnvSpecSyntaxError(
        "Invalid variable name; it should contain only latin alphanumeric characters, underscores and not start with a digit.",
        element.name
      );
    } else if (
      !validTypes.includes(element.type) &&
      !element.type.match(genericForCheckingRestrChoicesSyntax)
    ) {
      throw new EnvSpecSyntaxError(
        `Invalid variable type; it should be one of (${allowedTypes}) and \"=\" if there is a default value`,
        element.name
      );
    } else {
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
        element.choices = element.choices.map(choice => {
          if (choice.trim() === "") {
            //check for wrong syntax "DATA: [1, ]"
            throw new EnvSpecSyntaxError(
              'Expected choice after ",".',
              element.name
            );
          }
          return choice.trim(); //trim valid choices
        });
        element.type = null;
        //if there is a default value, check if it is valid
        if (
          element.defaultValue &&
          !element.choices.includes(element.defaultValue)
        ) {
          throw new EnvSpecSyntaxError(
            "Invalid default value; it is not included in the provided restricted choices.",
            element.name
          );
        }
        return element;
      }
      //in case of a syntax error in any cases of the above
      else {
        throw new EnvSpecSyntaxError("Obscure syntax error!", element.name);
      }
    }
  });

  //in case all variables were valid return array of entry objects
  return envSpecEntries;
};

/**
 * Class representing a Syntax Error object
 * @class
 * @augments Error
 */
class EnvSpecSyntaxError extends Error {
  /**
   * @param {string} message of error that occured
   *@param {string} environmentalVar is the name of the environmental variable that was responsible for this error
   */
  constructor(message, environmentalVar) {
    super("EnvSpecSyntaxError: " + message);
    this.nameOfVar = environmentalVar;
  }
}
/**
 * Class representing an Entry
 * @class
 */
class Entry {
  /**
   * @param {string} name environmental variable e.g. DATABASE_URL
   *@param {string|null} type type of variable e.g. url
   *@param {Array|null} choices given restricted choices e.g. [data,info,1]
   *@param {string|null} defaultValue given default value e.g. data
   *@param {string} comment given comment using the # symbol
   */
  constructor(name, type, choices, defaultValue, comment) {
    this.name = name;
    this.type = type;
    this.choices = choices;
    this.defaultValue = defaultValue;
    this.comment = comment;
  }

  /** @method html
   * @summary Returns the rendered HTML for the given entry
   * @returns {promise} that resolves to string
   */
  html() {
    const entry = outputHTML([this]);
    return new Promise(function(resolve, reject) {
      if (entry) {
        resolve(entry);
      } else {
        reject("Error:Wrong Syntax");
      }
    });
  }
}

/**
 * Class representing an array of entry objects
 * @class
 */
class EntryList {
  /**
   * @param {Array} entries includes {@link Entry} objects
   */
  constructor(entries) {
    this.entries = entries;
  }

  /** @method html
   * @summary Returns the rendered HTML for the given array of entries
   * @returns {promise} that resolves to string
   */
  html() {
    const entriesHTMLPromises = this.entries.map(entry => entry.html());
    return new Promise(function(resolve, reject) {
      Promise.all(entriesHTMLPromises)
        .then(values => resolve(values.join("")))
        .catch(error => reject(error));
    });
  }
}

/** @function parseVarFromType
 * @summary Separates the variables' name from their types, their restricted choices and their default values and returns them as an array of {@link Entry} objects.
 * @desc Parses each line according to existing symbols such as : or = and create an entry object for each line.If a feature do not exist,its field will be null.
 * @param {Array} envSpecAsArray  array with the slpitted lines of the .env file based on the \n symbol
 * @returns {Array} An array containing entry objects.
 */
const parseVarFromType = envSpecAsArray => {
  const commentRegexp = /#(.+)$/;

  return envSpecAsArray.filter(line => !line.startsWith("#")).map(element => {
    //in case of existing comment ignore what's after the "#" symbol
    const commentMatch = element.match(commentRegexp);
    const comment = commentMatch ? commentMatch[1].trim() : null;
    element = commentMatch ? element.split("#")[0] : element;

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
          element[1][1].trim(),
          comment
        );
      }
      //else if there is just a type
      return new Entry(
        element[0].trim(),
        element[1].trim(),
        null,
        null,
        comment
      );
    }
    //in case of untyped variable , give default type
    else {
      return new Entry(element.trim(), "text", null, null, comment);
    }
  });
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
      } else if (element.choices) {
        //if element is value with restricted choices
        toPrint += `<select id="env_spec_${element.name.toLowerCase()}" name="${element.name.toLowerCase()}">\n`;
        for (choice of element.choices) {
          //print text for every option
          if (choice === element.defaultValue) {
            //in case defaultValue was given
            toPrint =
              toPrint +
              `  <option value="${choice}" selected>${choice}</option>\n`;
          } else {
            toPrint =
              toPrint + `  <option value="${choice}">${choice}</option>\n`;
          }
        }
        toPrint += `</select>\n`;
      }
      //in case of existing comment add it to toPrint value
      if (element.comment) {
        toPrint = toPrint + `<small>${element.comment}</small>\n`;
      }
      return toPrint;
    });
    //return as string value
    return envSpecEntriesToPrint.join("");
  }
};

/** @function parse
 * @desc transforms .env file to an array of valid values or an error message
 * @param {string} envSpec the .env file given in string format
 * @returns {promise} that resolves to an array of entry objets
 */
const parse = envSpecTxt => {
  //returns promise ,when resolved returns EntryList OBJECT
  return new Promise(function(resolve, reject) {
    try {
      const entriesList = new EntryList(checkValidationOfValues(envSpecTxt));
      resolve(entriesList);
    } catch (error) {
      reject(error);
    }
  });
};

/** @function serializeForm
 * @desc transforms a HTML form to an array of variables with their values if given by user
 * @param {HTMLFormElement} form the form completed by the user
 * @returns {promise} that resolves to an array of strings
 */
const serializeForm = form => {
  outputForm = [];
  form.querySelectorAll("select,input").forEach(input => {
    outputForm.push({ [input.name.toUpperCase()]: input.value || null });
  });
  return new Promise(function(resolve, reject) {
    resolve(outputForm);
  });
};

module.exports.serializeForm = serializeForm;
module.exports.EnvSpecSyntaxError = EnvSpecSyntaxError;
module.exports.parse = parse;
