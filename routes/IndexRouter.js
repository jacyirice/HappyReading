var express = require('express');
var router = express.Router();

router.use('/authentication', AuthenticationRouter);

module.exports = router;