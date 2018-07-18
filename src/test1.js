const Main = require('./mainAsModule.js');
const testEnv = 'DATABASE_URL\nADMIN_EMAIL\nDEBUG\n11';
console.log('TESTING:\n'+testEnv);
console.log(Main.envSpecToHTML(testEnv));
