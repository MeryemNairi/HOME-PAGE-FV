import * as React from 'react';
import Styles from './UE.module.scss';
import CommentService from './Comments.service';
import { UEItem, fetchUEData } from './UEService';

const UE: React.FC = () => {
  const [UE, setEvents] = React.useState<UEItem[]>([]);
  const [isTextAreaVisible, setIsTextAreaVisible] = React.useState<boolean[]>([]);
  const [comments, setComments] = React.useState<string[]>([]);

  const handleOpinionClick = (index: number) => {
    const updatedVisibility = [...isTextAreaVisible];
    updatedVisibility[index] = true;
    setIsTextAreaVisible(updatedVisibility);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedComments = [...comments];
    updatedComments[index] = value;
    setComments(updatedComments);
  };

  const handleSubmitClick = async (index: number, newsNews: string) => {
    const updatedVisibility = [...isTextAreaVisible];
    updatedVisibility[index] = false;
    setIsTextAreaVisible(updatedVisibility);

    const comment = comments[index];
    if (comment) {
      try {
        const commentService = new CommentService();
        await commentService.postComment(comment, newsNews);
        alert('Merci pour votre feedback');
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert('Erreur lors de la soumission du commentaire');
      }
    }
  };

  React.useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await fetchUEData();
        setEvents(data);
        setIsTextAreaVisible(new Array(data.length).fill(false));
        setComments(new Array(data.length).fill(''));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className={Styles.UE}>
      <div className={Styles.logo_holder}>
        <div className={Styles.logo_holder_img}></div>
        
        <div className={Styles.text}>
          <p>Evénements à venir</p>
        </div>
      </div>
      <div className={Styles.sparation_line}></div>
      <div className={Styles.Latest_news_holder}>
        {UE.map((ue, index) => (
          <div key={index} className={Styles.UE_content}>
            <div className={Styles.title}>
              <p>Latest news</p>
            </div>
            <div className={Styles.UE_title}>
              <p>{ue.Event}</p>
            </div>
            <div className={Styles.date}>
              <p>{ue.Date}</p> {/* Display formatted date */}
            </div>
            <div className={Styles.UpEv_content}>
              <p>{ue.Desciption}</p>
            </div>
            <div className={Styles.Opinion_holder}>
              {!isTextAreaVisible[index] && (
                <button className={Styles.Opinion_btn} onClick={() => handleOpinionClick(index)}>
                  <p>Votre opinion compte</p>
                </button>
              )}
              {isTextAreaVisible[index] && (
                <div className={Styles.text_area}>
                  <div className={Styles.area_holder}>
                    <textarea
                      name="OpinionTextArea"
                      className={Styles.OpinionArea}
                      placeholder='Give us your honest feedback'
                      value={comments[index]}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    ></textarea>
                  </div>
                  <div className={Styles.Submit_holder}>
                    <button className={Styles.submit} onClick={() => handleSubmitClick(index, ue.Event)}>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={Styles.sparation_line}></div>
      <div className={Styles.nav_holder}></div>
    </div>
  );
};

export default UE;
