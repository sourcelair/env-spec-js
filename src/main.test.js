const envSpecToHTML = require('./main.js');
const testEnv1 = 'DATABASE_URL\n1ADMIN_EMAIL\nDEBUG';

test('String starting with number', () => {
  expect(envSpecToHTML(testEnv1)).toEqual('<label for="env_spec_database_url">DATABASE_URL</label>\n'+
  '<input id="env_spec_database_url" name="database_url" />\n'+
  '<label for="env_spec_debug">DEBUG</label>\n'+
  '<input id="env_spec_debug" name="debug" />\n');
});
