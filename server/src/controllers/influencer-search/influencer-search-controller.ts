import { Request, Response } from "express";
import InfluencerSearch from "../../models/influencer-search/influencer-search-model";

const createInfluencerSearch = async (req: Request, res: Response) => {
  try {
    const newSearch = await InfluencerSearch.create(); // creates with UUID and timestamps

    const data = newSearch.get();

    res.status(201).json({
      message: "Search recorded successfully.",
      search: {
        id: data.id,
        createdAt: data.createdAt,
      },
    });
  } catch (error) {
    console.error("Error recording search:", error);
    res.status(500).json({ message: "Failed to record search." });
  }
};

const getInfluencerSearchCount = async (req: Request, res: Response) => {
  try {
    const count = await InfluencerSearch.count();

    res.status(200).json({
      message: "Search count retrieved successfully.",
      count,
    });
  } catch (error) {
    console.error("Error retrieving influencer search count:", error);
    res.status(500).json({ message: "Failed to retrieve search count." });
  }
};

export { createInfluencerSearch, getInfluencerSearchCount };
