import { Request, Response } from "express"; // <- This is missing
import InfluencerAddRequest from "../models/influencer-add-request-model";

const createInfluencerAddRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.body || typeof req.body !== "object") {
      res.status(400).json({ message: "Request body is missing or invalid." });
      return;
    }

    const { platform_profile_link, email } = req?.body;

    if (!platform_profile_link) {
      res.status(400).json({ message: "Platform profile link is required." });
      return;
    }

    try {
      new URL(platform_profile_link);
    } catch {
      res.status(400).json({ message: "Invalid profile link URL." });
      return;
    }

    const createPayload: any = {
      platform_profile_link,
    };

    if (email != null) {
      createPayload.email = email;
    }

    await InfluencerAddRequest.create(createPayload);

    res.status(201).json({
      message: "We will review the profile and upload the influencer soon.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { createInfluencerAddRequest };
