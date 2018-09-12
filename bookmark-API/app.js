
const express = require('express');
const app = express();


// const User = require('./Api/User/Model');


const jsonData = [
                    { 
                      "id"        : "1",
                      "firstName" : "Shubham",
                      "lastName" : "Sharma",
                      "age"       : "24",
                    },
                    { 
                      "id"        : "2",
                      "firstName" : "Anurag",
                      "lastName" : "Sharma",
                      "age"       : "28",
                    },
                    { 
                      "id"        : "3",
                      "firstName" : "Hema",
                      "lastName" : "Chandra",
                      "age"       : "30",
                    },
                    { 
                      "id"        : "4",
                      "firstName" : "Jochen",
                      "lastName" : "Standler",
                      "age"       : "30",
                    },
                    { 
                      "id"        : "5",
                      "firstName" : "Ramya",
                      "lastName" : "Kumari",
                      "age"       : "22",
                    },
                    { 
                      "id"        : "6",
                      "firstName" : "Navdeep",
                      "lastName" : "Kumar",
                      "age"       : "24",
                    },
                 ]


app.get('/user', (req, res) => {
    res.send(jsonData);
});
app.put('/user', (req, res) => {
    res.send("updated");
});
app.delete('/user', (req, res) => {
    res.send("deleted");
});


app.post('/auth/login', (req, res) => {
  console.log (req.query.password);
  if (req.query.email == "admin@admin.com" && req.query.password == "admin" ) {
    res.send({"email" : req.query.email});
  } else {
    res.send("invalid");
  }
    
});
// app.get('/')


// app.post();
// app.put();
// app.delete();


app.listen(8000, () => console.log("Listening to port 8000"));