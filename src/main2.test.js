const envSpecToHTML = require('./main.js');
const testEnv2 = 'DATABASaaE_URL\nφφADMIN_EMAIL\nDEBUG';

test('String containing with not only uppercase latin letters/digits/underscore', () => {
  expect(envSpecToHTML(testEnv2)).toEqual(
  '<label for="env_spec_debug">DEBUG</label>\n'+
  '<input id="env_spec_debug" name="debug" />\n');
});
