export const adminOnly = (req, res, next) => {
  console.log("REQ.USER =>", req.user);

  const role = req.user?.role;

  console.log("ROLE =>", role);

  // admin check
  if (!role || role.toLowerCase() !== "admin") {
    return res.status(403).json({
      status: false,
      message: "Admin access only",
      currentRole: role,
    });
  }

  next();
};