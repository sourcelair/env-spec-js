const envSpecToHTML = require("./main.js");

test("Valid input", () => {
  const testEnv = "DATABASE_URL\nADMIN_EMAIL:email";
  expect(envSpecToHTML(testEnv)).toEqual(
    '<label for="env_spec_database_url">DATABASE_URL</label>\n' +
      '<input id="env_spec_database_url" name="database_url" type="text" />\n' +
      '<label for="env_spec_admin_email">ADMIN_EMAIL</label>\n' +
      '<input id="env_spec_admin_email" name="admin_email" type="email" />\n'
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
