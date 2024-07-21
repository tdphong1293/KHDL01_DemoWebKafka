const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.json({message: 'Hello, World!'});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});