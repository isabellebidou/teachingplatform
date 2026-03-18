const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const enforce = require('express-sslify');
const log = require('./services/utils').log;

require('./models/User');
require('./models/UserData');
require('./models/Reading');
require('./models/Document');
require('./models/Faq');
require('./models/Link');
require('./models/Offer');
require('./models/StarReview');
require('./models/Audio');
require('./models/Script');
require('./models/GrammarTopic');
require('./models/Theme');
require('./services/passport');
require('./services/elevenLabsTranscription');
mongoose.set('strictQuery', false);


//mongoose.connect(keys.mongoURI);
const app = express();

app.use(express.json());
const isProduction = process.env.NODE_ENV === "production";

const sessionConfig = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey],
};
console.log(sessionConfig)
if (isProduction) {
  sessionConfig.secure = true;
  sessionConfig.sameSite = "none";
} else {
  sessionConfig.sameSite = "lax";
}
app.set("trust proxy", 1);
app.use(cookieSession(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
require('./routes/healthRoutes')(app);

    require("./routes/feedbackRoutes")(app);
    require('./routes/authRoutes')(app);
    require('./routes/billingRoutes')(app);
    require('./routes/readingRoutes')(app);
    require('./routes/userDataRoutes')(app);
    require('./routes/usersRoutes')(app);
    require('./routes/faqRoutes')(app);
    require('./routes/linkRoutes')(app);
    require('./routes/offerRoutes')(app);
    require('./routes/starReviewRoutes')(app);
    require("./routes/audioRoutes")(app);
    require("./routes/scriptRoutes")(app);
    require("./routes/grammarTopicsRoutes")(app);
    require("./routes/exerciceRoutes")(app);
    



log('process.env.NODE_ENV',process.env.NODE_ENV)
if (isProduction) {
  //app.enable("trust proxy");
  //app.use(enforce.HTTPS({ trustProtoHeader: true }));
  const path = require('path');

  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


/*const db = async () => {

  try {
    const conn = mongoose.connect(keys.mongoURI);
  } catch (error) {
    log(error);
    process.exit(1);
  }
}*/
const db = async () => {
  try {
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log("✅ MongoDB connected:", mongoose.connection.name);
  } catch (error) {
    error("❌ MongoDB connection error:", error.message);
    // Don't exit immediately in dev; just log
    if (process.env.NODE_ENV === "production") process.exit(1);
  }
};

const PORT = process.env.PORT || 8000;
db().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests");
  });
});

/*db().then(() => {
  app.listen(PORT, () => {
    log("listening for requests");

    app.use(bodyParser.json());

    if (isProduction) {
      // express will serve up production assets
      app.use(express.static('client/build'));

      // express will serve up the index.html file if it doesn't recognize the routes
      const path = require('path');
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      });
    }
  })
})*/


