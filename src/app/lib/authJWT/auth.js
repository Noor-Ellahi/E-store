// app/lib/auth.js
import jwt from "jsonwebtoken";
import UserModel from "../../modals/User";


export async function verifyToken(req , withUser = false) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { decoded: null, error: "Unauthorized", status: 401 };
    }
    // if (!authHeader) return { error: "No token provided", status: 401 };

    const token = authHeader.split(" ")[1];
    if (!token) return { error: "Invalid token format", status: 401 };

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (withUser) {
      const user = await UserModel.findById(decoded.id);
      if (!user) return { error: "User not found", status: 404 };
      return { user };
    }
    
    return { decoded, error: null, status: 200 };
    // return { 
    //     decoded
    // }; 
  } 
  catch (error) {
    return {
        error: "Token verification failed", 
        status: 403 
    };
  }
}