import * as sa from 'superagent';

export interface CallResponseBody {
    beneficiary_bank_code: string,
    beneficiary_account_number: string,
    beneficiary_account_name: string,
};

import generateHeaderRaw from './header';
export default (config: any) => {
    return async (bankCode: string, bankAccountNo: string) => {
        let beneficiary_bank_code = bankCode;
        let beneficiary_account_number = bankAccountNo;
        let timestamp = new Date().getTime();
        let generateHeader = generateHeaderRaw(config);
        let ChannelID = config.bank.bank014.channelId; // get from config
        let CredentialID = config.bank.bank014.credentialId; // get from config

        let url = config.bank.bank014.apiEndpoint.inquiryDomesticAccount
            .replace("{beneficiary_bank_code}", beneficiary_bank_code)
            .replace("{beneficiary_account_number}", beneficiary_account_number);
        let callResponse = await sa.get(url)
            .set({
                // set header
                ...await generateHeader.header({
                    httpMethod: "GET",
                    relativeUrl: url,
                    timestamp: timestamp
                }),
                "channel-id": ChannelID,
                "credential-id": CredentialID
            });

        let responseBody: CallResponseBody = callResponse.body;
        return responseBody;
    };
}