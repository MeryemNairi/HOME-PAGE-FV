
import { sp } from "@pnp/sp/presets/all";

// Define the interface for the data structure
export interface LNItem {
  News: string;
  
}

export const fetchLNData = async (): Promise<LNItem[]> => {
  try {
    const response = await sp.web.lists.getByTitle("LatestNewsV2").items.select("News").get();
    console.log("Latest News data response:", response);
    if (response && response.length > 0) {
      // Fetch image URLs and map the response to construct the correct image URL
      
      const LN: LNItem[] = response.map((item, index) => ({
       News: item.News,
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


