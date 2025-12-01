const express = require('express');
const cors = require('cors');
const router = require('./routes/productRoutes');
const pv_router = require('./routes/product_variantRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/',router);
app.use('/pv',pv_router);

app.listen(5000,()=>{
    console.log("server is running on port 5000");
})