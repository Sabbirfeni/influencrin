import { getOrCreateVisitorId } from "@/utils/getOrCreateVisitorId";
import axios from "../axios";

export interface TrackVisitorResponse {
  message: string;
  visitor: {
    id: string;
    browser: string;
    operating_system: string;
    device_type: string;
    geo_location: string | null;
    createdAt: string;
  };
}

const SiteVisitorApiServices = {
  trackVisitor: async (): Promise<TrackVisitorResponse> => {
    const res = await axios.post<TrackVisitorResponse>(
      "/track-visitor",
      {}, // empty request body
      {
        headers: {
          "x-visitor-id": getOrCreateVisitorId(),
        },
      }
    );
    return res.data;
  },

  getVisitorCount: async (): Promise<number> => {
    const res = await axios.get<{ count: number }>("/track-visitor/count");
    return res.data.count;
  },
};

export default SiteVisitorApiServices;
