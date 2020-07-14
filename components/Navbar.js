import Link from "next/link";
import cookie from "js-cookie";
import Index from "../pages/index";
import Router from "next/router";

import useSWR from "swr";

//Navbar de la parte superior de la página
const Navbar = () => {
  let isLogedIn = false;

  if (cookie.get("token")) {
    isLogedIn = true;
  }
  const { data, revalidate } = useSWR("/api/users/me", async function (args) {
    const res = await fetch(args);
    return res.json();
  });
  const handleClick = (e) => {
    cookie.remove("token");
    isLogedIn = false;
    //revalidate será la variable que se use cuando se quiera cerrar la sesion
    revalidate();
    
  };

  return (
    <nav className="navbar">
      <Link as="/" href="/">
        <a className="navbar-brand">Users app</a>
      </Link>
      {isLogedIn ? (
        <Link as="/" href="/">
          <a onClick={handleClick} className="create">
            Cerrar sesión
          </a>
        </Link>
      ) : (
        <div>
          <Link as="/login" href="/login">
            <a className="login">Iniciar sesión</a>
          </Link>
          <Link as="/new" href="/new">
            <a className="create">Registrar usuario</a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
