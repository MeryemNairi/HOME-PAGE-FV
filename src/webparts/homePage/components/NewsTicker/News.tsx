import * as React from 'react';
import { NewsService } from './NewsService';
import styles from './News.module.scss';

const News: React.FC = () => {
  const [newsItems, setNewsItems] = React.useState<string[]>([]);
  const [paused, setPaused] = React.useState<boolean>(false);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [startX, setStartX] = React.useState<number>(0);
  const [scrollLeft, setScrollLeft] = React.useState<number>(0);

  const newsContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const newsService = new NewsService();

    const fetchNews = async () => {
      const items = await newsService.getNewsItems();
      setNewsItems(items.map(item => item.Title)); // Fetching Data from the 'Title' field
    };

    fetchNews();
  }, []);

  React.useEffect(() => {
    if (newsContentRef.current) {
      newsContentRef.current.scrollLeft = 0; // Set initial scroll position to start of content
    }
  }, [newsItems]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (newsContentRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - newsContentRef.current.getBoundingClientRect().left);
      setScrollLeft(newsContentRef.current.scrollLeft);
      setPaused(true); // Pause animation on drag start
      newsContentRef.current.classList.add(styles.grabbing); // Add grabbing class
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && newsContentRef.current) {
      const x = e.pageX - newsContentRef.current.getBoundingClientRect().left;
      const walk = (x - startX) * 2; // Adjust scrolling speed
      newsContentRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    if (newsContentRef.current) {
      setIsDragging(false);
      setPaused(false); // Resume animation on drag end
      newsContentRef.current.classList.remove(styles.grabbing); // Remove grabbing class
    }
  };

  return (
    <div className={`${styles.News} ${paused ? styles.paused : ''}`}>
      <div className={styles.News_holder}>
        <div 
          className={styles.News_content}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          ref={newsContentRef}
        >
          {[...newsItems, ...newsItems].map((news, index) => (
            <React.Fragment key={index}>
              <span>{news}</span>
              {index < newsItems.length * 2 - 1 && (
                <svg width="30" height="25" viewBox="0 0 42 38" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logo}>
                  <path d="M0 14.3725L16.0031 0H34.002C38.4186 0 42 3.24086 42 7.23749V23.5186L25.997 38V18.8559C25.997 16.3644 23.7603 14.3533 21.0071 14.3661H0.00708477L0 14.3725Z" fill="white"/>
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
