console.log('May Node be with you')
var auth = require('basic-auth')

var isAdmin = false; 

const express = require('express'); 
// const router = express.Router(); 
const bodyParser = require('body-parser'); 
const e = require('express');
// const { localsName } = require('ejs');
// const e = require('express');
const app = express(); 
const MongoClient = require('mongodb').MongoClient; 

var allResults; 
var trueResults = []; 
var trueResults_id = []; 

const connectionString = 'mongodb+srv://admin:admin@cluster0.5abc3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('public'));
app.use(bodyParser.json())

app.listen(3000, function() {
    console.log('listening on 3000'); 
}) 

function approveConfession() {
  console.log("approving confession"); 
  // approvedConfession.is_approved = true; 
  // console.log(approvedConfession); 
  // if (approvedConfession[is_approved]) {
  //   console.log("approved!"); 
  // }
}

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    // console.log('Connected to Database')
    const db = client.db('PlexSessions')
    const confessionsCollection = db.collection('confessions')
    // app.use(/* ... */)
    app.get('/', (req, res) => {
        db.collection('confessions').find().toArray()
          .then(results => {
            // console.log(results)
            for (var i = 0; i < results.length; i++) {
              if (results[i].is_approved == true) {
                // console.log(results[i]._id); 
                // console.log(!trueResults_id.includes(results[i]._id)); 
                if (!trueResults_id.includes(results[i]._id)) {
                  trueResults.push(results[i]); 
                  trueResults_id.push(results[i]._id); 
                  // console.log("Been here!"); 
                  // console.log(trueResults_id); 
                  // console.log(!trueResults_id.includes(results[i]._id)); 
                }
              } 
            }
            for (var i = 0; i < results.length; i++) {
              if (results[i].is_approved == true) {
                // console.log(results[i]._id); 
                // console.log(!trueResults_id.includes(results[i]._id)); 
                if (!trueResults_id.includes(results[i]._id)) {
                  trueResults.push(results[i]); 
                  trueResults_id.push(results[i]._id); 
                  // console.log("Been here!"); 
                  // console.log(trueResults_id); 
                  // console.log(!trueResults_id.includes(results[i]._id)); 
                }
              } 
            }
            // console.log("results: "); 
            // console.log(results); 
            // console.log("True results: ")
            // console.log(trueResults); 
            allResults = results; 
            res.render('index.ejs', { confessions: trueResults})
            // confessionsVisibilityOff(); 
          })
          .catch(error => console.error(error))
        // ...
      })
    app.post('/confession', (req, res) => {
        req.body["is_approved"] = false; 
        confessionsCollection.insertOne(req.body)
          .then(result => {
            // console.log(result)
            res.redirect('/')
          })
          .catch(error => { 
              console.error(error) 
              console.log("oops")
            })
      })
      app.post('/login', (req, res) => {
        // console.log('Hellooooooooooooooooo!')
        // console.log(req.body)
        const loginObject = req.body; 
        // console.log("username: ", loginObject.username); 
        // console.log("password: ", loginObject.password); 
        const username = loginObject.username; 
        const password = loginObject.password; 
        if (username == "admin" && password == "admin") {
            res.statusCode = 401
            isAdmin = true; 
            res.render('confessions', { confessions: allResults});

        } else {
            console.log("Not an admin!")
        }
        console.log("isAdmin: ", isAdmin)            
      })

      app.post('/approve_confession', (req, res) => {
        console.log(req.body) 
      })
    // app.listen(/* ... */)
  })
  .catch(error => console.error(error))

app.post('/back', (req, res) => {
    console.log("go back!")
    res.redirect('/')
})

// $( "#approveThisConfession" ).bind({
//   click: function() {
//     // Do something on click
//   },
//   mouseenter: function() {
//     // Do something on mouseenter
//   }
// });