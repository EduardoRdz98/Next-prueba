import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card } from "semantic-ui-react";

//Index, esta es la pagina principal de la pagina
const Index = ({ users }) => {
  return (
    <div className="notes-container">
      <h1>Usuarios</h1>
      <div className="grid wrapper">
        {users.map((user) => {
          return (
            //Div que contiene las tarjetas que se mostraran con los nombres de los usuarios
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
};

//Se hace la peticion para cargar los usuarios que existen en la colección de users
Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/users");
  const { data } = await res.json();

  return { users: data };
};

export default Index;
