function call_snackbar(message, status) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    x.innerHTML = message;
    $("#snackbar").addClass();
    // Add the "show" class to DIV
    x.className = "show snackbar-" + status;
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = ""}, 3000);
  }