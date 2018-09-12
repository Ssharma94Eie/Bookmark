export default function apiClient(token) {
  return {
    token: token,

    login: function(email, password) {
      let url = global.API_SERVER_URL + 'auth/login';
       
      var paramObj = {
        "email" : email,
        "password"   : password,
      };
      
    
      var urlParameters = getAsUriParameters(paramObj);
      return fetch(url + '?' + urlParameters, {
        credentials: 'include',
        mode: 'cors',
        method: 'POST',
        // body: body,
      }).then((response) => {
        if (response.ok) {
          return response.json();
          
        }
        else {
          return response.ok;
        }
      });
    },
  };
}

function sendReq(url, opts={}, onProgress, onSucc, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (var k in opts.headers||{})
        xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => onSucc(e.target.responseText);
    xhr.onerror = onError;
    if (xhr.upload && onProgress)
        xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
    xhr.send(opts.body);
}

function getAsUriParameters(data) {
   var url = '';
   for (var prop in data) {
      url += encodeURIComponent(prop) + '=' + 
          encodeURIComponent(data[prop]) + '&';
   }
   return url.substring(0, url.length - 1)
}
