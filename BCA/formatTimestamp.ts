import * as moment from 'moment-timezone';

export default(config: any, timestamp: number) => {
    return moment.tz(timestamp, config.timezone).format(); // "YYYY-MM-DDTHH:mm:ss.SSSTZ"
};