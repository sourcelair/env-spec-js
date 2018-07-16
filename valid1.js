const testEnv = '  DATABASE_URL\n ADMIN_EMAIL   1DEBUG\n  aad\n';
let envValues = []; //save env fields
let temp = testEnv; //strinf for parsing

//PARSING
for(let i = 0;i<=temp.length;i++){ //until the string ends
    temp = temp.trim();
    blankIndex = temp.indexOf('\n');
    blankIndex2 = temp.indexOf(' ');
    if (blankIndex<0) {
      index = blankIndex2;
    }else if (blankIndex2<0){
      index= blankIndex;
    }else if(blankIndex<blankIndex2){
      index = blankIndex;
    }else{
      index = blankIndex2;
    }

    //in case of new word
    if(index>0 ){
        value = temp.substring(0,index);
        value.trim();
        temp=temp.substring(index+1,temp.length);
        firstChar = value.charAt(0);
        if ('0123456789'.indexOf(firstChar) !== -1) {console.log('ERROR:Value cannot start with a number');}
        else{envValues.push(value)};
    }
}
//last word
temp.trim() //mporei kai na min xreiazetai ------------------------------
envValues.push(temp);
console.log(envValues);

/*elegxos an periexei to value kati ektos apo ayta poy ziataei*/
//HTML FORM
