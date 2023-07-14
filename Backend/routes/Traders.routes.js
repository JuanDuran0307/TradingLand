const {Router} = require('express');
const {getTraders,insertTrader,deleteTraders,updateTraders} = require('../controllers/Traders.controller.js');
const router = Router();

router.get("/all", getTraders)
router.post("/add", insertTrader);
router.delete("/del/:id", deleteTraders);
router.patch("/upd/:id", updateTraders);

module.exports = router;