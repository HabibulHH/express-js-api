const express = require('express');
const Joi = require('joi');
const router = express.Router();


// OOP --> 
class User {
    constructor({ name, age, address, location }) {
        this.age = age;
        this.name = name;
        this.address = address;
        this.location = location;
    }
}
// make joi schema validator for this schema

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

    const { name, age, address, location } = req.body;
    if (!name || !age || !address || !location) {
        return res.status(400).json({ error: "All fields (name, age, address, location) are required" });
    }

    if (typeof age !== 'number' || age <= 0) {
        return res.status(400).json({ error: "Age must be a positive number" });
    }

    // Validation: Check if 'name' is a string and within length limits
    if (typeof name !== 'string' || name.length < 3 || name.length > 100) {
        return res.status(400).json({ error: "Name must be a string with length between 3 and 100" });
    }

    // Validation: Check if 'address' is a string
    if (typeof address !== 'string' || address.length < 5) {
        return res.status(400).json({ error: "Address must be a string with at least 5 characters" });
    }

    // console.log(req);
    const user = new User(req.body);
    // save db layer

    res.status(201).json({
        message: "User created successfully",
        user: user
    })
});

const userSchema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    age: Joi.number().positive().required(),
    address: Joi.string().min(5).required(),
    location: Joi.string().required()
})

router.post("/users/v2", (req, res) => {

    const { error } = userSchema.validate(req.body);
    // If validation fails, send an error response
    if (error) {
        return res.status(400).json({ error: error.details});
    }

    const user = new User(req.body);
    // save to db 
    res.status(201).json({
        message: "User created successfully",
        user: user
    })
})

module.exports = router;