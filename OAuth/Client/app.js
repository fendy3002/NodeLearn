const { Issuer } = require('openid-client');

let doTask = async() => {
    let localIssuer = await Issuer.discover('http://localhost:3000') // => Promise
    console.log('Discovered issuer %s %O', localIssuer.issuer, localIssuer.metadata);
    
    const Client = localIssuer.Client;

};
doTask();