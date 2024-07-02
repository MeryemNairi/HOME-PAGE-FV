import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

export class NewsService {
  public async getNewsItems(): Promise<any[]> {
    try {
      const items: any[] = await sp.web.lists.getByTitle("HotNews").items.getAll();
      return items;
    } catch (error) {
      console.error("Error fetching news items:", error);
      return [];
    }
  }
}
