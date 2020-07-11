import Link from "next/link";

//Navbar de la parte superior de la página
const Navbar = () => (
  <nav className="navbar">
    <Link href="/">
      <a className="navbar-brand">Users app</a>
    </Link>

    <Link href="/new">
      <a className="create">Registrar usuario</a>
    </Link>
  </nav>
);

export default Navbar;
