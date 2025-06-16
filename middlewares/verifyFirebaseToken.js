// middlewares/verifyFirebaseToken.js

import admin from "../configs/firebase.config.js";

export const verifyFirebaseToken = async (req, res, next) => {
  let token =
    req.headers.authorization?.split("Bearer ")[1] || req.cookies?.token;

  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // add user info to request
    req.token = token;
    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error.message);
    return res.status(401).json({ success: false, message: "Token expired or Invalid" });
  }
};
