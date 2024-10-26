import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { Navbar } from './components/Navbar/Navbar';

function Login() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Pour afficher un message d'erreur
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Appel à l'API pour la connexion
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        motDePasse,
      });

      // Vérifier si la réponse contient les données nécessaires
      if (response.data && response.data.message) {
        console.log(response.data);
        alert(response.data.message); // Afficher le message de succès
        setErrorMessage(''); // Réinitialiser le message d'erreur s'il y avait un succès

        // Redirection en fonction du rôle de l'utilisateur
        const userRole = response.data.user.role;
        if (userRole !== "responsable de la production") {
          navigate("*"); // Par défaut, redirige vers la page d'accueil
        } else {
          navigate("/PlanningManagement");
        }  
      } else {
        // Si la réponse ne contient pas le message attendu
        setErrorMessage('Réponse inattendue du serveur');
      }
    } catch (error) {
      // Gestion des erreurs du backend
      console.error('Erreur lors de la connexion', error.response ? error.response.data : error.message);

      // Afficher un message d'erreur plus clair pour l'utilisateur
      setErrorMessage(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'Erreur lors de la connexion, veuillez réessayer.'
      );
    }
  };

  return (
    <>
    <Navbar/>
    <div className={styles.container}>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Mot de Passe :</label>
          <input
            type="password"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se Connecter</button>
      </form>
      {/* Affichage du message d'erreur si nécessaire */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
    </>
  );
}

export default Login;
