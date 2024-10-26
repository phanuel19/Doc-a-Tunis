import { Navbar } from '../components/Navbar/Navbar'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ConsulterPlanning.module.css';
function Planning() {
  const [plannings, setPlannings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlannings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/planning');
        setPlannings(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des plannings', error);
        setMessage('Erreur lors de la récupération des plannings.');
      }
    };
    fetchPlannings();
  }, []);

  return (
   <> 
   <Navbar/>
   <div className={styles.container}>
      <h1>Consulter les Plannings de Projection</h1>
      {message && <p className={styles.message}>{message}</p>}
      {plannings.length > 0 ? (
        <table className={styles.planningTable}>
          <thead>
            <tr>
              <th>Titre du Film</th>
              <th>Jour</th>
              <th>Heure</th>
              <th>Lieu</th>
            </tr>
          </thead>
          <tbody>
            {plannings.map((planning) => (
              <tr key={planning._id}>
                <td>{planning.filmId ? planning.filmId.titre : 'Titre non disponible'}</td>
                <td>{planning.jour ? new Date(planning.jour).toLocaleDateString() : 'Jour non disponible'}</td>
                <td>{planning.heure || 'Heure non disponible'}</td>
                <td>{planning.lieu || 'Lieu non disponible'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun planning enregistré.</p>
      )}
    </div></>)
}

export default Planning