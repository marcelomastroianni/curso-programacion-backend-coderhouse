const DaoFactory = require('../daos');
const usersDao = DaoFactory.getDao('usuarios')


const validateIfAdmin = async (req, res, next) => {

    const user_uuid  = req.session.passport.user;

    const user = await usersDao.getById(user_uuid);

    const is_admin = user.is_admin;

    //const { is_admin } = req.headers;
    if (is_admin !== true) {
      let full_path = req.baseUrl+req.route.path;
      let method = req.method;
      let message = `ruta ${full_path} método ${method} no autorizada`;
      return res.status(401).json({ error: -1 , descripcion: message });
    }
    next();
 }

 module.exports = validateIfAdmin