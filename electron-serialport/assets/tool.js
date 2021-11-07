function whatWrite(message) {
    const jsonStr = JSON.stringify(message);
    port.write(`${jsonStr}\n`, (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });

}


module.exports = whatWrite()