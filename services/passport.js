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
        const updates = {}
        if (!existingUser.firstName && profile.name?.givenName) {
        
          updates.firstName = profile.name.givenName
        }

        if (!existingUser.lastName && profile.name?.familyName) {
          updates.lastName = profile.name.familyName
        }

        if (!existingUser.avatar && profile.photos?.[0]?.value) {
          updates.avatar = profile.photos[0].value
        }

        if (Object.keys(updates).length > 0) {
          await User.findByIdAndUpdate(existingUser._id, updates)
          Object.assign(existingUser, updates)
        }
        return done(null, existingUser)
      }
      // we don't have a user record with this ID, make a new record!
      log(email + "     New User **")
      const user = await new User({
        googleId: profile.id,
        firstName,
        lastName,
        avatar,
        email,
      }).save()
      done(null, user)
    },
  ),
)
