import jwt from "jsonwebtoken";

export class JwtUtils {
    generateToken(
      payload,
      secret,
      expiresIn
    ) {
      const token = jwt.sign(payload, secret, {
        expiresIn: expiresIn,
      });
      return token;
    }
  
    verifyToken(token, secret) {
      try {
        const decodedToken = jwt.verify(token, secret);
        return decodedToken;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  }