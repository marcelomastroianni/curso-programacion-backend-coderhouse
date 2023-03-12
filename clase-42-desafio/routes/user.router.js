const express = require('express')
const { Router } = express
const auth = require('../middlewares/auth.middleware.js');

const {getPassportMiddlewares}  = require('../middlewares/passport.middleware.js');
const UserController = require('../controllers/user.controller.js');
const userController = new UserController();


const getRouterUsers = async (passport,LocalStrategy) => {


   console.log(getPassportMiddlewares);

   const { serializeUserPassportMiddleware, deserializeUserPassportMiddleware, loginPassportMiddleware, signupPassportMiddleware} = await getPassportMiddlewares();


   //Config passport
   passport.use('login', new LocalStrategy(
      loginPassportMiddleware
   ));

   passport.use('signup', new LocalStrategy({
      passReqToCallback : true
      },
      signupPassportMiddleware
   ));

   passport.serializeUser(serializeUserPassportMiddleware);

   passport.deserializeUser(deserializeUserPassportMiddleware);

   //End config passport
   
   const routerUsers = Router()


   routerUsers.post('/login', 
                     passport.authenticate('login', {  failureRedirect: '/loginfail.html' }),
                     userController.login
                     );
   routerUsers.post('/register', 
                     passport.authenticate('signup', { failureRedirect: '/registerfail.html' }),
                     userController.register);
   routerUsers.post("/logout", userController.logout);
   routerUsers.get("/profile",auth, userController.getProfile);

   return routerUsers;
}

module.exports = getRouterUsers
