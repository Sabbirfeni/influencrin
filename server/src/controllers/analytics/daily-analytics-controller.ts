import { Request, Response } from "express";
import { Op, fn, col } from "sequelize";
import SiteVisitor from "../../models/site-visitor-model";
import InfluencerSearch from "../../models/influencer-search/influencer-search-model";

type VisitorResult = {
  date: string;
  visitors: string;
};

type SearchResult = {
  date: string;
  searches: string;
};

const getLastNDates = (n: number) => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }
  return dates;
};

const getDailyVisitorsSearches = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const days = 90;
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - (days - 1));

    const visitorData = (await SiteVisitor.findAll({
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("COUNT", col("id")), "visitors"],
      ],
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
      group: [fn("DATE", col("createdAt"))],
      raw: true,
    })) as unknown as VisitorResult[];

    const searchData = (await InfluencerSearch.findAll({
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("COUNT", col("id")), "searches"],
      ],
      where: {
        createdAt: {
          [Op.between]: [start, end],
        },
      },
      group: [fn("DATE", col("createdAt"))],
      raw: true,
    })) as unknown as SearchResult[];

    const visitorMap = new Map(
      visitorData.map((v) => [v.date, parseInt(v.visitors)])
    );
    const searchMap = new Map(
      searchData.map((s) => [s.date, parseInt(s.searches)])
    );

    const chartData = getLastNDates(days).map((date) => ({
      date,
      visitors: visitorMap.get(date) || 0,
      searches: searchMap.get(date) || 0,
    }));

    res.status(200).json({
      message: "chart data retrieved successfully",
      chartData,
    });
  } catch (error) {
    console.error("Failed to get chart data", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getDailyVisitorsSearches };
