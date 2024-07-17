import { sp } from "@pnp/sp/presets/all";

// Define the interface for the data structure
export interface UEItem {
  Event: string;
  Desciption: string;
  Date: string; // Added Date property
}

export const fetchUEData = async (): Promise<UEItem[]> => {
  try {
    const response = await sp.web.lists.getByTitle("UpcomingEvents").items.select("Event", "Desciption", "Date").get();
    console.log("Latest News data response:", response);
    if (response && response.length > 0) {
      const UE: UEItem[] = response.map((item, index) => ({
        Event: item.Event,
        Desciption: item.Desciption,
        Date: new Date(item.Date).toLocaleDateString('fr-FR') // Format date to 'dd/mm/yyyy'
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
