


const validateProduct = (req, res, next) => {
    const { name, description, code, price, stock, photo_url } = req.body;
    if (!name || !description || !code || !price || !stock || !photo_url) {
          return res.status(400).json({ error: "faltan datos del producto" });
    }
    next();
 }

 module.exports = validateProduct