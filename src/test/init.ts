const database = require("../config/database.json");
const { Client } = require('pg');
const { createUser } = require("../commands/user/create");
const client = new Client({
    user: database.test.username,
    host: database.test.host,
    password: database.test.password,
    port: database.test.port,
})

const seedUser = () => {
    createUser("testmail1@mail.com", "TestUser", "987654abc", { preferredIntegrations: ["email", "whatsapp"]})
}

const init = async () => {
    await client.connect()

    await client.query(`CREATE DATABASE ${database.test.database}`)
    .then(() => {
        console.log("DATABASE CREATED")
        client.end(); // close the connection
        return seedUser
    })
}

init()
