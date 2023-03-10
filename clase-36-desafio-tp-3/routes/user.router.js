const express = require('express')
const { Router } = express
const auth = require('../middlewares/auth.middleware.js');

const {getPassportMiddlewares}  = require('../middlewares/passport.middleware.js');

//const { serializeUserPassportMiddleware, deserializeUserPassportMiddleware, loginPassportMiddleware, signupPassportMiddleware} = require('../middleware/passport.middleware.js');

const { profileUserGetController , logoutUserPostController , registerUserPostController , loginUserPostController} = require('../controllers/user.controller.js');


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
                     loginUserPostController
                     );

   routerUsers.post('/register', 
                     passport.authenticate('signup', { failureRedirect: '/registerfail.html' }),
                     registerUserPostController);

   routerUsers.post("/logout", logoutUserPostController);

   routerUsers.get("/profile",auth, profileUserGetController);

   return routerUsers;
}

module.exports = getRouterUsers
