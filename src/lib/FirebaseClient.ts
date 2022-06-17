import * as admin from "firebase-admin";
import Client from "../models/client.model";
import Message from "../models/message.model";
import User from "../models/user.model";
import clientSerializer from "../serializers/client.serializer";
import { generateAssetUrl } from "../services/assetUrl";

const serviceAccount = require("../../serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const sendNewMessageNotificationToUserId = async ({
  userId,
  body,
  title,
  client,
}: {
  body: string;
  title?: string;
  userId: string;
  client: Client;
}) => {
  const u = await User.findByPk(userId);
  if (u) {
    await Promise.all([
      client.update({ archived: false }),
      Message.update(
        { archived: false },
        { where: { userId, clientId: client.id } }
      ),
    ]);
    // right now we dont await the firebase notification so the request response successfully even if push notification fails
    return sendPushNotification({
      title: title || `New message from ${u.name}`,
      body,
      user: u,
      client,
    });
  }

  return Promise.reject(new Error("User not found"));
};

type SendNotificationParams = {
  title: string;
  body: string;
  user: User;
  client: Client;
};
const sendPushNotification = async ({
  title,
  body,
  user,
  client,
}: SendNotificationParams) => {
  const clientAvatarUrl = client.avatarId
    ? await generateAssetUrl(client.avatarId)
    : "https://floquote-ui-staging.herokuapp.com/icons/User.svg";
  const icon =
    clientAvatarUrl || "https://i.morioh.com/2019/11/01/20dbb4dd1d40.jpg";

  return admin
    .messaging()
    .send({
      data: {
        id: client.id,
        name: client.name,
        signedUrl: icon,
        message: body,
      },
      notification: {
        title,
        body,
        imageUrl: icon,
      },
      android: {
        notification: {
          icon: "stock_ticker_update",
          color: "#7e55c3",
        },
      },
      webpush: {
        notification: {
          title,
          body,
          badge: icon,
          icon: icon,
          image: icon,
        },
      },
      token: user.webPushNotificationToken,
    })
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      return response;
    });
};
