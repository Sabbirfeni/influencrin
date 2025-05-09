// controllers/visitorController.ts
import { Request, Response } from "express";

export const trackVisitor = async (req: Request, res: Response) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"];
    const timestamp = new Date();

    // Store this info in the database (optional)
    // await Visitor.create({ ip, userAgent, timestamp });

    res.status(200).json({
      message: "Visitor tracked",
      visitor: { ip, userAgent, timestamp },
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({ message: "Error tracking visitor" });
  }
};
