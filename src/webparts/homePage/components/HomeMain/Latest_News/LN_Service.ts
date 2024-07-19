// LN_Service.ts
import { sp } from "@pnp/sp/presets/all";

export interface LNItem {
  News: string;
  Description: string; // Corrected the property name
}

export const fetchLNData = async (): Promise<LNItem[]> => {
  try {
    const response = await sp.web.lists.getByTitle("LatestNewsV2").items.select("News", "Description").get();
    console.log("Latest News data response:", response);
    if (response && response.length > 0) {
      const LN: LNItem[] = response.map((item) => ({
        News: item.News,
        Description: item.Description, // Corrected to match the API response
      }));
      return LN;
    } else {
      console.error("Empty response received for Latest News data.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching Latest News data:", error);
    return [];
  }
};
