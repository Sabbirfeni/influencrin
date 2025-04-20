import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

interface DecodedToken {
  id: string;
  email: string;
}

// Extend Express Request to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ error: "No token provided, authorization denied." });
    return;
  }

  try {
    // Verify and decode the token using the JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET) as unknown;
    // The jwt.verify method does two main things:
    // 1. **Verifies the token's authenticity**:
    //    - It checks if the token has been tampered with by validating its signature against the secret key (JWT_SECRET).
    //    - This ensures that the token was indeed issued by your server and not altered by an unauthorized party.
    //    - The signature verification ensures integrity, preventing any unauthorized modifications of the token's contents.
    //
    // 2. **Validates the token's claims**:
    //    - It checks the **expiration time** (`exp`) claim (if present) to see if the token has expired. If expired, it will throw an error.
    //    - It checks the **issued at** (`iat`) and **not before** (`nbf`) claims, if any, to ensure the token is used within the proper timeframe.
    //    - It checks that the **audience** (`aud`) and **issuer** (`iss`) claims (if present) match what was expected when the token was generated, ensuring that the token is being used by the correct parties (if these claims are set during token creation).
    //
    // If the token is valid (not tampered with, not expired, and all claims are correct), it decodes the payload (which can contain user info like id and email),
    // and then it attaches this decoded data to the `req.body.user` so that it can be used in route handlers for user authentication or authorization.

    // Cast the decoded token into the expected structure
    const decodedToken = decoded as DecodedToken;
    // Attach the decoded token to the request object for further use in the route handler
    req.user = decodedToken;
    next(); // Proceed to the next middleware or route handler
  } catch (error: any) {
    // If the token is invalid or expired, respond with an error
    res.status(401).json({ message: error.message });
  }
};

export default authenticate;
