import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    console.log("req.body",req.body);
    console.log("req.query",req.query);
    
    if (!token) {
      return res.status(401).json({ 
        status: "failed", 
        message: "Authentication required" 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("decoded",decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ 
      status: "failed", 
      message: "Invalid or expired token" 
    });
  }
};
