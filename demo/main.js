var button = document.getElementById("myButton");
button.addEventListener("click", function getHTML() {
  envSpec
    .parse(inputTextArea.value)
    .then(entries => entries.html())
    .then(html => outputTextArea.value = html)
    .catch(error => error);

    envSpec
      .parse(inputTextArea.value)
      .then(entries => entries.html())
      .then(html => document.getElementById("finalOutput").innerHTML = html)
      .catch(error =>   document.getElementById("finalOutput").innerHTML = error)
});
