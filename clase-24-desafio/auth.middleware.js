
const auth = (req, res, next) => {
    if (req.session.username){

        const expirationDate = new Date(Date.now() + 1000 * 60 * process.env.SESSION_INACTIVITY_TIMEOUT_MINUTES);
        req.session.expirationDate = expirationDate;
        req.session.cookie.expires = expirationDate;

        next();
    }
    else{
        res.send({status:"error", body: {error:"No user logged in"}});
    }
}

module.exports = auth;