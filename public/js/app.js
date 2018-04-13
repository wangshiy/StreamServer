function xhrHandler (options) {
    var xhr = new XMLHttpRequest();
    var method = options.method || 'GET';
    var url = options.url || '';
    var headers = options.headers || {};
    var errorEventTarget = options.errorEventTarget || options.successEventTarget;
    var errorHandler = options.errorHandler || function(status, responseText) {
 		console.log('%c' + status + '===>' + responseText, 'color: red');
		};
    var successHandler = options.successHandler || function(status, responseText) {
			console.log('%c' + status + '===>' + responseText, 'color: green');
		};
    var data = options.data;

    xhr.open(method, url, true);
    xhr.withCredentials = true;

    for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }

	xhr.onreadystatechange = function() {//Call a function when the state changes.
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
	            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
			        // Request finished. Do processing here.
			        successHandler(xhr.status, xhr.responseText);
			    }
            } else {
                errorHandler(xhr.status, xhr.responseText);
            }
        }

	}

    if (data) {
        xhr.send(JSON.stringify(data));
    } else {
        xhr.send();
    }

}

function login() {
    var content = document.getElementById('content');
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var options = {
        url: "http://localhost:3000/login",
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        successHandler: function(status, responseText) {
            content.innerHTML = responseText;
        },
        errorHandler: function(status, responseText) {
            content.innerHTML = responseText;
        },
        data: {
        	username: username,
        	password: password
        }
    };

    xhrHandler(options);
}

function getRandomNumber() {
    var content = document.getElementById('content');

    var options = {
        url: "http://localhost:3000/topic",
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        successHandler: function(status, responseText) {
            content.innerHTML = responseText;
        },
        errorHandler: function(status, responseText) {
            content.innerHTML = responseText;
        },
        data: null
    };

    xhrHandler(options);
}