import { sp } from "@pnp/sp/presets/all";

// Define the interface for the data structure
export interface NewsItem {
  News: string;
  ImgUrl: string;
}

export const fetchNewsData = async (): Promise<NewsItem[]> => {
  try {
    const response = await sp.web.lists.getByTitle("NewsHomePage").items.select("News", "ImgUrl").get();
    console.log("Latest News data response:", response);
    if (response && response.length > 0) {
      // Fetch image URLs and map the response to construct the correct image URL
      const Process: NewsItem[] = response.map((item) => ({
        News: item.News,
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
