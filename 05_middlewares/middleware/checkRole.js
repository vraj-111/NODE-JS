const checkRole = (req, res, next) => {
  if (req.headers.role !== "admin") {
    return res.status(403).send("Access denied");
  }
  next();
};

export default checkRole;