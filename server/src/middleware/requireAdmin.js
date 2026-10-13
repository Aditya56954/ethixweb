
export default function requireAdmin(req, res, next) {
  if (!req.session?.isAdmin) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  next();
}
