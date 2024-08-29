import * as React from 'react';
import Styles from './Latest_News.module.scss';
import { LNItem, fetchLNData } from './LN_Service'; // Assuming you have the service file


const Latest_News: React.FC = () => {
  
  const [LN, setEvents] = React.useState<LNItem[]>([]); // State to hold the fetched events



  // Fetch data on component mount
  React.useEffect(() => {
      async function fetchEvents() {
          try {
              const data = await fetchLNData();
              setEvents(data);
          } catch (error) {
              console.error('Error fetching events:', error);
          }
      }
      fetchEvents();
  }, []);

  return (
    <div className={Styles.Latest_News_holder}>
        <div className={Styles.logo_holder}>
                <div className={Styles.logo_holder_img}>
                  <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.33333 4.58565H0V20.6354C0 21.8965 1.05 22.9283 2.33333 22.9283H18.6667V20.6354H2.33333V4.58565ZM21 0H7C5.71667 0 4.66667 1.03177 4.66667 2.29283V16.0498C4.66667 17.3108 5.71667 18.3426 7 18.3426H21C22.2833 18.3426 23.3333 17.3108 23.3333 16.0498V2.29283C23.3333 1.03177 22.2833 0 21 0ZM21 16.0498H7V2.29283H21V16.0498ZM9.33333 8.02489H18.6667V10.3177H9.33333V8.02489ZM9.33333 11.4641H14V13.757H9.33333V11.4641ZM9.33333 4.58565H18.6667V6.87848H9.33333V4.58565Z" fill="white"/>
                  </svg>

                </div>
                <div className={Styles.text}>
                    <p>Dernières nouvelles</p>
                </div>
        </div>
        <div className={Styles.sparation_line}>

        </div>
        <div className={Styles.Latest_news_holder}>
        {LN.map((LN, index) => (
            <div className={Styles.content}>
              <div className={Styles.left_line}>

              </div>
              <div className={Styles.news_content}>
                  <p>
                    {LN.News}
                  </p>
              </div>
            </div>
         ))}  
        </div>
        <div className={Styles.sparation_line}>

        </div>
        <div className={Styles.nav_holder}>

        </div>
        
    </div>
  );
};

export default Latest_News;
