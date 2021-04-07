const fs = require('fs');
const path = require('path');

const getCryptoProfileActivity = (req, res) => {
    console.log('getCryptoProfileActivity');
    const { code } = req.params;
    fs.readFile('src/temp/' + code + '.json', (err, data) => {
        if (err) throw new Error(`Problem: ${err}`);
        res.status(200).jsonp(JSON.parse(data)).end();
    });
};

module.exports = getCryptoProfileActivity;