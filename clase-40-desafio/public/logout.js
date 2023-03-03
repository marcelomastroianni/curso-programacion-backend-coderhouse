

//get username from querystring
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

let txtWelcomeMessage = document.getElementById('txtWelcomeMessage');
txtWelcomeMessage.innerHTML = "Hasta luego " + username + "!";




setTimeout(function () {
    window.location.href = '/login.html';
}, 2000);
