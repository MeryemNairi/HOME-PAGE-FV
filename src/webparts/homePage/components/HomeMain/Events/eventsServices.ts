import { sp } from "@pnp/sp/presets/all";

// Define the interface for the data structure
export interface EventsItem {
  EventsDesc: string;
  ImgUrl: string;
}

export const fetchNewsData = async (): Promise<EventsItem[]> => {
  try {
    const response = await sp.web.lists.getByTitle("EventsHomePage").items.select("EventsDesc", "ImgUrl").get();
    console.log("Latest News data response:", response);
    if (response && response.length > 0) {
      // Fetch image URLs and map the response to construct the correct image URL
      const Process: EventsItem[] = response.map((item) => ({
        EventsDesc: item.EventsDesc,
        ImgUrl: item.ImgUrl
      }));
      return Process;
    } else {
      console.error("Empty response received for Latest News data.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching Latest News data:", error);
    return [];
  }
};
