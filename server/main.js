const express = require('express');
const cors = require('cors');
const router = require('./routes/productRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/',router);

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})