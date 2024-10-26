import React from "react";
import styles from "./FilmCard.module.css";

export function FilmCard({ data }) {
  return (
    <div className={styles.container}>
      <img src={`http://localhost:5000/${data.image}`}
                    alt={data.titre} />
      <div className={styles.menu}>
        <h1>{data.titre}</h1>
        <p className={styles.info}><strong>Date :</strong> {new Date(data.date).toLocaleDateString()}</p>
        <p className={styles.info}><strong>Producteur :</strong> {data.producteur?.nom ?? "Inconnu"} {data.producteur?.prenom ?? ""}</p>
        <p className={styles.info}> <strong>Réalisateur :</strong> {data.realisateur?.nom ?? "Inconnu"} {data.realisateur?.prenom ?? ""}</p>
        <p className={styles.movieDescription}>Description : {data.sujet}</p>
      </div>
      </div>
  )
}
