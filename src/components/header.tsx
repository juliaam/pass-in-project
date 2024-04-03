import nwlUniteIcon from '../assets/nwl-unite-icon.svg'
import { NavLink } from './nav-link';

export function Header() {
  return (
  <div className="flex items-center gap-5 py-8">
    <img src={nwlUniteIcon} />

    <nav className="flex items-center gap-5">
        <NavLink href="/eventos"> Eventos </NavLink>
        <NavLink href="/participantes"> Participantes </NavLink>
    </nav>

  </div>
  );
}
