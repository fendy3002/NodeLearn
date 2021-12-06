import * as crypto from 'crypto';
import formatTimestamp from './formatTimestamp';
import { auth as authRaw } from './auth';

export interface SignPayload {
    httpMethod: "GET" | "POST",
    relativeUrl: string,
    requestBody?: any,
    timestamp: number
};
export default (config: any) => {
    const auth = authRaw(config);

    let apiSecret = config.bank.bank014.secretKey; // get from config
    let hash = () => crypto.createHash('sha256');

    let sign = async (payload: SignPayload) => {
        let token = (await auth.get()).token;
        let requestBodyHash = null;
        if (payload.requestBody) {
            requestBodyHash = hash().update(
                JSON.stringify(payload.requestBody)
            ).digest("hex").toLowerCase();
        } else {
            requestBodyHash = hash().update(
                ""
            ).digest("hex").toLowerCase();
        }

        let stringToSign = payload.httpMethod + ":" +
            payload.relativeUrl + ":" +
            token + ":" +
            requestBodyHash + ":" + formatTimestamp(config, payload.timestamp);

        let hmac = crypto.createHmac('sha256', apiSecret);
        return hmac.update(stringToSign).digest("hex").toLowerCase();
    };
    return {
        sign: sign,
        header: async (payload: SignPayload) => {
            let apiKey = config.bank.bank014.apiKey; // get from config
            let token = (await auth.get()).token;
            return {
                "Authorization": `Bearer ${token}`,
                "X-BCA-Timestamp": formatTimestamp(config, payload.timestamp),
                "X-BCA-Signature": await sign(payload),
                "X-BCA-Key": apiKey,
                "Origin": config.appUrl
            };
        }
    };
}