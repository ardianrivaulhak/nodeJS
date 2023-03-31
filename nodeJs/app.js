const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const middlewareLogRequest = require('./middleware/log');
const router = require('./routers');

app.use(middlewareLogRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
