const envSpecToHTML = require("./main.js");

test("Valid input with type", () => {
  const testEnv = "DATABASE_URL\nADMIN_EMAIL:email";
  expect(envSpecToHTML(testEnv)).toEqual(
    '<label for="env_spec_database_url">DATABASE_URL</label>\n' +
      '<input id="env_spec_database_url" name="database_url" type="text" />\n' +
      '<label for="env_spec_admin_email">ADMIN_EMAIL</label>\n' +
      '<input id="env_spec_admin_email" name="admin_email" type="email" />\n'
  );
});

test("Valid input with restricted choices", () => {
  const testEnv = "DATABASE_URL\nNUMBER :[0,1]";
  expect(envSpecToHTML(testEnv)).toEqual(
    '<label for="env_spec_database_url">DATABASE_URL</label>\n' +
      '<input id="env_spec_database_url" name="database_url" type="text" />\n' +
      `<label for="env_spec_number">NUMBER</label>\n` +
      `<select id="env_spec_number" name="number">\n` +
      `  <option value="0">0</option>\n` +
      `  <option value="1">1</option>\n` +
      `</select>\n`
  );
});

test("Valid input with default value for type", () => {
  const testEnv = "DEBUG: [0, 1]=1";
  expect(envSpecToHTML(testEnv)).toEqual(
    `<label for="env_spec_debug">DEBUG</label>\n` +
      `<select id="env_spec_debug" name="debug">\n` +
      `  <option value="0">0</option>\n` +
      `  <option value="1" selected>1</option>\n` +
      `</select>\n`
  );
});

test("Valid input with default value for restricted choices", () => {
  const testEnv = "DATABASE_URL: email = test@mail.com";
  expect(envSpecToHTML(testEnv)).toEqual(
    `<label for="env_spec_database_url">DATABASE_URL</label>\n` +
      `<input id="env_spec_database_url" name="database_url" type="email" value="test@mail.com" />\n`
  );
});

test("Valid input with comment,middle of line", () => {
  const testEnv = "DATABASE_URL: email = test@mail.com #comment";
  expect(envSpecToHTML(testEnv)).toEqual(
    `<label for="env_spec_database_url">DATABASE_URL</label>\n` +
      `<input id="env_spec_database_url" name="database_url" type="email" value="test@mail.com" />\n` +
      `<small>comment</small>\n`
  );
});

test("Valid input with comment, start of line", () => {
  const testEnv =
    "#DATABASE_URL: email = test@mail.com\nDATABASE_URL: email = test@mail.com";
  expect(envSpecToHTML(testEnv)).toEqual(
    `<label for="env_spec_database_url">DATABASE_URL</label>\n` +
      `<input id="env_spec_database_url" name="database_url" type="email" value="test@mail.com" />\n`
  );
});

test("Invalid environmental variable : starts with number", () => {
  const testEnv = "1DATABASE_URL\nADMIN_EMAIL:email";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Invalid environmental variable : contains non alphanumeric characters", () => {
  const testEnv = "DATABASE_URLαα\nADMIN_EMAIL:email";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Invalid environmental variable : contains lowercase letters", () => {
  const testEnv = "database_url\nADMIN_EMAIL:email";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Invalid type", () => {
  const testEnv = "\nADMIN_EMAIL: notgood";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Untyped environmental variable", () => {
  const testEnv = "DATABASE_URL\nADMIN_EMAIL:email";
  expect(envSpecToHTML(testEnv)).toEqual(
    '<label for="env_spec_database_url">DATABASE_URL</label>\n' +
      '<input id="env_spec_database_url" name="database_url" type="text" />\n' +
      '<label for="env_spec_admin_email">ADMIN_EMAIL</label>\n' +
      '<input id="env_spec_admin_email" name="admin_email" type="email" />\n'
  );
});

test("Multiple invalid variables and types", () => {
  const testEnv3 = "DATABASE_URLαα: αα\nADMIN_EMAIL:\n1DEBUG";
  expect(envSpecToHTML(testEnv3)).toEqual("Error:Wrong Syntax");
});

test("Wrong Syntax for restricted choices", () => {
  const testEnv = "DATABASE_URL\nADMIN_EMAIL:email\nDATA:[0,";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Wrong Syntax for restricted choices2", () => {
  const testEnv = "DEBUG: [0, ]";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Wrong Syntax for default value for type", () => {
  const testEnv = "DATABASE_URL\nADMIN_EMAIL:email\nDATA: text dasdsa";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Wrong Syntax for default value for type", () => {
  const testEnv = "DEBUG: [0, 1]=4";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});

test("Wrong Syntax for default value,missing value", () => {
  const testEnv = "DEBUG: [0, 1]=";
  expect(envSpecToHTML(testEnv)).toEqual("Error:Wrong Syntax");
});
