import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect();

//Esta función llama a un usuario por su id
export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;

  //Metoo GET que llama al usuario
  switch (method) {
    case "GET":
      try {
        const user = await User.findById(id);

        if (!user) {
          return res
            .status(400)
            .json({ success: false, message: "Error, el usuario no existe" });
        }

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, message: "Error al conseguir el usuario" });
      }
      break;

    //Metodo PUT para actualizar los datos del usuario dependiendo de los datos que se manden
    case "PUT":
      try {
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!user) {
          return res.status(400).send({ success: false });
        }

        res.status(200).send({ success: true, data: user });
      } catch (error) {
        res
          .status(400)
          .send({ success: false, message: "Error al actualizar el usuario" });
      }
      break;

    //Metodo DELETE para eliminar al usuario que coincida con el id que se mande
    case "DELETE":
      try {
        const deletedUser = await User.deleteOne({ _id: id });

        if (!deletedUser) {
          return res.status(400).send({ success: false });
        }

        res.status(200).send({ success: true, data: {} });
      } catch (error) {
        res
          .status(400)
          .send({ success: false, message: "Error al eliminar el usuario" });
      }
      break;
    default:
      res.status(400).send({ success: false, message: "Error en la petición" });
      break;
  }
};
