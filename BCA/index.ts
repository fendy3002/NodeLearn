import getBankAccountNameRaw from './getBankAccountName';

process.env.BANK014_API_KEY = "f4cbccf0-83e7-4941-9b0c-e7cb4620715f";
process.env.BANK014_SECRET_KEY = "59926a7c-80fe-4f64-a7b9-19875e0ff740";
process.env.BANK014_OAUTH_ID = "9b3d3ef2-4832-4ec3-8b4b-1ce1adad9aa1";
process.env.BANK014_OAUTH_SECRET = "7633b9d9-20cb-4205-929d-186281e6e509";
process.env.BANK014_DOMAIN = "https://sandbox.bca.co.id";
process.env.BANK014_CHANNEL_ID = "95051";
process.env.BANK014_CREDENTIAL_ID = "BCAAPI";

const config = {
    "appUrl": "http://127.0.0.1:3981",
    "bank": {
        "bank014": {
            "apiKey": process.env.BANK014_API_KEY,
            "secretKey": process.env.BANK014_SECRET_KEY,
            "oauthId": process.env.BANK014_OAUTH_ID,
            "oauthSecret": process.env.BANK014_OAUTH_SECRET,
            "channelId": process.env.BANK014_CHANNEL_ID,
            "credentialId": process.env.BANK014_CREDENTIAL_ID,
            "apiEndpoint": {
                "oauthToken": process.env.BANK014_DOMAIN + "/api/oauth/token",
                "inquiryDomesticAccount": process.env.BANK014_DOMAIN + "/banking/corporates/transfers/v2/domestic/beneficiaries/banks/{beneficiary_bank_code}/accounts/{beneficiary_account_number}"
            }
        }
    },
};

getBankAccountNameRaw(config)("014", "0201245501").then((resp) => {
    console.log(resp)
})