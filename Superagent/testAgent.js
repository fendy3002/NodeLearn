let sa = require('superagent');

let agent = async () => {
    console.log();
    console.log("agent");
    let agent = sa.agent();
    agent.set("Content-Type", "form/x-url-encoded");
    agent.set("Content-Type", "application/json");
    agent.set("Authorization", "Bearer 12344567");

    let res = await agent.post('https://httpbin.org/post')
        .send({ "Data1": "Value1", "Data2": "Value2" })
    console.log(res.body);
};
agent();