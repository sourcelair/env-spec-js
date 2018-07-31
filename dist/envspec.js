(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.envSpec = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
    //check for valid variables AND types
    if (
      element[0].match(alphanumericThatDoesNotStartWithDigit) &&
      validTypes.includes(element[1])
    ) {
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
    envValues = envValues.map(
      element =>
        `<label for="env_spec_${element[0].toLowerCase()}">${
          element[0]
        }</label>\n` +
        `<input id="env_spec_${element[0].toLowerCase()}" name="${element[0].toLowerCase()}" type="${
          element[1]
        }" />\n`
    );
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

},{}]},{},[1])(1)
});
