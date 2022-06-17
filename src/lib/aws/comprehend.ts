import AWS from "aws-sdk";

if (!AWS.config.region && process.env.AWS_DEFAULT_REGION) {
  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
  });
}

export async function detectPiiEntities(text: string): Promise<any> {
  const comprehend = new AWS.Comprehend();
  const params = {
    LanguageCode: "en",
    Text: text,
  };
  return new Promise((resolve, reject) => {
    comprehend.detectPiiEntities(params, (err, data) => {
      if (err) reject(err);

      resolve(data);
    });
  });
}
