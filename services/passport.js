import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import mongoose from "mongoose"
import keys from "../config/keys.js"
import { log } from "../services/utils.js"
passport.serializeUser((user, done) => {
  done(null, user.id)
})
const User = mongoose.model("users")
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})
//https://stackoverflow.com/questions/49635518/google-oauth2-is-not-working-on-mobile
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: `${keys.callBack}/auth/google/callback`,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id })
      const email = profile.emails?.[0]?.value

      if (existingUser) {
        log(email + "     existingUser**")
        // we already have a record with the given profile ID
        return done(null, existingUser)
      }
      // we don't have a user record with this ID, make a new record!
      log(email + "     New User **")
      const user = await new User({ googleId: profile.id, email }).save()
      done(null, user)
    },
  ),
)
