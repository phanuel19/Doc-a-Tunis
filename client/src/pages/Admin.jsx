import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
import styles from './AdminDashboard.module.css';
import { Navbar } from "../components/Navbar/Navbar";

export function Admin() {
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialiser useNavigate

  // Charger la liste des utilisateurs
  useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUtilisateurs(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    };
    fetchUtilisateurs();
  }, []);

  // Ajouter un utilisateur
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', { nom, email, motDePasse, role });
      setUtilisateurs([...utilisateurs, response.data]); // Ajouter l'utilisateur à la liste
      setNom('');
      setEmail('');
      setMotDePasse('');
      setRole('');
      setMessage('Utilisateur ajouté avec succès !');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
      setMessage('Erreur lors de l\'ajout de l\'utilisateur.');
    }
  };

  // Supprimer un utilisateur
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUtilisateurs(utilisateurs.filter(user => user._id !== id));
      setMessage('Utilisateur supprimé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      setMessage('Erreur lors de la suppression de l\'utilisateur.');
    }
  };

  // Fonction pour aller à l'accueil
  const goToHome = () => {
    navigate('/'); // Redirige vers la page d'accueil
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
      <header className={styles.header}>
        <h1>Tableau de Bord Administrateur</h1>
        <button onClick={goToHome} className={styles.homeButton}>Accueil</button> {/* Ajout du bouton Accueil */}
      </header>

      <div className={styles.formContainer}>
        <form onSubmit={handleAddUser} className={styles.form} id="ajouter-utilisateur">
          <h2>Ajouter un Utilisateur</h2>
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de Passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Sélectionnez un rôle</option>
            <option value="responsable des inspections">Responsable des Inspections</option>
            <option value="responsable de la production">Responsable de la Production</option>
            <option value="président du jury">Président du Jury</option>
          </select>
          <button type="submit">Ajouter Utilisateur</button>
        </form>
        {message && <p className={styles.message}>{message}</p>}
      </div>

      <section id="liste-utilisateurs">
        <h2>Liste des Utilisateurs</h2>
        <table className={styles.userTable}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateurs
              .filter(user => !user.isHidden) // Filtrer les utilisateurs qui ne sont pas masqués
              .map((user) => (
                <tr key={user._id}>
                  <td>{user.nom}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button 
                      className={styles.deleteButton} 
                      onClick={() => handleDeleteUser(user._id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </div>
   </>
  );
}
