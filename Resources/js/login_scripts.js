const host = 'https://nexus-oauth.azurewebsites.net'


function OnClickLogin() {
    var inputUser = document.getElementById('inputUser');
    var inputPas = document.getElementById('inputPassword');

    const URL = host + '/api/Login/FirstStep?web_page=false&user=' + inputUser.value;

    var firstStepKey;
    var firstStepID;
    var valid;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.mode = 'no-cors';
    xhr.orgin = 'Nexus Web Site';
    xhr.responseType = 'json';
    xhr.onload = function () {
        var status = xhr.status;
        if (status === 200) {
            firsStepKey = xhr.response.key;
            firstStepID = xhr.response.id;
            valid = xhr.response.valid;
        }
        else {
            valid = false;
            setLoginError('Username or e-mail invalid or not exists!');
        }

        if (valid) {
            URL = host + '/api/Login/SecondStep?web_page=false&user=' + inputUser.value;
        }
    };
    xhr.send();
}

function setLoginError(text) {
    var inputUser = document.getElementById('inputUser')
    var userError = document.getElementById('userError')
    inputUser.classList.add('error');
    userError.append(text);
}

function setPasswordError(text) {
    var inputUser = document.getElementById('inputPassword')
    var userError = document.getElementById('passwordError')
    inputUser.classList.add('error');
    userError.append(text);
}



