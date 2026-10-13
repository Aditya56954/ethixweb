
import { Router } from "express";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body ?? {};

  if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    username.length > 100 ||
    password.length > 1024
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid login credentials.",
    });
  }

  const expectedUsername = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!expectedUsername || !passwordHash) {
    console.error("Admin credentials are not configured.");
    return res.status(500).json({
      success: false,
      message: "Authentication is not configured.",
    });
  }

  const usernameMatches = username === expectedUsername;

  let passwordMatches = false;

  try {
    passwordMatches = await bcrypt.compare(password, passwordHash);
  } catch {
    console.error("Admin password hash is invalid.");
    return res.status(500).json({
      success: false,
      message: "Authentication is not configured correctly.",
    });
  }

  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({
      success: false,
      message: "Invalid username or password.",
    });
  }

  req.session.regenerate((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to start a session. Please try again.",
      });
    }

    req.session.isAdmin = true;

    req.session.save((saveError) => {
      if (saveError) {
        return res.status(500).json({
          success: false,
          message: "Unable to save your session. Please try again.",
        });
      }

      return res.json({
        success: true,
        message: "Login successful.",
      });
    });
  });
});

router.get("/me", (req, res) => {
  if (!req.session?.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  return res.json({
    success: true,
    user: { username: process.env.ADMIN_USERNAME },
  });
});

router.post("/logout", (req, res) => {
  if (!req.session) {
    return res.json({ success: true });
  }

  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to log out. Please try again.",
      });
    }

    res.clearCookie("ethixweb.sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res.json({
      success: true,
      message: "Logged out successfully.",
    });
  });
});

export default router;
