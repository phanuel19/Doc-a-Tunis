import { useEffect, useState } from "react";
import axios from 'axios';
import { FilmCard } from "../components/FilmCard/FilmCard";
import { Footer } from "../components/Footer/Footer";
import { Navbar } from "../components/Navbar/Navbar";

function Accueil() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(null);

  const fetchFilms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/films');
      setFilms(response.data);
    } catch (error) {
      setError('Impossible de récupérer les films. Veuillez réessayer plus tard.');
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);
  return (
    <>
      <Navbar />
      <main style={{ height: "auto", padding: "1%" }}>
        <h1 style={{ color: "white", marginLeft: "5%", marginTop: "3%" }}>
          Gratuits | Tous les films Disponibles
        </h1>
        {error && <p className>{error}</p>}
        <div
          style={{
            display: "flex",
            justifyContent: " space-evenly",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {" "}
          {films.length > 0 ? (
            films.map((film) => (
              <FilmCard data={film} key={film._id}/>
            ))
          ) : (
            <p>Aucun film enregistré.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Accueil;
