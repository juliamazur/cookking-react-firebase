const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const sharp = require('sharp')
const _ = require('lodash');
const path = require('path');
const os = require('os');

exports.generateThumbnail = functions.storage.object('uploads/{imageId}').onFinalize(event => {

  const object = event.data; // The Storage object.

  console.log(object)

  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.

  const SIZES = [64, 256, 512]; // Resize target width in pixels

  if (!contentType.startsWith('image/') || resourceState === 'not_exists') {
    console.log('This is not an image.');
    return;
  }

  if (_.includes(filePath, '_thumb')) {
    console.log('already processed image');
    return;
  }


  const fileName = filePath.split('/').pop();
  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);

  return bucket.file(filePath).download({
    destination: tempFilePath
  }).then(() => {

    _.each(SIZES, (size) => {

      let newFileName = `${fileName}_${size}_thumb.png`;
      let newFileTemp = path.join(os.tmpdir(), newFileName);
      let newFilePath = `thumbs/${newFileName}`;

      sharp(tempFilePath)
        .resize(size, null)
        .toFile(newFileTemp)
        .then(info => {
          bucket.upload(newFileTemp, {
            destination: newFilePath
          });
          return;
        })
        .catch(err => {
            console.error(err.stack);
         });

    });
    return;
  })
})
