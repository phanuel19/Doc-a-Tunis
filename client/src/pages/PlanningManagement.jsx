import { Navbar } from "../components/Navbar/Navbar";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AjouterPlanning.module.css';

 
export function PlanningManagement() {
  const [films, setFilms] = useState([]);
  const [selectedFilmId, setSelectedFilmId] = useState(null);
  const [jour, setJour] = useState('');
  const [heure, setHeure] = useState('');
  const [lieu, setLieu] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/films'); // Ajustez l'URL de l'API en conséquence
        setFilms(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des films', error);
      }
    };
    fetchFilms();
  }, []);

  const handleFilmClick = (filmId) => {
    setSelectedFilmId(filmId);
  };

  const handleSubmit = async (filmId) => {
    if (!jour || !heure || !lieu) {
      setMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    // Récupération du titre du film sélectionné
    const selectedFilm = films.find(film => film._id === filmId);
    const titreFilm = selectedFilm ? selectedFilm.titre : ''; // Vérifiez que le titre est récupéré

    console.log('Titre du film:', titreFilm); // Log pour le débogage

    try {
      await axios.post(`http://localhost:5000/api/planning`, {
        filmId,
        titre: titreFilm, // Ajout du titre du film
        jour,
        heure,
        lieu,
      });

      setMessage('Planning enregistré avec succès !');
      setJour('');
      setHeure('');
      setLieu('');
      setSelectedFilmId(null); // Réinitialiser la sélection
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du planning', error);
      setMessage('Erreur lors de l\'enregistrement du planning. Veuillez réessayer.');
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <h1>Ajouter Planning de Projection</h1>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.filmList}>
        {films.map(film => (
          <div key={film._id} className={styles.filmCard} onClick={() => handleFilmClick(film._id)}>
            <img
              src={`http://localhost:5000/${film.image}`} // Assurez-vous que l'URL de l'image est correctement formée
              alt={film.titre}
              className={styles.filmImage}
            />
            <h2>{film.titre}</h2>
            {selectedFilmId === film._id && (
              <div className={styles.expandableForm}>
                <div className={styles.inputGroup}>
                  <label>Jour :</label>
                  <input
                    type="date"
                    value={jour}
                    onChange={(e) => setJour(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Heure :</label>
                  <input
                    type="time"
                    value={heure}
                    onChange={(e) => setHeure(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Lieu :</label>
                  <input
                    type="text"
                    value={lieu}
                    onChange={(e) => setLieu(e.target.value)}
                    required
                  />
                </div>
                <button className={styles.submitButton} onClick={() => handleSubmit(film._id)}>Publier</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
