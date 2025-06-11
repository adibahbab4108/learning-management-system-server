// middlewares/verifyFirebaseToken.js

import admin from "../configs/firebase.config.js";

export const verifyFirebaseToken = async (req, res, next) => {
  // ✅ Support token from cookie or Authorization header
  let token =
    req.cookies?.token || req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // add user info to request
    req.token = token;
    next();
  } catch (error) {
    console.error("Firebase Auth Error:", error.message);
    res.status(403).json({ success: false, message: "Unauthorized" });
  }
};
