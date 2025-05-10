import { Request, Response } from "express";

import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";
import SiteVisitor from "../models/site-visitor-model";

const trackVisitor = async (req: Request, res: Response) => {
  try {
    const visitorId = req.headers["x-visitor-id"] as string;

    // Before creating a new entry, check if this visitor already exists
    let visitor = await SiteVisitor.findOne({
      where: { visitor_id: visitorId },
    });

    if (visitor) return;

    let ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;

    // Mock IP if on localhost (for dev testing only)
    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8"; // Google DNS IP – located in California, USA
    }

    // User-Agent parsing
    const userAgent = req.get("user-agent") || "";
    const parser = new UAParser(userAgent);
    const uaResult = parser.getResult();

    const browser = uaResult.browser.name;
    const operating_system = parser.getOS().name;
    const device_type = uaResult.device.type || "desktop"; // fallback
    const referrer = req.get("referer") || null;
    const geo = ip ? geoip.lookup(ip) : null;

    const country = geo ? geo.country : null;

    visitor = await SiteVisitor.create({
      visitor_id: visitorId,
      ip_address: ip,
      browser,
      operating_system,
      device_type,
      referrer,
      country,
    });

    res.status(201).json({ message: "Visitor tracked", visitor });
  } catch (error) {
    console.error("Track visitor failed:", error);
    res.status(500).json({ message: "Failed to track visitor" });
  }
};

const getVisitorCount = async (req: Request, res: Response) => {
  try {
    const count = await SiteVisitor.count();

    res.status(200).json({
      message: "Visitor count retrieved successfully",
      count,
    });
  } catch (error) {
    console.error("Error retrieving visitor count:", error);
    res.status(500).json({ message: "Failed to retrieve visitor count" });
  }
};

export { trackVisitor, getVisitorCount };
