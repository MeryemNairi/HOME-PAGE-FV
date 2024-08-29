import * as React from 'react';
import { useEffect, useState } from "react";
import styles from './InternalJobs.module.scss';
import { sp } from "@pnp/sp/presets/all";

interface InternalOffersItem {
  offre_title: string;
  short_description: string;
  deadline: string;
  city: string;
  fileUrl: string;
  category: string; // Ajouter la propriété category à InternalOffersItem
}

const InternalJobs: React.FC = () => {
  const [jobsData, setJobsData] = useState<InternalOffersItem[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<InternalOffersItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // État local pour stocker la catégorie sélectionnée

  // Fonction pour formater la date limite
  const formatDeadline = (deadline: string): string => {
    const date = new Date(deadline);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Fonction pour récupérer les données des offres d'emploi
  const fetchJobsData = async () => {
    try {
      const response = await sp.web.lists.getByTitle("BackOfficeV1").items.select("offre_title", "short_description", "deadline", "city", "fileUrl", "category").get();
      console.log("Internal Jobs data response:", response);
      if (response && response.length > 0) {
        return response;
      } else {
        console.error("Empty response received for Internal Jobs data.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching Internal Jobs data:", error);
      return [];
    }
  };

  // Filtrer les emplois en fonction du terme de recherche et de la catégorie sélectionnée
  const filterJobs = (searchTerm: string, category: string | null) => {
    let filtered = jobsData;

    if (searchTerm !== '') {
      filtered = filtered.filter(job =>
        job.offre_title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== null) {
      filtered = filtered.filter(job =>
        job.category === category
      );
    }

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    const getData = async () => {
      const internalJobs = await fetchJobsData();
      setJobsData(internalJobs);
      setFilteredJobs(internalJobs); // Initialiser les emplois filtrés avec tous les emplois -- fonctionne
      console.log("InternalJobs data:", internalJobs);
    };
    getData();
  }, []);

  // Gérer le changement de terme de recherche
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    filterJobs(searchTerm, selectedCategory);
  };

  // Gérer le filtre par catégorie
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    filterJobs(searchTerm, category);
  };

  return (
    <section className={styles.jobsApi}>
      <div className={styles.container_title}>
        <p>Offres d'emplois internes</p>
      </div>
      <div className={styles.Jobs_container}>
        <div className={styles.job_navigation_bar}>
          <div className={styles.serch_icon}>
          <svg
              id="serch_icon"
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 18.25L1 24"
                stroke="#9A9A9A"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M24 10.8571C24 16.3011 19.5868 20.7143 14.1429 20.7143C11.4162 20.7143 8.94798 19.6072 7.16351 17.8179C5.38511 16.0349 4.28571 13.5744 4.28571 10.8571C4.28571 5.41319 8.69892 1 14.1429 1C19.5868 1 24 5.41319 24 10.8571Z"
                stroke="#9A9A9A"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <input
            className={styles.job_search_input}
            type="text"
            placeholder="Search for job titles..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div  className={styles.buttonContainer}>
            <button onClick={() => handleCategoryFilter(null)} className={selectedCategory === null ? styles.active : ''}>Tous</button>
            <button onClick={() => handleCategoryFilter('CRM')} className={selectedCategory === 'CRM' ? styles.active : ''}>CRM</button>
            <button onClick={() => handleCategoryFilter('Tech')} className={selectedCategory === 'Tech' ? styles.active : ''}>Tech</button>
            <button onClick={() => handleCategoryFilter('Fonctions Support')} className={selectedCategory === 'Fonction Support' ? styles.active : ''}>Fonction Support</button>
          </div>
        <div className={styles.Jobs_holder_scroller}>
          {filteredJobs.map((job: InternalOffersItem, index: number) => (
            <div>
              {job.fileUrl ? (
            <div key={index} className={styles.jobs_display_container} onClick={() => window.open(job.fileUrl, '_blank')} >
              <div className={styles.jobs_display}> 
                <div className={styles.ACI}>
                  <p>ACI</p>
                </div>
                <div className={styles.job_title}>
                  <h2>{job.offre_title}</h2>
                </div>
                <div className={styles.job_description}>
                  <p>{job.short_description}</p>
                </div>
                <div className={styles.card_button}>
                  <div className={styles.lieu}>
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00008 0C3.58908 0 8.14446e-05 3.589 8.14446e-05 7.995C-0.0289186 14.44 7.69608 19.784 8.00008 20C8.00008 20 16.0291 14.44 16.0001 8C16.0001 3.589 12.4111 0 8.00008 0ZM8.00008 12C5.79008 12 4.00008 10.21 4.00008 8C4.00008 5.79 5.79008 4 8.00008 4C10.2101 4 12.0001 5.79 12.0001 8C12.0001 10.21 10.2101 12 8.00008 12Z" fill="#00966C"/>
                    </svg>

                    <p>
                        {job.city}
                    </p>
                  </div>  
                  <div style={{display:'flex', gap:'3px'}}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.6665 7.50002C1.6665 5.92835 1.6665 5.14335 2.15484 4.65502C2.64317 4.16669 3.42817 4.16669 4.99984 4.16669H14.9998C16.5715 4.16669 17.3565 4.16669 17.8448 4.65502C18.3332 5.14335 18.3332 5.92835 18.3332 7.50002C18.3332 7.89252 18.3332 8.08919 18.2115 8.21169C18.089 8.33335 17.8915 8.33335 17.4998 8.33335H2.49984C2.10734 8.33335 1.91067 8.33335 1.78817 8.21169C1.6665 8.08919 1.6665 7.89169 1.6665 7.50002ZM1.6665 15C1.6665 16.5717 1.6665 17.3567 2.15484 17.845C2.64317 18.3334 3.42817 18.3334 4.99984 18.3334H14.9998C16.5715 18.3334 17.3565 18.3334 17.8448 17.845C18.3332 17.3567 18.3332 16.5717 18.3332 15V10.8334C18.3332 10.4409 18.3332 10.2442 18.2115 10.1217C18.089 10 17.8915 10 17.4998 10H2.49984C2.10734 10 1.91067 10 1.78817 10.1217C1.6665 10.2442 1.6665 10.4417 1.6665 10.8334V15Z" fill="#00966C"/>
                    <path d="M5.83301 2.5V5M14.1663 2.5V5" stroke="#00966C" stroke-width="2" stroke-linecap="round"/>
                    </svg>

                    <p>
                    {formatDeadline(job.deadline)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            ) : ('-')

          }
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InternalJobs;
