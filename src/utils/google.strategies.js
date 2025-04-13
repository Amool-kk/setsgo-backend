import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
          return done(new Error("No email found"), null);
        }
        const existingUser = await User.findOne({
          $or: [{ googleId: profile.id }, { email: email }],
        });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = await User.create({
          email: email,
          name: profile.displayName,
          googleId: profile.id,
        });

        if (!newUser._id) {
          return done(null, null);
        }

        done(null, newUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
