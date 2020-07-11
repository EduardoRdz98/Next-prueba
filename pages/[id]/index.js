import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";

//Pagina inicial de cada usuario
const User = ({ user }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  //Metodo que se ejecuta cuando se quiere eliminar un usuario
  useEffect(() => {
    if (isDeleting) {
      deleteUser();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);

  const close = () => setConfirm(false);

  //Esta función elimina al usuario por la petición DELETE
  const deleteUser = async () => {
    const userId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  return (
    <div clasname="note=container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <div className="content">
            <h2>{user.name}</h2>
            <p>{user.surname}</p>
            <Button color="red" onClick={open}>
              Borrar
            </Button>
          </div>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

//Aquí se cargan los datos del usuario mediante el id que se tiene en la url
User.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const { data } = await res.json();

  return { user: data };
};

export default User;
