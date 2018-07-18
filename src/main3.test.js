const envSpecToHTML = require('./main.js');
const testEnv3 = 'DATABASE_URL\nADMIN_EMAIL\nDEBUG';

test('All 3 values should pass', () => {
  expect(envSpecToHTML(testEnv3)).toEqual('<label for="env_spec_database_url">DATABASE_URL</label>\n'+
  '<input id="env_spec_database_url" name="database_url" />\n'+
  '<label for="env_spec_admin_email">ADMIN_EMAIL</label>\n'+
  '<input id="env_spec_admin_email" name="admin_email" />\n'+
  '<label for="env_spec_debug">DEBUG</label>\n'+
  '<input id="env_spec_debug" name="debug" />\n');
});
