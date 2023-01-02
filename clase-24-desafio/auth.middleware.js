
const auth = (req, res, next) => {
    if (req.session.username){
        next();
    }
    else{
        res.send({status:"error", body: {error:"No user logged in"}});
    }
}

module.exports = auth;