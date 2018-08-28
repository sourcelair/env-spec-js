var button = document.getElementById("myButton");
button.addEventListener("click", function getHTML() {
  envSpec
    .parse(inputTextArea.value)
    .then(entries => entries.html())
    .then(html => (outputTextArea.value = html))
    .catch(error => (outputTextArea.value = " "));

  envSpec
    .parse(inputTextArea.value)
    .then(entries => entries.html())
    .then(html => (document.getElementById("env-spec-form").innerHTML = html))
    .catch(
      error =>
        (document.getElementById("env-spec-form").innerHTML = error.message)
    );
});

var button2 = document.getElementById("myButton2");
button2.addEventListener("click", function serializeForm() {
  const form = document.getElementById("env-spec-form");
  envSpec
    .serializeForm(form)
    .then(
      entries => document.getElementById("env-spec-form-serialized").innerHTML = entries.join("\n").toString()
    );
});
