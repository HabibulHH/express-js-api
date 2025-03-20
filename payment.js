const express = require("express");
const router = express.Router();

router.get('/users/:id/payment', (req, res) => {
    const userId = req.params.id;
    const filter = req.query.filter;
    console.log("payment done..");
    
    res.send(`User ID: ${userId}, Filter: ${filter}`);
});

module.exports = router;