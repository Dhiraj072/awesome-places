const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const fs = require('fs');
const UUID = require('uuid-v4');

const gcconfig = {
    projectId: 'awesome-places-1523022274720',
    keyFileName: 'awesome-places.json',
};
const gcs = require('@google-cloud/storage')(gcconfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    console.log('Firebase storing image');
    cors(request, response, () => {
        const body = JSON.parse(request.body);
        fs.writeFileSync(
            '/tmp/uploaded-image.jpg',
            body.image,
            'base64',
            (error) => {
                console.log(error);
                return response.status(500).json({ error: error });
            });
        const bucket = gcs.bucket('awesome-places-1523022274720.appspot.com');
        const id = UUID();
        bucket.upload('/tmp/uploaded-image.jpg', {
            uploadType: 'media',
            destination: '/places/' + id + '.jpg',
            metadata: {
                metadata: {
                    contentType: 'image/jpeg',
                    firebaseStorageDownloadTokens: id,
                },
            },
        }, (error, file) => {
            if (!error) {
                response.status(201).json({
                    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/' +
                                bucket.name +
                                '/o/' +
                                encodeURIComponent(file.name) +
                                '?alt=media&token=' +
                                id,
                });
            } else {
                response.status(500).json({ error });
            }
        });
    });
});