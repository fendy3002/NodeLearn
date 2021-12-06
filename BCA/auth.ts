import * as sa from 'superagent';
let token = "";
let decrypted: any = null;
let expires_in = 0;

let service = {
    current: () => {
        return {
            token: token,
            decrypted: decrypted
        };
    },
    get: async () => {
        let clientId = "9b3d3ef2-4832-4ec3-8b4b-1ce1adad9aa1";
        let clientSecret = "7633b9d9-20cb-4205-929d-186281e6e509";

        let basicToken = Buffer.from(clientId + ":" + clientSecret).toString("base64");
        const authToken = await sa.post("http://sandbox.bca.co.id/api/oauth/token")
            .type("form")
            .set("Authorization", "Basic " + basicToken)
            .send({
                "grant_type": "client_credentials"
            });

        return authToken.body;
    }
};
service.get().then((res) => {
    console.log(res)
});