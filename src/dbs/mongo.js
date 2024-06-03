const mongoose = require('mongoose');

class ConnectMongo {
    constructor() {
        this._connect();
    }

    _connect() {
        const env = process.env.ENV
        let connectionString = ""

        if(env === "prod"){
            connectionString = process.env.CONNECTION_STRING_DATABASE_PROD
        }

        if(env === "dev"){
            connectionString = process.env.CONNECTION_STRING_DATABASE_DEV
        }
        console.log(connectionString)

        mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => {
                console.log('Database connected successfully');
            })
            .catch(err => {
                console.error('Database connection error:', err);
            });
    }
}

module.exports = new ConnectMongo();
