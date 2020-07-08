import mongoose from 'mongoose'

const connection = {};

//Funcion que será llamda para establecer la conexión
async function dbConnect(){
    if(connection.isConnected){
        return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connecton.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
}

export default dbConnect;