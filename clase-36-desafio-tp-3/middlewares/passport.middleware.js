const bcrypt = require('bcrypt');
const logger = require('../logger/logger.js');

//const PersistenceFactory =  require('../persistencia/daos/persistence_factory.js');

const DaoFactory = require('../daos');


const getPassportMiddlewares = async () => {




   const usersDao = DaoFactory.getDao('usuarios')
   //const usersDao = await PersistenceFactory.getPersistence("usuarios")


   const isValidPassword =  (user, password) => {
      return  bcrypt.compareSync(password, user.password);
   }

   const createHash = (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
   }


   const serializeUserPassportMiddleware = function(user, done) {
      done(null, user.uuid);
   }

   const deserializeUserPassportMiddleware = async function(uuid, done) {
      const user = await usersDao.getById(uuid);
      done(null, user);
   }


   const loginPassportMiddleware = async function(username, password, done) {
      const user = await usersDao.getByUsername(username);
      if (!user) {
         logger.error(`Incorrect username.`);
         return done(null, false, { message: 'Incorrect username.' });
      }
      if (!isValidPassword(user, password)) {
         logger.error(`Incorrect password.`);
         return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
   }


   const signupPassportMiddleware = async function(req, username, password, done) {
      const user = await usersDao.getByUsername(username);
      if (user) {
         logger.error(`Username already taken.`);
         return done(null, false, { message: 'Username already taken.' });
      }
      const newUser = await usersDao.save({ username, 
                                          password:createHash(password),
                                          email: req.body.email,
                                          edad: req.body.edad,
                                          address: req.body.address,
                                          phone: req.body.phone,
                                          alias: req.body.alias,
                                          avatar: req.body.avatar,
                                        });
      const createdUser = await usersDao.getByUsername(username);
      return done(null, createdUser);
   }


   return { serializeUserPassportMiddleware, 
      deserializeUserPassportMiddleware, 
      loginPassportMiddleware, 
      signupPassportMiddleware };
}



 module.exports = {getPassportMiddlewares};