
const logger = require('../logger/logger.js');

const profileUserGetController = (req, res) => {

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
 }

const logoutUserPostController = (req, res) => {

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
 }

const registerUserPostController = function(req, res) {
    const { username } = req.body;

    const { url, method } = req
    logger.info(`Ruta ${method} ${url}`)

    req.session.username = username;

    const expirationDate = new Date(Date.now() + 1000 * 60 * process.env.SESSION_INACTIVITY_TIMEOUT_MINUTES);
    req.session.expirationDate = expirationDate;
    req.session.cookie.expires = expirationDate;

    res.send({status:"ok", body: {message:"Register success!"}});

 }

const loginUserPostController = function(req, res) {

    const { url, method } = req
    logger.info(`Ruta ${method} ${url}`)

    const { username } = req.body;

    req.session.username = username;

    const expirationDate = new Date(Date.now() + 1000 * 60 * process.env.SESSION_INACTIVITY_TIMEOUT_MINUTES);
    req.session.expirationDate = expirationDate;
    req.session.cookie.expires = expirationDate;

    res.send({status:"ok", body: {message:"Login success!"}});

 }

module.exports = {  profileUserGetController , 
                    logoutUserPostController , 
                    registerUserPostController, 
                    loginUserPostController};