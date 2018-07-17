const testEnv = '  DATABASE_URL\nADMIN_EMAIL  DEBUG';
let envValues = []; //save env fields
let tempStringToParse = testEnv; //string for parsing
let regExpA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';  //valid chars

console.log(' TURNING \n');
console.log(testEnv);
console.log('\n  TO  \n');

//PARSING
for(let i = 0;i<=tempStringToParse.length;i++){ //until the string ends
    tempStringToParse = tempStringToParse.trim(); //remove whitespace
    blankIndex = tempStringToParse.indexOf('\n');//new value will be found after '\n' or whitespace
    blankIndex2 = tempStringToParse.indexOf(' ');
    if (blankIndex<0 || blankIndex>blankIndex2 ) { //cases of indexes , the index of our new word is the smaller positive one
      index = blankIndex2;
    }else{
      index = blankIndex;
    }

    //in case of new word
    if(index>0 ){
        parsedValue = tempStringToParse.substring(0,index); //parsedValue is our new word
        tempStringToParse=tempStringToParse.substring(index+1,tempStringToParse.length);//keep the rest values to be parsed
        //validaton check
        checkValid = false;
        firstChar = parsedValue.charAt(0);
        for(let j=0; j<=parsedValue.length; j++){
          if (regExpA.indexOf(parsedValue.charAt(j))<0){
            checkValid=true;
            break;
          }
        }

        if(checkValid===true){console.log('ERROR:Values cannot contain number or lowercase letters');}
        else if ('0123456789'.indexOf(firstChar) !== -1) {console.log('ERROR:Value cannot start with a number');}
        else{envValues.push(parsedValue)}; //if value is valid,keep it
    }
}
//last word is the rest of the string,same logic
firstChar = tempStringToParse.charAt(0);
checkValid = false;
for(let j=0; j<=tempStringToParse.length; j++){
  if (regExpA.indexOf(tempStringToParse.charAt(j))<0){
    checkValid=true;
    break;
  }
}
if(checkValid===true){console.log('ERROR:Values cannot contain number or lowercase letter');}
else if ('0123456789'.indexOf(firstChar) !== -1) {console.log('ERROR:Value cannot start with a number');}
else{envValues.push(tempStringToParse)};


//create HTML output
outputString = "";

envValues.forEach(element =>{
  outputString = outputString+"<label for=\"env_spec_"+element.toLowerCase()+"\">"+element+"</label>"+"\n";
  outputString = outputString + "<input id=\"env_spec_"+element+"\" name=\""+element+ "\" />"+"\n";
})
console.log(outputString);
