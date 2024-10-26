import React, { useState } from 'react';
import axios from 'axios';
import styles from './AjouterPlanning.module.css';
import { Navbar } from '../components/Navbar/Navbar';

export function FilmManagement() {
  const [page, setPage] = useState(1); // État pour la page actuelle
  const [codeFilm, setCodeFilm] = useState('');
  const [titre, setTitre] = useState('');
  const [date, setDate] = useState('');
  const [sujet, setSujet] = useState('');
  const [codeRealisateur, setCodeRealisateur] = useState('');
  const [nomRealisateur, setNomRealisateur] = useState('');
  const [prenomRealisateur, setPrenomRealisateur] = useState('');
  const [dateNaissanceRealisateur, setDateNaissanceRealisateur] = useState('');
  const [codeProducteur, setCodeProducteur] = useState('');
  const [nomProducteur, setNomProducteur] = useState('');
  const [prenomProducteur, setPrenomProducteur] = useState('');
  const [dateNaissanceProducteur, setDateNaissanceProducteur] = useState('');
  const [imageFilm, setImageFilm] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeFilm || !titre || !date || !sujet || !imageFilm) {
      setMessage('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const formData = new FormData();
    formData.append('codeFilm', codeFilm);
    formData.append('titre', titre);
    formData.append('date', date);
    formData.append('sujet', sujet);
    formData.append('image', imageFilm);
    formData.append('realisateur', JSON.stringify({
      code: codeRealisateur,
      nom: nomRealisateur,
      prenom: prenomRealisateur,
      dateNaissance: dateNaissanceRealisateur,
    }));
    formData.append('producteur', JSON.stringify({
      code: codeProducteur,
      nom: nomProducteur,
      prenom: prenomProducteur,
      dateNaissance: dateNaissanceProducteur,
    }));

    try {
      const response = await axios.post('http://localhost:5000/api/films', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Film ajouté avec succès !');
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du film:', error);
      setMessage('Erreur lors de l\'ajout du film. Veuillez réessayer.');
    }
  };

  const resetForm = () => {
    setCodeFilm('');
    setTitre('');
    setDate('');
    setSujet('');
    setImageFilm(null);
    setCodeRealisateur('');
    setNomRealisateur('');
    setPrenomRealisateur('');
    setDateNaissanceRealisateur('');
    setCodeProducteur('');
    setNomProducteur('');
    setPrenomProducteur('');
    setDateNaissanceProducteur('');
  };

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => prev - 1);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 style={{ textAlign: 'center' }}>Enregistrer un Film</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {page === 1 && (
            <>
              <div className={styles.formGroup}>
                <label>Code du Film :</label>
                <input
                  type="text"
                  value={codeFilm}
                  onChange={(e) => setCodeFilm(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Titre :</label>
                <input
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date :</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Sujet :</label>
                <textarea
                  value={sujet}
                  onChange={(e) => setSujet(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label>Image du Film :</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFilm(e.target.files[0])}
                  required
                />
              </div>
            </>
          )}

          {page === 2 && (
            <>
              <h2>Informations sur le Réalisateur</h2>
              <div className={styles.formGroup}>
                <label>Code :</label>
                <input
                  type="text"
                  value={codeRealisateur}
                  onChange={(e) => setCodeRealisateur(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nom :</label>
                <input
                  type="text"
                  value={nomRealisateur}
                  onChange={(e) => setNomRealisateur(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Prénom :</label>
                <input
                  type="text"
                  value={prenomRealisateur}
                  onChange={(e) => setPrenomRealisateur(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date de Naissance :</label>
                <input
                  type="date"
                  value={dateNaissanceRealisateur}
                  onChange={(e) => setDateNaissanceRealisateur(e.target.value)}
                />
              </div>
            </>
          )}

          {page === 3 && (
            <>
              <h2>Informations sur le Producteur</h2>
              <div className={styles.formGroup}>
                <label>Code :</label>
                <input
                  type="text"
                  value={codeProducteur}
                  onChange={(e) => setCodeProducteur(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Nom :</label>
                <input
                  type="text"
                  value={nomProducteur}
                  onChange={(e) => setNomProducteur(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Prénom :</label>
                <input
                  type="text"
                  value={prenomProducteur}
                  onChange={(e) => setPrenomProducteur(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Date de Naissance :</label>
                <input
                  type="date"
                  value={dateNaissanceProducteur}
                  onChange={(e) => setDateNaissanceProducteur(e.target.value)}
                />
              </div>
            </>
          )}

          {message && <p>{message}</p>}

          <div className={styles.buttonGroup}>
            {page > 1 && <button type="button" onClick={prevPage}>Précédent</button>}
            {page < 3 && <button type="button" onClick={nextPage}>Suivant</button>}
            {page === 3 && <button type="submit">Ajouter le Film</button>}
          </div>
        </form>
      </div>
    </>
  );
}
