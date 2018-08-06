var button = document.getElementById("myButton");
button.addEventListener("click", function getHTML() {
  var textarea = document.getElementById("inputTextArea");
  var textarea2 = document.getElementById("outputTextArea");
  outputTextArea.value = envSpec(inputTextArea.value);
  document.getElementById("finalOutput").innerHTML = envSpec(
    inputTextArea.value
  );
});
