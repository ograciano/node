const { Router } = require("express");
const { prueba } = require("../controllers/oracle");


const router = Router();

router.get('/', prueba);

module.exports = router;