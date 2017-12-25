const express=require("express"),
router = express.Router();

// Require controller modules
const login_controller = require('../controllers/LoginController');


router.get('/', login_controller.index);

router.post('/checkLogin', login_controller.checkLogin);

module.exports = router;