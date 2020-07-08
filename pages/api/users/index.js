import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User'

dbConnect();

export default async (req, res) => {
    const {method} = req;

    switch(method){
        //Método GET para mostrar los usuarios de la coleccion
        case 'GET':
            try{
                const users = await User.find({});

                res.status(200).json({success: true, data: users});
            }catch(e){  
                res.status(400).json({success: false});
            }
            break;
        //Método POST para agregar un usuario a la coleccion
        case 'POST':
            try{
                const users = await User.create(req.body);

                res.status(201).json({success: true, data: users});
            }catch(e){
                res.status(400).json({ success: false});
            }
            break;
        default:
             res.status(400).json({ success: false });
             break;
    }
}