const mongoose = require('mongoose');

//@TODO: Move this out to a config
const SERVER_AND_PORT = 'admin-user:admin-password@localhost:27018';

const config = {
    db: `mongodb://${SERVER_AND_PORT}`,
    opts: {
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
};

const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    return mongoose.connect(config.db, config.opts);
};

mongoose
    .connect(config.db, config.opts)
    .catch(() => setTimeout(connectWithRetry, 5000));

mongoose.Promise = global.Promise;
// @TODO: Need to auto set data
mongoose.connection
    .on('connected', () => {
        console.log(
            `Mongoose connection open on mongodb://${SERVER_AND_PORT}/tasks`,
        );
    })
    .on('error', err => {
        console.log(`Connection error: ${err.message}`);
    });

