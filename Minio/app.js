require('dotenv').config();
const minio = require('minio');

let minioClient = new minio.Client({
    endPoint: process.env.MINIO_HOST,
    port: 80,
    useSSL: false,
    accessKey: process.env.MINIO_ACESS,
    secretKey: process.env.MINIO_SECRET
});

new Promise((resolve, reject) => {
    minioClient.fPutObject('backend', 'test.js', __dirname + "/app.js", {}, (err, etag) => {
        if (err) { reject(err); }
        else { resolve(etag); }
    });
});