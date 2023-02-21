const express = require('express')
const { Router } = express
const auth = require('./auth.middleware.js');
const UsuariosDaoMongo = require('./daos/usuarios_dao_mongodb.js');
const bcrypt = require('bcrypt');
const logger = require('./logger.js');



const getRouterUsers = async (passport,LocalStrategy) => {


   const usersDao = new UsuariosDaoMongo();

   const isValidPassword =  (user, password) => {
      return  bcrypt.compareSync(password, user.password);
   }

   const createHash = (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
   }


   passport.use('login', new LocalStrategy(
      async function(username, password, done) {
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
   ));

   passport.use('signup', new LocalStrategy(
      async function(username, password, done) {
         const user = await usersDao.getByUsername(username);
         if (user) {
            logger.error(`Username already taken.`);
            return done(null, false, { message: 'Username already taken.' });
         }
         const newUser = await usersDao.save({ username, password:createHash(password) });
         const createdUser = await usersDao.getByUsername(username);
         return done(null, createdUser);
      }
   ));



   passport.serializeUser(function(user, done) {
      done(null, user.uuid);
   });

   passport.deserializeUser(async function(uuid, done) {
      const user = await usersDao.getById(uuid);
      done(null, user);
   });



   const routerUsers = Router()


   routerUsers.post('/login', passport.authenticate('login', {  failureRedirect: '/loginfail.html' }),
      function(req, res) {

         const { url, method } = req
         logger.info(`Ruta ${method} ${url}`)

         const { username } = req.body;

         req.session.username = username;

         const expirationDate = new Date(Date.now() + 1000 * 60 * process.env.SESSION_INACTIVITY_TIMEOUT_MINUTES);
         req.session.expirationDate = expirationDate;
         req.session.cookie.expires = expirationDate;
   
         res.send({status:"ok", body: {message:"Login success!"}});

      });

   routerUsers.post('/register', passport.authenticate('signup', { failureRedirect: '/registerfail.html' }),
      function(req, res) {
         const { username } = req.body;

         const { url, method } = req
         logger.info(`Ruta ${method} ${url}`)

         req.session.username = username;

         const expirationDate = new Date(Date.now() + 1000 * 60 * process.env.SESSION_INACTIVITY_TIMEOUT_MINUTES);
         req.session.expirationDate = expirationDate;
         req.session.cookie.expires = expirationDate;

         res.send({status:"ok", body: {message:"Register success!"}});

      });



   routerUsers.post("/logout", (req, res) => {

      const { url, method } = req
      logger.info(`Ruta ${method} ${url}`)

      req.session.destroy(
         function (err) {
            if (!err){
               //res.send("Logout ok!!");
               res.send({status:"ok", body: {message:"Logout ok!!"}});
               //res.redirect("/logout.html")

            }
            else{
               res.send({status:"error", body: err});
            }
         }
      )
   });

   routerUsers.get("/profile",auth, (req, res) => {

      const { url, method } = req
      logger.info(`Ruta ${method} ${url}`)
      
      const { username } = req.session;
      if (username){
         res.send({status:"ok", body: {username}});
      }
      else{
         logger.error(`No user logged in.`);
         res.send({status:"error", body: {error:"No user logged in"}});
      }
   });

   return routerUsers;
}

module.exports = getRouterUsers
