import * as React from 'react';
import Styles from './HomeMaine.module.scss';
import InternalJobs from './InternalJobs/InternalJobs';
import News from './News/News';
import Events from './Events/Events';
import Latest_News from './Latest_News/Latest_News';
import UE from './Upcoming Events/UE';
import Birthdays from './Birthdays/Birthdays';
import Video from './Video/Video';
import BannerImg from './BannerImg/BannerImg';
import { WebPartContext } from '@microsoft/sp-webpart-base';

// Define the props interface
interface HomeMaineProps {
  context: WebPartContext;
}

const HomeMaine: React.FC<HomeMaineProps> = ({ context }) => {
  return (
    <div className={Styles.HomeMaine}>
      <div className={Styles.cards_holder}>
        <div className={Styles.N1_holder}>
          <News />
        </div>
        <div className={Styles.N2_holder}>
          <Latest_News />
        </div>
        <div className={Styles.N3_holder}>
          <Events />
        </div>
        <div className={Styles.N4_holder}>
          <UE />
        </div>
        <div className={Styles.N5_holder}>
          <Birthdays />
        </div>
        <div className={Styles.N6_holder}>
          <Video context={context} />
        </div>
        <div className={Styles.N7_holder}>
          <InternalJobs />
        </div>
        <div className={Styles.N8_holder}>
          {/* Additional content if needed */}
          <BannerImg context={context}></BannerImg>
        </div>
      </div>
    </div>
  );
};

export default HomeMaine;
