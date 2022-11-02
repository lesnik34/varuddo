/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');

const express = require('express');

const app = express();

const PORT = 3030;
const SUCCESS_CODE = 200;
const EXAMPLE_JSON = path.resolve(__dirname, './jsons/example.json');

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(SUCCESS_CODE);
    }

    return next();
});

app.get('/example', (req, res, next) => {
    if (fs.existsSync(EXAMPLE_JSON)) {
        res.sendFile(EXAMPLE_JSON);
    } else {
        return next();
    }
});

app.listen(PORT, () => {
    console.log(`Mock api server starts at ${PORT}`);
});
