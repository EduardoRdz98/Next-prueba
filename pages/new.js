import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import bcrypt from "bcrypt-node";

//Función para crear nuevos usuarios
const Newuser = () => {
  //Se crea un usuario vacío
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      //Si el objeto donde se almacenan los errores está vacio significa que no salieron errores por lo que se crea el usuario
      if (Object.keys(errors).length === 0) {
        createUser();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  //En esta función se manda la petición por POST para crear un nuevo usuario
  const createUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  //Aquí se maneja la información cuando se da click en el botón de submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  //Aquí se manejan los cambios en los inputs
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    // esto no lo entendí pero en esta parte del video se usa: https://www.youtube.com/watch?v=WSr0GcBF7Ag min33:53
    if (e.target.name == "password") {
      bcrypt.hash(e.target.value, null, null, (err, hash) => {
        if (err) {
          console.log(err);
        }
        if (hash) {
          setForm({
            ...form,
            [name]: hash,
          });
        }
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };

  //Se validan los campos
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
    //Formulario para crear un nuevo usuario
    <div className="form-container">
      <h1>Crear Usuario</h1>
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
              type="password"
              onChange={handleChange}
            />
            <Button type="submit">Crear</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Newuser;
