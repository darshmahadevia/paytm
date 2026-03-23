const express = require("express");
const cors = require("cors");
const app = express();
const rootRouter = require('./router/index');
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/v1', rootRouter);
app.listen(PORT);





