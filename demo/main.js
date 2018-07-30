function getHTML(){
  console.log("asdadS");
  var textarea = document.getElementById("inputArea");
  var textarea2 = document.getElementById("outputArea");
  outputArea.value =  envSpec(inputArea.value) ;
  document.getElementById("finalOutput").innerHTML = envSpec(inputArea.value) ;
}
