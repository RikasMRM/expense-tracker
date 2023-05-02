import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Missing authentication token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      _id: decoded.userId,
    };

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid authentication token" });
  }
}

function corsMiddleware(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}

export { authMiddleware, corsMiddleware };
