import AWS from "aws-sdk";
import axios from "axios";

if (!AWS.config.region && process.env.AWS_DEFAULT_REGION) {
  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
  });
}

interface UploadedFile {
  url: string;
  key: string;
}

export async function uploadFile(
  path: any,
  data: any,
  contentType: string
): Promise<UploadedFile> {
  const s3 = new AWS.S3();
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: process.env.AWS_BUCKET!,
      Key: `${process.env.AWS_BUCKET_BASE_DIR}/${path}`,
      Body: data,
      ContentType: contentType,
      ACL: "public-read",
    };
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve({ url: data.Location, key: data.Key });
      }
    });
  });
}

export async function uploadFromUrl(
  path: string,
  url: string,
  contentType: string
): Promise<UploadedFile> {
  const response = await axios({
    method: "get",
    url: url,
    responseType: "stream",
  });
  const result = await uploadFile(path, response.data, contentType);
  return result;
}

export function generateAssetPath(
  uuid: string,
  userId: string,
  filename: string
): string {
  return `${uuid}/${userId}/${filename}`;
}

export async function getSignedUrl(
  key: string,
  duration: number,
  options?: { bucket?: string, region?: string; }
): Promise<string> {
  const s3 = new AWS.S3();
  const params = {
    Bucket: options?.bucket || process.env.AWS_BUCKET,
    Key: key,
    Expires: duration,
  };
  const url = await s3.getSignedUrlPromise("getObject", params);
  return url;
}

export async function fetch(
  key: string,
  options?: { bucket?: string, region?: string; }
): Promise<AWS.S3.Body> {
  const s3 = new AWS.S3();
  const params = {
    Bucket: options?.bucket || process.env.AWS_BUCKET || 'floquote-api-production',
    Key: key,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, function (err, data) {
      if (err || !data.Body) {
        reject(err);
      } else {
        resolve(data.Body);
      }
    });
  });
}
