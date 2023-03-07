import passport from "passport";
import express, { Request, Response } from "express";

const router = express.Router();

router.get("/now-in", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "user found",
    // data: {
    //   ...info,
    // },
  });
});

router.get("/success", (req, res) => {
  return res.status(200).json({
    message: "This is Login Page page",
  });
});

router.get("/failure", (req, res) => {
  return res.status(200).json({
    message: "This is bad page",
  });
});

router.get(
  "/google/auth",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  }),
);

router.get(
  "/gitbub/auth",
  passport.authenticate("github", { scope: ["profile", "user:email"] }),
);
router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "/success",
    failureRedirect: "/failure",
  }),
);

export default router;
