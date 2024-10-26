import { NavLink } from 'react-router-dom'
import navStyles from './Navbar.module.css'

export function Navbar() {
    return (
        <div className={navStyles.nav} >
            <h2>Doc à Tunis</h2>
            <ul className={navStyles.linkTable}>
                <NavLink to={"/"} className={navStyles.link}>Accueil</NavLink>
                <NavLink to={"/Planning"} className={navStyles.link}>Planing</NavLink>
                <NavLink to={"/LoginPlanning"} className={navStyles.link}>Gestion Planing</NavLink>
                <NavLink to={"/LoginFilm"} className={navStyles.link}>Gestion Film</NavLink>
                <NavLink to={"/LoginAdmin"} className={navStyles.link}>Admin</NavLink>
            </ul>
        </div>
    )
}


