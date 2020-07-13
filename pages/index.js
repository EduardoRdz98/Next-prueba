import Head from 'next/head';
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card } from "semantic-ui-react";

import useSWR from 'swr';
//Se utilizará para remover el otken de sesión de la cookie cuando se haga logout
import cookie from 'js-cookie';

//Index, esta es la pagina principal de la pagina
  //Función que se encarga de verificar que haya un token válido para la sesión
  function Index({ users }) {
    //revalidate será la variable que se use cuando se quiera cerrar la sesion
    const {data, revalidate} = useSWR('/api/users/me', async function(args) {
      const res = await fetch(args);
      return res.json();
    });

    if (!data) return <h1>Loading...</h1>;
    let loggedIn = false;
    if (data.email) {
      loggedIn = true;
    }


    //Si no hay sesion, se pide que se inicie
    if(loggedIn == false){
      return (
        <div>
          <Head>
            <title>Registro de usuarios</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          </Head>
          <h1>Sistema de Registro de Usuarios</h1>     
            <h2>No has iniciado sesión. Logeate.</h2>
              <Link href="/login">Login</Link>
        </div>
        );   

    }

    //Si hay sesion se muestran las tarjetas
    if(loggedIn == true){
      return (
        <div className="notes-container">
          <p>Welcome {data.email}!</p>
          <button
            onClick={() => {
              cookie.remove('token');
              revalidate();
            }}>
            Logout
          </button>
          <h1>Usuarios</h1>
          <div className="grid wrapper">
            {users.map((user) => {
              return (
                //Div que contiene las tarjetas que se mostraran con los nombres de los usuarios. En caso de no haber
                //sesion iniciada se muestra una link hacia la ventana de iniciar sesion.
                <div key={user._id}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <Link href={`/${user._id}`}>
                          <a>
                            {user.name} {user.surname}
                          </a>
                        </Link>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/${user._id}`}>
                        <Button primary>Ver</Button>
                      </Link>
                      <Link href={`/${user._id}/edit`}>
                        <Button primary>Editar</Button>
                      </Link>
                    </Card.Content>
                  </Card> 
                </div>
              );
            })}
          </div>
        </div>
      );   
    }
  
}


//Se hace la peticion para cargar los usuarios que existen en la colección de users
Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  const { data } = await res.json();

  return { users: data };
};

export default Index;
