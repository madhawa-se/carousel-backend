import { google } from "googleapis";
import { Request } from "express";

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection({ expressReq }: { expressReq: Request }) {
  const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID, // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: `postmessage`, // this must match your google api settings
  };
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  "https://www.googleapis.com/auth/plus.me",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/profile.emails.read",
  "https://www.googleapis.com/auth/user.addresses.read",
];

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
function getConnectionUrl(auth) {
  return auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope,
  });
}

export async function getUserAuthClientFromCode(params: {
  code: string;
  expressReq: Request;
}) {
  const auth = createConnection({ expressReq: params.expressReq }); // this is from previous step
  const credentialToken = await auth.getToken(params.code);
  auth.setCredentials(credentialToken.tokens);
  const data = await auth.getAccessToken();

  // add the tokens to the google api so we have access to the account
  const userConn = createConnection({ expressReq: params.expressReq });
  userConn.setCredentials({ refresh_token: data.token });
  return userConn;
}

export function getGooglePlusApi(auth) {
  return google.people({ version: "v1", auth });
}
