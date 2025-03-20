const express = require('express');
const router = express.Router();


// OOP --> 
class User {
    constructor({name,age,address,location}){
     this.age = age;
     this.name = name;
     this.address = address;
     this.location   = location;
    }
}

//Successful request (GET, etc.)
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const filter = req.query.filter;
    if (userId !== "123") {
        return res.status(404).send(`User with ID ${userId} not found`);
    }
    res.status(200).send(`User ID: ${userId}, Filter: ${filter}`);
});

router.post("/users", (req, res) => {
    // console.log(req);
    const user =  new User(req.body);
    res.status(201).json({
        message: "User created successfully",
        user: user
    })
})

module.exports = router;