import * as sa from 'superagent';
export interface TokenResponse {
    access_token: string,
    token_type: 'Bearer',
    expires_in: number,
    scope: string
};

export const auth = (config: any) => {
    let token = "";
    let expires_in = 0;

    let getFromServer = async () => {
        let clientId = config.bank.bank014.oauthId;
        let clientSecret = config.bank.bank014.oauthSecret;

        let basicToken = Buffer.from(clientId + ":" + clientSecret).toString("base64");
        const postResponse = await sa.post(config.bank.bank014.apiEndpoint.oauthToken)
            .type("form")
            .set("Authorization", "Basic " + basicToken)
            .send({
                "grant_type": "client_credentials"
            });
        let tokenResponse: TokenResponse = postResponse.body;

        token = tokenResponse.access_token;
        expires_in = Math.floor(new Date().getTime() / 1000) + tokenResponse.expires_in;

        return {
            token: token,
        };
    };

    return {
        get: async () => {
            // if already expired
            if (expires_in < Math.floor(new Date().getTime() / 1000)) {
                return await getFromServer();
            }
            else {
                return {
                    token: token,
                };
            }
        }
    };
}