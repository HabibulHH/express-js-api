const express = require("express");
const app = express();

app.use(express.json());

const userRoute = require("./User");
app.use(userRoute);

const paymentRoute = require("./payment");
app.use(paymentRoute);

app.listen(3000,()=>{
    console.log("Server is running..");
})
