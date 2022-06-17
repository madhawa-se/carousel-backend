# FloQuote API

## Getting Started on Docker (Compose)

You can run the code below (`setopt interactivecomments` for ZSH first).

### First time setup

You can set the env variables however you like but .env files work:

```bash
cp ./.env.example .env
```

Setup docker and the environment:

```bash
# Build the docker compose images
docker-compose build

# Install
docker-compose run api npm install

# Create the DB
docker-compose run postgres createdb --host postgres --username=postgres equote_development
docker-compose run postgres createdb --host postgres --username=postgres equote_test

# Migrate the DB
docker-compose run api npx sequelize-cli db:migrate

# Add Seed Data
docker-compose run api npx sequelize-cli db:seed:all
```

### Running the server in development

```bash
docker-compose up
```

### Compile The App

```bash
docker-compose run npm run build
```

## Required Config

| Variable                             | Description                                                     |
| ------------------------------------ | --------------------------------------------------------------- |
| `DATABASE_URL`                       | The Postgres database configuration string.                     |
| `ACCESS_TOKEN_SECRET`                | Used for signing the JWTs.                                      |
| `PUBLIC_URL`                         | Used as the base URL for bot registration with viber.           |
| `AWS_ACCESS_KEY_ID`                  | The access key ID for AWS. Needs S3 and Comprehend permissions. |
| `AWS_SECRET_ACCESS_KEY`              | A access key secrets for AWS.                                   |
| `AWS_DEFAULT_REGION`                 | The Default AWS Region                                          |
| `AWS_BUCKET`                         | The S3 bucket used for storing files.                           |
| `AWS_BUCKET_BASE_DIR`                | The prefix (directory) to use for AWS keys.                     |
| `CLOUDMAILIN_SMTP_URL`               | The SMTP server details used for sending email.                 |
| `CLOUDMAILIN_FORWARD_ADDRESS`        | Assigned by CloudMailin - used as the default inbound email.    |
| `CHARGE_BEE_SITE`                    | Chargebee site key.                                             |
| `CHARGE_BEE_API_KEY`                 | Chargebee API key.                                              |
| `HOME_PAGE`                          | Frontend home page.                                             |
| `TWILIO_ACCOUNT_SID`                 | Twilio Account.                                                 |
| `TWILIO_AUTH_TOKEN`                  | Twilio Authenticatio token.                                     |
| `MESSENGER_APP_ID`                   | Facebook messenger app id.                                      |
| `MESSENGER_APP_SECRET`               | Facebook app secret.                                            |
| `FB_SUBSCRIPTION_VERIFICATION_TOKEN` | Facebook messenger verification token.                          |
| `XERO_CLIENT_ID`                     | Xero app Client ID.                                             |
| `XERO_CLIENT_SECRET`                 | Xero app client secret.                                         |

## Messaging Platforms (Networks)

The networks can be setup as follows:

### Email

> TODO

### Viber

> TODO

### Telegram

1. Install the telegram app
2. Visit https://t.me/botfather to open a chat with the 'botfather'
3. Type: /newbot
4. Follow the instructions and copy the HTTP API token given
5. Register the token at POST /telegram/config (or use the UI in future)

### Signal

> TODO

### CloudMailin

This exists in addition to email and uses a Webhook from CloudMailin to POST inbound messages.

#### Setup once

1. Install CloudMailin (on Heroku use addons and skip next step as it's set automatically)
2. Set either process.env.MESSAGE_EMAIL || process.env.CLOUDMAILIN_FORWARD_ADDRESS

Custom domains and Attachments are currently not supported.

#### Per Client

1. Register with POST /cloudmailin/config (currently no params needed)
2. The toAddress for the customer is returned, forward to this and reply to this.

## Hosting (Heroku)

The current Production App runs on heroku as floquote-api. You can open it at api.myfloquote.com.

### Heroku Git

Too add the git remote:

```bash
heroku git:remote -a floquote-api
```

> This isn't needed but it allows the other commands to run without passing -a

### Addons

The app needs the following addons:

```
heroku addons:create heroku-postgresql:hobby-dev
heroku addons:create cloudmailin:developerplus
heroku addons:create papertrail:choklad
```

These commands will automatically provision the env variables:

`$DATABASE_URL`, `$CLOUDMAILIN_SMTP_URL`

### Complete Heroku Setup

* Create the app
* Provision the addons
* Deploy
* Run docker-compose run api npx sequelize-cli db:seed:all
