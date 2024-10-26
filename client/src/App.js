import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Planning from "./pages/Planning";
import { Admin } from "./pages/Admin";
import { FilmManagement } from "./pages/FilmManagement";
import { PlanningManagement } from "./pages/PlanningManagement";
import LoginAdmin from "./loginAdmin";
import LoginFilm from "./loginFilm";
import LoginPlanning from "./loginPlanning";
import ErrorPage from "./error-page";

// Configuration du data router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
    errorElement: <ErrorPage />, // pour capturer les erreurs
  },
  {
    path: "Planning",
    element: <Planning />,
    errorElement: <ErrorPage />,
  },
  {
    path: "LoginPlanning",
    element: <LoginPlanning />,
    errorElement: <ErrorPage />,
  },
  {
    path: "LoginFilm",
    element: <LoginFilm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "LoginAdmin",
    element: <LoginAdmin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "PlanningManagement",
    element: <PlanningManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "FilmManagement",
    element: <FilmManagement />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Admin",
    element: <Admin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />, // route wildcard pour capturer toutes les autres routes
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
