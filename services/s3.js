import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import keys from'../config/keys.js';
import {log} from "../services/utils.js";
const {
  accessKeyId,
  awsRegion: region,
  awsSecretAccessKey: secretAccessKey,
  bucketName
} = keys;

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})


export function uploadFile(fileBuffer, fileName, mimetype) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype
    }
    return s3Client.send(new PutObjectCommand(uploadParams));
}
export function deleteSeveral(array) {
    if (Array.isArray(array)) {
        array.forEach(element => {
            const fn1 = "eyepics/" +element.picPath + '_resized'
            const fn2 = "eyepics/" +element.picPath + '_raw'
            deleteFile(fn1)
            deleteFile(fn2)
        });
    }
}
export function deleteSeveralAudios(array) {
    if (Array.isArray(array)) {
        array.forEach(element => {
           // const fn1 = element.s3Key;
            log("deleteSeveralAudios  from s3 service "+element.s3Key)
            deleteFile(element.s3Key)
        });
    }
}
export async function _deleteSeveralAudios(audioRefs) {
  if (!Array.isArray(audioRefs)) return;

  const ids = audioRefs.map(a => a._id);

  // 1️⃣ Fetch full documents
  const audios = await Audio.find({ _id: { $in: ids } });

  // 2️⃣ Delete from S3
  for (const audio of audios) {
    if (!audio.s3Key) {
      log("⚠️ Missing s3Key for:", audio._id);
      continue;
    }

    await deleteFile(audio.s3Key);
  }

  // 3️⃣ Delete from MongoDB
  //await Audio.deleteMany({ _id: { $in: ids } });
}



export function deleteFile(fileName) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    }

    return s3Client.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(key) {
    const params = {
        Bucket: bucketName,
        Key: key
    }

    // https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/
    const command = new GetObjectCommand(params);
    const seconds = 600
    const url = await getSignedUrl(s3Client, command, { expiresIn: seconds });
    return url
}
