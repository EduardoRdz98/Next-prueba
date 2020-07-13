import { MongoClient } from 'mongodb';

const assert = require('assert');
//const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'SUPERSECRETE20220';

const dbName = 'Users';
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, });

function findUser(db, email, callback) {
  const collection = db.collection('users');
  collection.findOne({email}, callback);
}

//Compara las string de password. Regresa 0 si coinciden.
function authUser(password, ipassword) {
  if (password.localeCompare(ipassword) == 0){
    return true;
  } else { return false}
}

export default (req, res) => {

  if (req.method === 'POST') {
    //Se hace login
    try {
      assert.notEqual(null, req.body.email, 'Email requerido');
      assert.notEqual(null, req.body.password, 'Password requerido');
    } catch (bodyError) {
      res.status(403).send(bodyError.message);
    }

    client.connect(function(err) {
      assert.equal(null, err);
      console.log('Se conectó a la DB');
      const db = client.db(dbName);
      const email = req.body.email;
      const password = req.body.password;

      findUser(db, email, function(err, user) {
        if (err) {
          res.status(500).json({error: true, message: 'Error encontrando el usuario'});
          return;
        }
        if (!user) {
          res.status(404).json({error: true, message: 'Usuario no encontrado'});
          return;
        } else {
          console.log('usuario encontrado de manera exitosa');
          if (authUser(password, user.password) == true){
              const token = jwt.sign(
                {userId: user.userId, email: user.email},
                jwtSecret,
                {
                  expiresIn: 3000, //50 minutes
                },
              );
              res.status(200).json({token});
                                       
              console.log('autenticación exitosa');
              return;
            } else{
              console.log('la contra esta mal')
            }             
        }
      });
    });
  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};
