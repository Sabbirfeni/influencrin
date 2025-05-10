import { Request, Response } from "express";
import InfluencerSearchCount from "../../models/influencer-search/influencer-search-count";

const incrementInfluencerSearchCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const [record, created] = await InfluencerSearchCount.findOrCreate({
      where: {}, // single global count
      defaults: { count: 1 },
    });

    if (!created) {
      const currentCount = record.getDataValue("count") as number;
      record.set("count", currentCount + 1);
      await record.save();
    }

    const updatedCount = record.getDataValue("count") as number;

    res.status(200).json({
      message: "Search count updated",
      count: updatedCount,
    });
  } catch (error) {
    console.error("Error updating search count:", error);
    res.status(500).json({ message: "Failed to update search count" });
  }
};

const getInfluencerSearchCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const record = await InfluencerSearchCount.findOne({});

    if (!record) {
      res.status(200).json({
        message: "No search count found yet",
        count: 0,
      });
      return;
    }

    const count = record.getDataValue("count") as number;

    res.status(200).json({
      message: "Search count retrieved",
      count,
    });
  } catch (error) {
    console.error("Error retrieving search count:", error);
    res.status(500).json({ message: "Failed to retrieve search count" });
  }
};

export { incrementInfluencerSearchCount, getInfluencerSearchCount };
