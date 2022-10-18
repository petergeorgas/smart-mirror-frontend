const session = require("express-session")
const cors = require("cors")
const path = require("path")
const {google} = require("googleapis")
const { GoogleAuth } = require("google-auth-library")

const express = require('express')
const app = express()
const port = 8000
const { Sequelize, DataTypes } = require('sequelize');
const { config } = require("process")
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(cors())

//const sequelize = new Sequelize('mysql://root:@localhost:5432/smartMirror') // setup path for SQL*************10/6/2022
// const sequelize = new Sequelize('smartMirror', 'root', '', {
//   host: 'localhost',
//   dialect: "mysql"
// });
// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   refreshToken: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// });

// const Config = sequelize.define("Config", {
//   Configjson: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });
// //setup key?
// User.belongsTo(Config);
// sequelize.sync({ force: true });
//use init to extend tables
// `sequelize.define` also returns the model
app.get('/getAuthURL', async (req, res) =>
{
  const oauth2Client = new google.auth.OAuth2(
    "466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com",
    "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",
    "http://localhost:8000/auth/redirect"//define later
  );
  
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
    'https://www.googleapis.com/auth/calendar.events.readonly',
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];
  
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'online',
  
    // If you only need one scope you can pass it as a string
    scope: scopes,
    resave: false,
    saveUninitialized: true
  });

  res.json({
    url: url
  })

})
app.get("/auth/redirect", async (req, res, next) =>{

  const code = req.query.code;
  if(code){
    const oauth2Client = new google.auth.OAuth2(
      "466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com",
      "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",
      "http://localhost:8000/auth/redirect"
    );
    
    //const {tokens} = await oauth2Client.getToken(code)
    const result = await oauth2Client.getToken(code)
    console.log(result)
    
    oauth2Client.setCredentials(result.tokens);
    req.session.login = true;
    req.session.tokens = result.tokens;
    //res.redirect("http://localhost:3000/")
    //get email
    let oauth2 = google.oauth2({
      auth: oauth2Client,
      version: 'v2'
    });
    let { data } = await oauth2.userinfo.get();
    console.log(data)
    req.session.googleUserInfo = data;
    //save data in db?
    
    //check if email already exists
    //if yes redirect
    //else create then redirect
    return res.redirect("https://www.google.com/");
  }
  res.end();
  //TODO: check if login key exits ****
})
app.get('/calendar', async (req, res) => {

  const oauth2Client = new google.auth.OAuth2(
    "466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com",
    "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",
    "http://localhost:8000/auth/redirect"
  );
  const tokens = req.session.tokens;
  oauth2Client.setCredentials(tokens);
    // const authclient = await auth.getClient()
    const calendar = await google.calendar({

        version: "v3", 
        auth: oauth2Client
    })
    try{
        const date = new Date();
        const maxdate = new Date();
        maxdate.setDate(date.getDate()+7)  
        const responce = await calendar.events.list({
            calendarId: "primary",
            timeMin: date.toISOString(),
            timeMax: maxdate.toISOString(),
            maxResults: 30,
            singleEvents: true,
            orderBy: "startTime"
        })
        const events = responce.data.items ?? []
        res.status(200).json({events: events})
    }
    catch(e){
        console.log(e)
        res.status(400).json({error: e.message})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

