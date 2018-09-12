export default function apiClient() {
  return {


    getAllUsers: function() {
      let url = global.API_SERVER_URL + 'user';
       
      var paramObj = {

      };
      
      // var body = "";
      // if (image) {
      //   body = new FormData();
      //   body.append("userInput.groupPic", image);
      // } 

      // var urlParameters = getAsUriParameters(paramObj);
      return fetch(url, {
        credentials: 'include',
        mode: 'cors',
        method: 'GET',
        // body: body,
      }).then((response) => {
        if (response.ok) {
          return response.json();
          
        }
        throw new Error("Error");
      });
    },

    updateUser: function(id, data) {
      let url = global.API_SERVER_URL + 'user';
       
      var paramObj = {
        "updateIn.id": id,
        "updateIn.firstName" : data.firstName,
        "updateIn.lastName" : data.lastName,
        "updateIn.age" : data.age,
      };
      
      // var body = "";
      // if (image) {
      //   body = new FormData();
      //   body.append("userInput.groupPic", image);
      // } 

      var urlParameters = getAsUriParameters(paramObj);
      return fetch(url, {
        credentials: 'include',
        mode: 'cors',
        method: 'PUT',
        // body: body,
      }).then((response) => {
        if (response.ok) {
          return response.ok
          
        }
        throw new Error("Error");
      });
    },

    deleteUser: function(id) {
      let url = global.API_SERVER_URL + 'user';
       
      var paramObj = {
        "deleteIn.id": id,
      };
      
      // var body = "";
      // if (image) {
      //   body = new FormData();
      //   body.append("userInput.groupPic", image);
      // } 

      var urlParameters = getAsUriParameters(paramObj);
      return fetch(url, {
        credentials: 'include',
        mode: 'cors',
        method: 'Delete',
        // body: body,
      }).then((response) => {
        if (response.ok) {
          return response.ok;
          
        }
        throw new Error("Error");
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
