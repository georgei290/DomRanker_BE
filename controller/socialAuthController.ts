import myStrategy from "passport-google-oauth20";
import passport from "passport";

const GoogleStrategy = myStrategy.Strategy;

passport.use(
  new GoogleStrategy(
    {
      //   clientID: process.env.GOOGLE_ID_AUTH,
      //   clientSecret: process.env.GOOGLE_SCRETE_AUTH,
      clientID:
        "1054310070984-nlkjhta3o2ajbmvhk09o87aj9qjdu125.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
      scope: ["profile, email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user!);
});
