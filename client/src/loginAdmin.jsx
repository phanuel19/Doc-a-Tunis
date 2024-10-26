import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify"; // Importation de ToastContainer et toast
import 'react-toastify/dist/ReactToastify.css'; // Importation du CSS

function Login() {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, motDePasse }
      );

      if (response.data && response.data.message) {
        console.log(response.data);

        // Remplacer l'alerte par une notification Toastify
        toast.success(response.data.message, {
          position: "top-center",
          autoClose: 3000, // Délai avant fermeture automatique
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setErrorMessage("");

        const userRole = response.data.user.role;
        setTimeout(() => {
          switch (userRole) {
            case 'Administrateur':
              navigate('/Admin');
              break;
            case 'président du jury':
              navigate('/Jury');
              break;
            default:
              navigate('*');
              break;
          }
        }, 3000); // Redirection après 3 secondes pour laisser le temps à la notification
      } else {
        setErrorMessage("Réponse inattendue du serveur");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion", error.response ? error.response.data : error.message);
      setErrorMessage(
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Erreur lors de la connexion, veuillez réessayer."
      );

      // Afficher une notification d'erreur avec Toastify
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <Navbar />
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

        {/* Ajout du container de Toastify pour gérer les notifications */}
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
