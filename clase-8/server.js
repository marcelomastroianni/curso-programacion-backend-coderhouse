var express = require('express');

const {Router}  = express;
const app = express();
const router = Router();

app.use(express.json());//para poder usar req.body
app.use(express.urlencoded({extended: true}));


let personas = [{nombre: 'Juan', apellido: 'Perez', edad: 30}];

app.use("/personas", router);

router.get("/", (req, res) => {
    res.json(personas);
});

router.post("/", (req, res) => {
    personas.push(req.body);
    res.json(personas);
});


app.listen(3000, () => {
    console.log("Servidor iniciado");
});


