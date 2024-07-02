import * as React from 'react';
import { useState, useEffect } from 'react';
import { sp } from '@pnp/sp';
import styles from './Banner.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';



interface ILatestNewsProps {
  context: WebPartContext;

}

const BannerImg: React.FC<ILatestNewsProps> = (props: ILatestNewsProps) => {


  //-------------------------------> Importing the video from the Document Library in sharepoint <----------------





  const [images, setImages] = useState<string[]>([]);




  //reste code



  const [currentIndex, setCurrentIndex] = useState<number>(0); // Add type annotation for currentIndex

  const goToPrevSlide = () => {
    const newIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);


  // -------------------------> Fetching Images from a document libray <---------------------
  useEffect(() => {

    const fetchImages = async () => {
      try {
        const response = await sp.web.lists.getByTitle("MediaTek").items.select('FileRef').get();
        const imageUrls = response.map(item => item.FileRef);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
        
            <div className={styles.ImageContainer}>
              <div className={styles.image_holder}>
                <img src={images[currentIndex]} alt="Slide" />
              </div>
              <div className={styles.Navigation_btn}>
                <button className={styles.prevBtn} onClick={goToPrevSlide}>
                  <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.74178 20.4324L0.309099 14.1945C-0.103029 13.7948 -0.10303 13.2051 0.309098 12.8055L12.7412 0.749781C13.517 -0.00247461 15 0.453514 15 1.44429L15 12.1741L6.74178 20.4324Z" fill="white" />
                    <path opacity="0.5" d="M15 14.8258L15 25.5557C15 26.5465 13.517 27.0024 12.7412 26.2502L8.08798 21.7378L15 14.8258Z" fill="white" />
                  </svg>
                </button>
                <button className={styles.nextBtn} onClick={goToNextSlide}>
                  <svg width="15" height="27" viewBox="0 0 15 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.25822 6.56763L14.6909 12.8055C15.103 13.2052 15.103 13.7949 14.6909 14.1945L2.25876 26.2502C1.48301 27.0025 4.33083e-08 26.5465 0 25.5557V14.8259L8.25822 6.56763Z" fill="white" />
                    <path opacity="0.5" d="M4.47035e-07 12.1742L0 1.44432C-4.33083e-08 0.45354 1.48301 -0.00244924 2.25875 0.749806L6.91202 5.26216L4.47035e-07 12.1742Z" fill="white" />
                  </svg>
                </button>
              </div>
            </div>
  );
};

export default BannerImg;