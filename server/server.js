require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

require('./src/application/utils/routes')(app);
require('./src/application/utils/errors')(app);
require('./src/application/utils/db');


async function startServer() {
    app.listen(process.env.PORT, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Your server is ready !`);
    });
}

// Run the async function to start our server
startServer();