
import { sp } from "@pnp/sp/presets/all";

// Define the interface for the data structure
export interface UEItem {
  Event: string;
  Desciption:string;
  
}

export const fetchUEData = async (): Promise<UEItem[]> => {
  try {
    const response = await sp.web.lists.getByTitle("UpcomingEvents").items.select("Event","Desciption").get();
    console.log("Latest News data response:", response);
    if (response && response.length > 0) {
      // Fetch image URLs and map the response to construct the correct image URL
      
      const UE: UEItem[] = response.map((item, index) => ({
       Event: item.Event,
       Desciption: item.Desciption
      }));
      return UE;
    } else {
      console.error("Empty response received for Latest News data.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching Latest News data:", error);
    return [];
  }
};


