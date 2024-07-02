import * as React from 'react';
import Styles from './News.module.scss';
import { NewsItem, fetchNewsData } from './News_Service';

const News: React.FC = () => {
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Fetch data on component mount
  React.useEffect(() => {
    async function fetchNews() {
      try {
        const data = await fetchNewsData();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }
    fetchNews();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  if (news.length === 0) {
    return <div>Loading...</div>;
  }

  const currentNews = news[currentIndex];

  return (
    <div className={Styles.News_holder}>
      <div className={Styles.News_img}>
        <img src={currentNews.ImgUrl} alt="News" />
      </div>

      <div className={Styles.controlers_holder}>
        <div className={Styles.container}>
          <div className={Styles.content}>
            <div className={Styles.title}>
              <p>News:</p>
            </div>
            <div className={Styles.news_content}>
              <p>{currentNews.News}</p>
            </div>
          </div>
          <div className={Styles.controlers}>
            <div className={Styles.contreolers_holder}>
              <button className={Styles.btn_left} onClick={handlePrev}>
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.4585 1.81079L0.999962 12.3198L12.4585 22.8287" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className={Styles.btn_right} onClick={handleNext}>
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.81079L12.4585 12.3198L1 22.8287" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
