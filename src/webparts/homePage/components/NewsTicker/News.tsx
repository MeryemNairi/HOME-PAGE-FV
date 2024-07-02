import * as React from 'react';
import { NewsService } from './NewsService';
import styles from './News.module.scss';

const News: React.FC = () => {
  const [newsItems, setNewsItems] = React.useState<string[]>([]);

  React.useEffect(() => {
    const newsService = new NewsService();

    const fetchNews = async () => {
      const items = await newsService.getNewsItems();
      setNewsItems(items.map(item => item.Title)); // Fetching Data from the 'Title Filed
    };

    fetchNews();
  }, []);

  return (
    <div className={styles.News}>
      <div className={styles.News_holder}>
        <div className={styles.News_content}>
          {newsItems.map((news, index) => (
            <p key={index}>{news}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
