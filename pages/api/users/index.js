import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    //Método GET para mostrar los usuarios de la coleccion
    case "GET":
      try {
        const user = await User.find({});

        //user.password = undefined;
        res.status(200).send({ success: true, data: user });
      } catch (e) {
        res
          .status(400)
          .send({ success: false, message: "Error al recibir los usuarios" });
      }
      break;
    //Método POST para agregar un usuario a la coleccion
    case "POST":
      try {
        const user = await User.create(req.body);

        res.status(201).send({ success: true, data: user });
      } catch (e) {
        res
          .status(400)
          .send({ success: false, message: "Error al crear nuevo usuario" });
      }
      break;
    default:
      res.status(400).send({ success: false, message: "Error en la petición" });
      break;
  }
};
