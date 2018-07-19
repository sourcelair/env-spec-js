const envSpecToHTML = require('./main.js');

test('String starting with number', () => {
  const testEnv1 = '\n1ADMIN_EMAIL\nDEBUG';
  expect(envSpecToHTML(testEnv1)).toEqual(
  '<label for="env_spec_debug">DEBUG</label>\n'+
  '<input id="env_spec_debug" name="debug" />\n');
});

test('String containing with not only uppercase latin letters/digits/underscore', () => {
  const testEnv2 = 'DATABASaaE_URL\nφφADMIN_EMAIL\nDEBUG\n';
  expect(envSpecToHTML(testEnv2)).toEqual(
  '<label for="env_spec_debug">DEBUG</label>\n'+
  '<input id="env_spec_debug" name="debug" />\n');
});

test('All 3 values should pass', () => {
  const testEnv3 = 'DATABASE_URL\nADMIN_EMAIL\nDEBUG';
  expect(envSpecToHTML(testEnv3)).toEqual('<label for="env_spec_database_url">DATABASE_URL</label>\n'+
  '<input id="env_spec_database_url" name="database_url" />\n'+
  '<label for="env_spec_admin_email">ADMIN_EMAIL</label>\n'+
  '<input id="env_spec_admin_email" name="admin_email" />\n'+
  '<label for="env_spec_debug">DEBUG</label>\n'+
  '<input id="env_spec_debug" name="debug" />\n');
});
