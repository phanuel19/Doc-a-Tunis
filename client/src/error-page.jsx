import { useRouteError } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
      <Navbar/>
      <iv id="error-page">
        <h1>Oops!</h1>
        <p>Erreur! . Une erreur a été détectée, veillez revoir les identifiants et tenant compte de l'onglet, merci</p>
        <p>
          {/* Vérifie si error est un objet et affiche ses détails */}
          <i>
            {error?.statusText ||
              error?.message ||
              (typeof error === "object" && JSON.stringify(error)) ||
              "Unknown Error"}
          </i>
        </p>
      </iv>
    </>
  );
}
