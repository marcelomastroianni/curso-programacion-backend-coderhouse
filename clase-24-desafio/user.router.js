const express = require('express')

const { faker } = require('@faker-js/faker');

faker.locale = "es"

const { Router } = express

const auth = require('./auth.middleware.js');





const getRouterUsers = async () => {



   const routerUsers = Router()


   routerUsers.post("/login", (req, res) => {
      const { username } = req.body;

      req.session.username = username;

      

      const expirationDate = new Date(Date.now() + 1000 * 60 * process.env.SESSION_INACTIVITY_TIMEOUT_MINUTES);
      req.session.expirationDate = expirationDate;
      req.session.cookie.expires = expirationDate;

      //res.send("Login success!");
      res.send({status:"ok", body: {message:"Login success!"}});

   });

   routerUsers.post("/logout", (req, res) => {
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
      const { username } = req.session;
      if (username){
         res.send({status:"ok", body: {username}});
      }
      else{
         res.send({status:"error", body: {error:"No user logged in"}});
      }
   });

   return routerUsers;
}

module.exports = getRouterUsers
