import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";

//En esa función se edita un usuario
const EditUser = ({ user }) => {
  const [form, setForm] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    password: user.password,
    role: user.role,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  //Esta función manda a llamar a la función que edita al usuario
  useEffect(() => {
    if (isSubmitting) {
      //Si el objeto que almacena los errores está vacío significa que no ocurrieron errores por lo que se ejecuta la función de actualizar
      if (Object.keys(errors).length === 0) {
        updateUser();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  //En esta función se actualiza el usuario mediante el método PUT y mandando el id por la url
  const updateUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/users/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Aquí se maneja la información cuando se da click en el botón de submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  //Aqui se manejan los cambios en los inputs del formulario
  const handleChange = (e) => {
    // sigo sin entender lo de los 3 puntos xd: https://www.youtube.com/watch?v=WSr0GcBF7Ag min33:53
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //Aquí se validan los datos del formulario
  const validate = () => {
    let err = {};
    if (!form.name) {
      err.name = "El nombre es requerido";
    }
    if (!form.surname) {
      err.surname = "Apellidos requeridos";
    }
    if (!form.email) {
      err.email = "Email requerido";
    }
    if (!form.password) {
      err.password = "Contraseña requerida";
    }

    return err;
  };

  return (
    //Formulario para editar al usuario
    <div className="form-container">
      <h1>
        Editar al usuario {user.name} {user.surname}
      </h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.name
                  ? {
                      content: "Por favor introduzca su nombre",
                      pointing: "below",
                    }
                  : null
              }
              label="Nombre"
              placeholder="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={
                errors.surname
                  ? {
                      content: "Por favor introduzca sus apellidos",
                      pointing: "below",
                    }
                  : null
              }
              label="Apellidos"
              placeholder="Apellidos"
              name="surname"
              value={form.surname}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={
                errors.email
                  ? {
                      content: "Por favor introduzca su email",
                      pointing: "below",
                    }
                  : null
              }
              label="Email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              error={
                errors.password
                  ? {
                      content: "Por favor introduzca su contraseña",
                      pointing: "below",
                    }
                  : null
              }
              label="Contraseña"
              placeholder="Contraseña"
              name="password"
              value={form.password}
              type="password"
              onChange={handleChange}
            />
            <Button type="submit">Actualizar</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

EditUser.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/users/${id}`);
  const { data } = await res.json();

  return { user: data };
};
export default EditUser;
