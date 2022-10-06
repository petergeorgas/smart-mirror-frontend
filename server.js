const path = require("path")
const {google} = require("googleapis")
const { GoogleAuth } = require("google-auth-library")

const express = require('express')
const app = express()
const port = 8000
const { Sequelize, DataTypes } = require('sequelize');
const { config } = require("process")
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

// Option 1: Passing a connection URI
const sequelize = new Sequelize('') // setup path for SQL*************10/6/2022
const User = sequelize.define('User', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
});
const Config = sequelize.define("Config", {
  Configjson: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
//setup key?
User.belongsTo(Config);
await sequelize.sync({ force: true });
//use init to extend tables
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

app.get('/getAuthURL', async (req, res) =>
{
  const oauth2Client = new google.auth.OAuth2(
    "466562971638-fuaijn77ht334tv2i1n3nauu53jbknnj.apps.googleusercontent.com",
    "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",
    "http://localhost:8000/auth/redirect"//define later
  );
  
  // generate a url that asks permissions for Blogger and Google Calendar scopes
  const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];
  
  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'online',
  
    // If you only need one scope you can pass it as a string
    scope: scopes
  });

  res.json({
    url: url
  })

})
app.get("/auth/redirect", async (req, res, next) =>{
  const refreshToken = req.query.refreshToken;
  if(refreshToken){
    req.session.login = true;
  }
  //TODO: check if login key exits ****
})
app.get('/', async (req, res) => {
  const credentialspath = path.join(process.cwd(), "credentials.json")
    const auth = new google.auth.GoogleAuth({
        keyFile: credentialspath, 
        scopes: [
                  'https://www.googleapis.com/auth/calendar',
                  'https://www.googleapis.com/auth/calendar.events',
                  'https://www.googleapis.com/auth/calendar.events.readonly',
                  'https://www.googleapis.com/auth/calendar.readonly',

                ]

    })
    const authclient = await auth.getClient()
    const calendar = await google.calendar({

        version: "v3", 
        auth: authclient
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

