import * as React from 'react';
import styles from './HomePage.module.scss';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import  { useEffect, useRef } from 'react';
import HomeMaine from './HomeMain/HomeMaine';
import News from './NewsTicker/News';



import Footer from './NewFooter/Footer';
import Navbar from './Header/navbar';


const CommPage: React.FC<{ context: WebPartContext }> = ({ context }) => {
    const [showSavoirPlus, setShowSavoirPlus] = React.useState(false);
    const savoirPlusRef = useRef<HTMLDivElement>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (savoirPlusRef.current && !savoirPlusRef.current.contains(event.target as Node)) {
            setShowSavoirPlus(false);
        }
    };

    useEffect(() => {
        if (showSavoirPlus) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSavoirPlus]);
    return (
        <div className={styles.CommPage}>
            <Navbar />
            <News/>
            <HomeMaine context={context}/>
            <Footer />
        </div>
    );
};

export default CommPage;
